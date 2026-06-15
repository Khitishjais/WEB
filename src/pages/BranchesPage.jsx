import React from 'react';
import Branches from '../components/Branches';

export default function BranchesPage() {
  return (
    <div style={{ 
      paddingTop: '120px', 
      minHeight: '80vh', 
      background: 'var(--color-bg)',
      backgroundImage: 'radial-gradient(at 0% 0%, rgba(16, 185, 129, 0.04) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(13, 148, 136, 0.04) 0px, transparent 50%)'
    }}>
      <Branches />
    </div>
  );
}
