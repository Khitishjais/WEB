import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Phone, Lock, ArrowRight, Loader2 } from 'lucide-react';
import './LoginModal.css';

function LoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [step, setStep] = useState(1);
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [timer, setTimer] = useState(0);
  const { login } = useAuth();

  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer(t => t - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  if (!isOpen) return null;

  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (phone.length !== 10) return setError('Enter a valid 10-digit number');
    
    setLoading(true);
    setError('');
    try {
      const res = await fetch('http://localhost:4000/api/auth/request-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone })
      });
      const data = await res.json();
      if (res.ok) {
        setStep(2);
        setTimer(120); // 2 minutes
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError('Connection failed. Is the server running?');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const result = await login(phone, otp);
    if (result.success) {
      onLoginSuccess?.();
      onClose();
    } else {
      setError(result.message);
      setLoading(false);
    }
  };

  return (
    <div className="login-modal-overlay">
      <div className="login-modal-content glass animate-up">
        <button className="modal-close" onClick={onClose}><X size={20} /></button>
        
        <div className="modal-header">
          <div className="modal-logo">⚕️</div>
          <h2>{step === 1 ? 'Welcome Back' : 'Verify OTP'}</h2>
          <p>{step === 1 ? 'Login to manage your appointments' : `Code sent to +91 ${phone}`}</p>
        </div>

        {error && <div className="modal-error">{error}</div>}

        <form onSubmit={step === 1 ? handleRequestOtp : handleVerifyOtp}>
          {step === 1 ? (
            <div className="input-field-lux">
              <Phone size={18} />
              <span className="prefix">+91</span>
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                maxLength={10}
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                autoFocus
              />
            </div>
          ) : (
            <div className="input-field-lux">
              <Lock size={18} />
              <input 
                type="text" 
                placeholder="Enter 6-digit OTP" 
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                autoFocus
              />
            </div>
          )}

          <button className="btn-lux w-full mt-6" disabled={loading}>
            {loading ? <Loader2 className="animate-spin mx-auto" /> : (
              step === 1 ? 'Send OTP' : 'Verify & Login'
            )}
          </button>
        </form>

        {step === 2 && (
          <div className="resend-box">
            {timer > 0 ? (
              <p>Resend code in <span>{Math.floor(timer/60)}:{(timer%60).toString().padStart(2, '0')}</span></p>
            ) : (
              <button className="btn-text" onClick={handleRequestOtp} disabled={loading}>Resend OTP</button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginModal;
