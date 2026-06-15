import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import './Booking.css';
import departments from '../data/departments.json';
import doctorsData from '../data/doctors.json';
import bookingHeroImg from '../assets/images/booking_hero_trust.png';
import OpdSlipTemplate from '../components/OpdSlipTemplate';

import { useAuth } from '../context/AuthContext';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

function Booking() {
  const { user, token, loading: authLoading } = useAuth();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    phone: '',
    otp: '',
    location: null,
    department: '',
    doctor: '',
    date: '',
    time: '',
    name: '',
    age: '',
    gender: '',
    email: '',
    address: '',
    symptoms: '',
    packageId: '',
    packageName: '',
    price: 0,
    isPackage: false
  });

  const [loading, setLoading] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(0);
  const location = useLocation();
  const opdRef = useRef(null);
  const { login } = useAuth();

  useEffect(() => {
    if (user) {
      setFormData(prev => ({ ...prev, phone: user.phone, name: user.name || '', email: user.email || '', gender: user.gender || '' }));
      // Skip OTP if already logged in
      if (step === 1 || step === 2) setStep(3);
    }
  }, [user]);

  useEffect(() => {
    let interval;
    if (resendTimer > 0) {
      interval = setInterval(() => setResendTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleDownloadOPD = async () => {
    const element = opdRef.current;
    if (!element) return;
    
    element.parentElement.style.opacity = '1';
    const originalScrollY = window.scrollY;
    window.scrollTo(0, 0);
    
    try {
      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        backgroundColor: '#fcf9f2',
        windowWidth: document.documentElement.offsetWidth,
        windowHeight: document.documentElement.offsetHeight
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Sparsh_OPD_Slip_${formData.name || 'Patient'}.pdf`);
    } catch (error) {
      console.error("Error generating PDF", error);
    } finally {
      element.parentElement.style.opacity = '0';
      window.scrollTo(0, originalScrollY);
    }
  };

  const handleAddToCalendar = () => {
    const title = encodeURIComponent(`Doctor Appointment at Sparsh: ${formData.doctor}`);
    const details = encodeURIComponent(`Department: ${formData.department}\nPatient: ${formData.name}`);
    const loc = encodeURIComponent('Sparsh Hospitals, Odisha');
    
    if (formData.date && formData.time) {
      const dateStr = formData.date.replace(/-/g, '');
      let [time, modifier] = formData.time.split(' ');
      let [hours, minutes] = time.split(':');
      if (hours === '12') hours = '00';
      if (modifier === 'PM') hours = (parseInt(hours, 10) + 12).toString();
      const timeStr = `${hours.padStart(2, '0')}${minutes}00`;
      
      let endMins = parseInt(minutes, 10) + 30;
      let endHours = parseInt(hours, 10);
      if (endMins >= 60) {
        endMins -= 60;
        endHours += 1;
      }
      const endTimeStr = `${endHours.toString().padStart(2, '0')}${endMins.toString().padStart(2, '0')}00`;
      
      const dates = `${dateStr}T${timeStr}/${dateStr}T${endTimeStr}`;
      window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dates}&details=${details}&location=${loc}`, '_blank');
    } else {
      window.open(`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&details=${details}&location=${loc}`, '_blank');
    }
  };

  useEffect(() => {
    if (location.state) {
      setFormData(prev => ({
        ...prev,
        department: location.state.department || prev.department,
        doctor: location.state.doctor || prev.doctor,
        packageId: location.state.packageId || prev.packageId,
        packageName: location.state.packageName || prev.packageName,
        price: location.state.price || prev.price,
        isPackage: location.state.isPackage || false
      }));
      
      // If it's a package, skip to step 6 (Date/Time) after OTP/Location
      // Wait, location.state might be handled in handleNext but let's set it up
    }
  }, [location.state]);

  const filteredDoctors = formData.department 
    ? doctorsData.filter(d => d.department === formData.department)
    : [];

  const handleNext = () => {
    if (formData.isPackage) {
      if (step === 3) {
        setStep(6); // Skip Dept/Doctor for packages
        return;
      }
    }
    setStep(step + 1);
  };
  const handleBack = () => {
    if (formData.isPackage) {
      if (step === 6) {
        setStep(3);
        return;
      }
    }
    setStep(step - 1);
  };

  const requestOtp = async () => {
    if (!formData.phone || formData.phone.length !== 10) return setError('Enter valid 10-digit phone');
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: formData.phone })
      });
      if (res.ok) {
        handleNext();
        setResendTimer(120);
      } else {
        const data = await res.json();
        setError(data.message);
      }
    } catch (err) {
      setError('Server connection failed');
    } finally {
      setLoading(false);
    }
  };

  const verifyAndProceed = async () => {
    if (formData.otp.length !== 6) return setError('Enter 6-digit OTP');
    setLoading(true);
    setError('');
    const result = await login(formData.phone, formData.otp);
    if (result.success) {
      handleNext();
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  const requestLocation = () => {
    setLoading(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setFormData({ ...formData, location: { lat: pos.coords.latitude, lng: pos.coords.longitude } });
        setLoading(false);
        handleNext();
      }, (err) => {
        setLoading(false);
        handleNext();
      });
    } else {
      handleNext();
    }
  };

  const processPayment = async () => {
    setLoading(true);
    setError('');
    
    // 1. Load Razorpay
    const res = await loadRazorpayScript();
    if (!res) {
      setError("Razorpay SDK failed to load. Are you online?");
      setLoading(false);
      return;
    }

    // 2. Create Order
    const paymentAmount = formData.isPackage ? formData.price : 590;
    
    try {
      const orderRes = await fetch('http://localhost:4000/api/payment/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ amount: paymentAmount })
      });
      
      const order = await orderRes.json();
      
      if (!order.id) {
        setError('Server error while initiating payment');
        setLoading(false);
        return;
      }

      // 3. Open Razorpay Modal
      const options = {
        key: "rzp_test_SxE8v9vzWM08fe",
        amount: order.amount,
        currency: "INR",
        name: "Sparsh Hospitals",
        description: "Appointment Booking",
        order_id: order.id,
        handler: async function (response) {
          // On Success - hit the book endpoint
          try {
            const bookRes = await fetch('http://localhost:4000/api/appointments/book', {
              method: 'POST',
              headers: { 
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify({...formData, paymentId: response.razorpay_payment_id})
            });
            
            if (bookRes.ok) {
              const appt = await bookRes.json();
              setFormData(prev => ({ ...prev, id: appt.id }));
              setPaymentSuccess(true);
              setStep(9);
            } else {
              setError('Payment verified, but booking failed. Please contact support.');
            }
          } catch(err) {
            setError('Error confirming booking.');
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone
        },
        theme: {
          color: "#0a937c"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (err) {
      setError('Connection error during payment initiation');
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) return <div className="dash-loader">Authenticating...</div>;

  return (
    <div className="booking-page-lux">
      <div className="booking-split-layout">
        <div className="booking-form-side">
          <div className="booking-card-lux">
            
          <div className="booking-progress">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((s) => (
              <div key={s} className={`progress-dot ${step >= s ? 'active' : ''} ${step > s ? 'completed' : ''}`}>
                <span>{step > s ? '✓' : s}</span>
              </div>
            ))}
          </div>

          <div className="booking-content-area">
            {error && <div className="modal-error mb-6">{error}</div>}

            {/* STEP 1: MOBILE NUMBER */}
            {step === 1 && (
              <div className="step-box animate-up">
                <h2>Verify Your Number</h2>
                <p>Enter your mobile number to receive an OTP.</p>
                <div className="input-group">
                  <span className="prefix">+91</span>
                  <input 
                    type="tel" 
                    placeholder="Mobile Number" 
                    value={formData.phone} 
                    onChange={(e) => setFormData({...formData, phone: e.target.value.replace(/\D/g, '')})}
                  />
                </div>
                <button className="btn-primary w-full mt-6" onClick={requestOtp} disabled={loading}>
                  {loading ? 'Sending...' : 'Send OTP'}
                </button>
              </div>
            )}

            {/* STEP 2: OTP VERIFY */}
            {step === 2 && (
              <div className="step-box animate-up">
                <h2>Enter OTP</h2>
                <p>We've sent a 6-digit code to {formData.phone}</p>
                <input 
                  type="text" 
                  placeholder="Enter 6-digit OTP" 
                  className="otp-input-field"
                  maxLength={6}
                  value={formData.otp}
                  onChange={(e) => setFormData({...formData, otp: e.target.value.replace(/\D/g, '')})}
                />
                <button className="btn-primary w-full mt-6" onClick={verifyAndProceed} disabled={loading}>
                  {loading ? 'Verifying...' : 'Verify & Proceed'}
                </button>
                <div className="resend-box mt-4">
                  {resendTimer > 0 ? (
                    <p>Resend in {Math.floor(resendTimer/60)}:{(resendTimer%60).toString().padStart(2, '0')}</p>
                  ) : (
                    <button className="btn-text" onClick={requestOtp}>Resend OTP</button>
                  )}
                </div>
              </div>
            )}

            {/* STEP 3: LOCATION */}
            {step === 3 && (
              <div className="step-box animate-up text-center">
                <div className="location-icon">📍</div>
                <h2>Location Access</h2>
                <p>Help us find the nearest hospital for you.</p>
                <button className="btn-teal w-full mt-6" onClick={requestLocation} disabled={loading}>
                  {loading ? 'Accessing...' : 'Allow Location Access'}
                </button>
                <button className="btn-text mt-4" onClick={handleNext}>Skip for now</button>
              </div>
            )}

            {/* STEP 4: DEPARTMENT */}
            {step === 4 && (
              <div className="step-box animate-up">
                <h2>Select Department</h2>
                <div className="dept-grid-small">
                  {departments.map((d) => (
                    <div 
                      key={d.id} 
                      className={`dept-item-select ${formData.department === d.name ? 'selected' : ''}`}
                      onClick={() => setFormData({...formData, department: d.name})}
                    >
                      {d.name}
                    </div>
                  ))}
                </div>
                <div className="btn-row mt-8">
                  <button className="btn-secondary" onClick={handleBack}>Back</button>
                  <button className="btn-primary" onClick={handleNext} disabled={!formData.department}>Next</button>
                </div>
              </div>
            )}

            {/* STEP 5: DOCTOR */}
            {step === 5 && (
              <div className="step-box animate-up">
                <h2>Select Doctor</h2>
                <div className="doctor-select-list">
                  {filteredDoctors.length > 0 ? (
                    filteredDoctors.map((d, i) => (
                      <div 
                        key={i} 
                        className={`doc-item-select ${formData.doctor === d.name ? 'selected' : ''}`}
                        onClick={() => setFormData({...formData, doctor: d.name})}
                      >
                        <div className="doc-sel-info">
                          <strong>{d.name}</strong>
                          <span>{d.qualification}</span>
                        </div>
                        <div className="doc-sel-meta">
                          <span className="fee">Fee: ₹500</span>
                          <span className="avail">Available Today</span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p>No doctors found in this department.</p>
                  )}
                </div>
                <div className="btn-row mt-8">
                  <button className="btn-secondary" onClick={handleBack}>Back</button>
                  <button className="btn-primary" onClick={handleNext} disabled={!formData.doctor}>Next</button>
                </div>
              </div>
            )}

            {/* STEP 6: DATE & TIME */}
            {step === 6 && (
              <div className="step-box animate-up">
                <h2>Select Date & Time</h2>
                <div className="datetime-row">
                  <div className="date-pick">
                    <label>Appointment Date</label>
                    <input type="date" value={formData.date} min={new Date().toISOString().split('T')[0]} onChange={(e) => setFormData({...formData, date: e.target.value})} />
                  </div>
                </div>
                <div className="time-slots mt-6">
                  <label>Available Slots</label>
                  <div className="slots-grid">
                    {['10:00 AM', '10:30 AM', '11:00 AM', '02:00 PM', '02:30 PM'].map((t) => (
                      <div 
                        key={t} 
                        className={`slot ${formData.time === t ? 'selected' : ''}`}
                        onClick={() => setFormData({...formData, time: t})}
                      >
                        {t}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="btn-row mt-8">
                  <button className="btn-secondary" onClick={handleBack}>Back</button>
                  <button className="btn-primary" onClick={handleNext} disabled={!formData.date || !formData.time}>Next</button>
                </div>
              </div>
            )}

            {/* STEP 7: PATIENT DETAILS */}
            {step === 7 && (
              <div className="step-box animate-up">
                <h2>Patient Details</h2>
                <div className="details-form">
                  <input type="text" placeholder="Full Name *" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  <div className="form-row">
                    <input type="number" placeholder="Age *" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} />
                    <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})}>
                      <option value="">Gender *</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <input type="email" placeholder="Email Address (Optional)" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <textarea placeholder="Symptoms / Reason for visit" rows="3" value={formData.symptoms} onChange={(e) => setFormData({...formData, symptoms: e.target.value})}></textarea>
                </div>
                <div className="btn-row mt-8">
                  <button className="btn-secondary" onClick={handleBack}>Back</button>
                  <button className="btn-primary" onClick={() => {
                    if (!formData.name || !formData.gender || !formData.age) {
                      setError('Please fill all mandatory patient details');
                      return;
                    }
                    setError('');
                    setStep(8);
                  }}>Proceed to Payment</button>
                </div>
              </div>
            )}

            {/* STEP 8: PAYMENT */}
            {step === 8 && (
              <div className="step-box animate-up">
                <h2>Payment Details</h2>
                <div className="payment-summary card">
                  {formData.isPackage ? (
                    <>
                      <div className="summary-row"><span>{formData.packageName}</span> <span>₹{formData.price}.00</span></div>
                      <div className="summary-row text-sm text-muted"><span>(Inclusive of all taxes)</span></div>
                      <hr />
                      <div className="summary-row total"><span>Total Payable</span> <span>₹{formData.price}.00</span></div>
                    </>
                  ) : (
                    <>
                      <div className="summary-row"><span>Consultation Fee</span> <span>₹500.00</span></div>
                      <div className="summary-row"><span>GST (18%)</span> <span>₹90.00</span></div>
                      <hr />
                      <div className="summary-row total"><span>Total Payable</span> <span>₹590.00</span></div>
                    </>
                  )}
                </div>
                <div className="demo-card-ui mt-6">
                  <div className="fake-card-input">XXXX XXXX XXXX 1234</div>
                  <div className="fake-row">
                    <span>MM/YY</span>
                    <span>CVV</span>
                  </div>
                </div>
                <button className="btn-primary w-full mt-8" onClick={processPayment} disabled={loading}>
                  {loading ? 'Processing Payment...' : 'Pay & Confirm Appointment'}
                </button>
              </div>
            )}

            {/* STEP 9: SUCCESS */}
            {step === 9 && (
              <div className="step-box animate-up text-center">
                <div className="success-lottie">✅</div>
                <h2>Appointment Confirmed!</h2>
                <p className="success-msg">Your appointment has been successfully scheduled.</p>
                
                <div className="appointment-slip card mt-8">
                  <div className="slip-header">
                    <strong>SPARSH HOSPITALS</strong>
                    <span>OPD Slip</span>
                  </div>
                  <div className="slip-body">
                    <div className="s-row"><span>Appt ID:</span> <strong>{formData.id}</strong></div>
                    {formData.isPackage ? (
                      <div className="s-row"><span>Package:</span> <strong>{formData.packageName}</strong></div>
                    ) : (
                      <>
                        <div className="s-row"><span>Doctor:</span> <strong>{formData.doctor}</strong></div>
                        <div className="s-row"><span>Dept:</span> <strong>{formData.department}</strong></div>
                      </>
                    )}
                    <div className="s-row"><span>Time:</span> <strong>{formData.date} | {formData.time}</strong></div>
                  </div>
                </div>

                <div className="success-actions mt-8">
                  <button className="btn-primary" onClick={handleDownloadOPD}>Download Appointment Card (PDF)</button>
                  <button className="btn-secondary ml-4" onClick={handleAddToCalendar}>Add to Calendar</button>
                </div>
                <button className="btn-text mt-8" onClick={() => window.location.href='/dashboard'}>Go to Dashboard</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <OpdSlipTemplate data={formData} ref={opdRef} />

      <div className="booking-visual-side hide-mobile">
        <img src={bookingHeroImg} alt="Expert Doctor" className="booking-hero-img" />
        
        <div className="booking-trust-overlay">
          <div className="trust-badge">
            <span className="tb-icon">⭐</span>
            <div className="tb-text">
              <strong>4.9/5 Rating</strong>
              <span>From 10,000+ Patients</span>
            </div>
          </div>
          
          <div className="trust-badge">
            <span className="tb-icon">👨‍⚕️</span>
            <div className="tb-text">
              <strong>100+ Specialists</strong>
              <span>World-Class Experts</span>
            </div>
          </div>

          <div className="trust-badge">
            <span className="tb-icon">🏥</span>
            <div className="tb-text">
              <strong>NABH Accredited</strong>
              <span>Excellence in Healthcare</span>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
