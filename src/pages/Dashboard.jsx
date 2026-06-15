import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Calendar, CreditCard, Download, ExternalLink, LogOut } from 'lucide-react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import OpdSlipTemplate from '../components/OpdSlipTemplate';
import './Dashboard.css';

function Dashboard() {
  const { user, token, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('appointments');
  const [appointments, setAppointments] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppt, setSelectedAppt] = useState(null);
  const opdRef = useRef(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleDownloadOPD = async (appt) => {
    setSelectedAppt(appt);
    // Wait for state to update and template to render
    setTimeout(async () => {
      const element = opdRef.current;
      if (!element) return;
      
      const originalScrollY = window.scrollY;
      window.scrollTo(0, 0);
      
      try {
        const canvas = await html2canvas(element, { 
          scale: 2,
          useCORS: true,
          backgroundColor: '#fcf9f2'
        });
        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
        
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Sparsh_OPD_Slip_${appt.id}.pdf`);
      } catch (error) {
        console.error("Error generating PDF", error);
      } finally {
        window.scrollTo(0, originalScrollY);
      }
    }, 100);
  };

  const fetchDashboardData = async () => {
    try {
      const [apptsRes, txnsRes] = await Promise.all([
        fetch('http://localhost:4000/api/user/appointments', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:4000/api/user/transactions', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      if (apptsRes.ok) setAppointments(await apptsRes.json());
      if (txnsRes.ok) setTransactions(await txnsRes.json());
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'confirmed': return 'status-success';
      case 'cancelled': return 'status-danger';
      default: return 'status-warning';
    }
  };

  return (
    <div className="dashboard-lux">
      <div className="container-fluid">
        <div className="dashboard-grid">
          {/* Sidebar */}
          <aside className="dash-sidebar glass">
            <div className="user-profile-summary">
              <div className="user-avatar-large">
                {user?.name ? user.name[0] : <User />}
              </div>
              <h3>{user?.name || 'Guest Patient'}</h3>
              <p>{user?.phone}</p>
            </div>
            
            <nav className="dash-nav">
              <button className={activeTab === 'profile' ? 'active' : ''} onClick={() => setActiveTab('profile')}>
                <User size={20} /> Profile
              </button>
              <button className={activeTab === 'appointments' ? 'active' : ''} onClick={() => setActiveTab('appointments')}>
                <Calendar size={20} /> Appointments
              </button>
              <button className={activeTab === 'transactions' ? 'active' : ''} onClick={() => setActiveTab('transactions')}>
                <CreditCard size={20} /> Transactions
              </button>
              <button className="logout-btn" onClick={logout}>
                <LogOut size={20} /> Logout
              </button>
            </nav>
          </aside>

          {/* Content Area */}
          <main className="dash-main-content">
            {activeTab === 'appointments' && (
              <div className="dash-section animate-up">
                <div className="section-header">
                  <h2>Appointment History</h2>
                  <p>View and manage your consultation schedule</p>
                </div>
                
                {loading ? <div className="dash-loader">Loading...</div> : (
                  <div className="dash-list">
                    {appointments.length > 0 ? appointments.map((appt) => (
                      <div key={appt.id} className="dash-card glass">
                        <div className="appt-info">
                          <div className="appt-main">
                            <h4>{appt.doctor}</h4>
                            <span>{appt.department}</span>
                          </div>
                          <div className="appt-date">
                            <strong>{appt.date}</strong>
                            <span>{appt.time}</span>
                          </div>
                        </div>
                        <div className="appt-footer">
                          <span className={`status-badge ${getStatusColor(appt.status)}`}>{appt.status}</span>
                          <div className="appt-actions">
                            <button 
                              className="btn-dash-action" 
                              onClick={() => handleDownloadOPD(appt)}
                              title="Redownload Appointment Card"
                            >
                              <Download size={16} /> <span>Download Card</span>
                            </button>
                            <button className="icon-btn-lux" title="Add to Calendar"><ExternalLink size={18} /></button>
                          </div>
                        </div>
                      </div>
                    )) : (
                      <div className="empty-state">No appointments found.</div>
                    )}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'transactions' && (
              <div className="dash-section animate-up">
                <div className="section-header">
                  <h2>Transactions</h2>
                  <p>Secure history of your payments</p>
                </div>
                <div className="txn-table-wrap glass">
                  <table className="dash-table">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>TXN ID</th>
                        <th>Amount</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transactions.map(txn => (
                        <tr key={txn.id}>
                          <td>{new Date(txn.createdAt).toLocaleDateString()}</td>
                          <td>{txn.id}</td>
                          <td>₹{txn.amount}</td>
                          <td><span className={`status-badge ${txn.status === 'Success' ? 'status-success' : 'status-danger'}`}>{txn.status}</span></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {transactions.length === 0 && <div className="empty-state p-8">No transactions found.</div>}
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="dash-section animate-up">
                <div className="section-header">
                  <h2>Profile Settings</h2>
                  <p>Keep your contact details up to date</p>
                </div>
                <div className="profile-form-glass glass">
                  <div className="form-grid">
                    <div className="input-group-dash">
                      <label>Full Name</label>
                      <input type="text" defaultValue={user?.name} placeholder="Enter your name" />
                    </div>
                    <div className="input-group-dash">
                      <label>Email Address</label>
                      <input type="email" defaultValue={user?.email} placeholder="Enter your email" />
                    </div>
                    <div className="input-group-dash">
                      <label>Phone Number</label>
                      <input type="text" value={user?.phone} disabled />
                    </div>
                    <div className="input-group-dash">
                      <label>Gender</label>
                      <select defaultValue={user?.gender}>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <button className="btn-lux mt-8">Save Changes</button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
      
      {/* Hidden Template for PDF Generation */}
      {selectedAppt && (
        <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
          <OpdSlipTemplate data={selectedAppt} ref={opdRef} />
        </div>
      )}
    </div>
  );
}

export default Dashboard;
