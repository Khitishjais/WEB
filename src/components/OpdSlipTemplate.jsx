import React from 'react';
import Barcode from 'react-barcode';
import sparshLogo from '../assets/images/sparsh_logo.png';
import './OpdSlip.css';

const OpdSlipTemplate = React.forwardRef(({ data }, ref) => {
  const apptId = data?.id || `SH-${Date.now()}`;
  
  return (
    <div className="opd-slip-container-hidden">
      <div className="appt-card-wrapper" ref={ref}>
        {/* Header */}
        <div className="appt-card-header">
          SPARSH APPOINTMENT CONFIRMATION
        </div>

        {/* Body */}
        <div className="appt-card-body">
          <div className="appt-card-row">
            <span className="label">Appt ID</span>
            <span className="value">: {apptId}</span>
          </div>
          <div className="appt-card-row">
            <span className="label">Patient</span>
            <span className="value">: {data?.name || '---'}</span>
          </div>
          <div className="appt-card-row">
            <span className="label">Gender</span>
            <span className="value">: {data?.gender || '---'}</span>
          </div>
          <div className="appt-card-row">
            <span className="label">Doctor</span>
            <span className="value">: {data?.doctor || '---'}</span>
          </div>
          <div className="appt-card-row">
            <span className="label">Dept</span>
            <span className="value">: {data?.department || '---'}</span>
          </div>
          <div className="appt-card-row">
            <span className="label">Date/Time</span>
            <span className="value">: {data?.date} @ {data?.time}</span>
          </div>

          {/* Barcode */}
          <div className="appt-card-barcode">
            <Barcode 
              value={apptId} 
              width={2} 
              height={60} 
              displayValue={true} 
              fontSize={14} 
              background="transparent" 
            />
          </div>
        </div>

        {/* Footer */}
        <div className="appt-card-footer">
          Please show this card at the reception
        </div>
      </div>
    </div>
  );
});

export default OpdSlipTemplate;
