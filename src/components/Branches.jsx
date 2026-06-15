import React from 'react';
import { MapPin, Building2, ExternalLink } from 'lucide-react';
import './Branches.css';

function Branches() {
  const branchList = [
    {
      name: "Main Branch — Sahid Nagar",
      location: "Plot No. 184, Sahid Nagar, Bhubaneswar, Odisha 751007",
      mapLink: "https://maps.app.goo.gl/sEbH9wDZtGJ2BF1r9?g_st=ic",
      bgImage: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=800&auto=format&fit=crop"
    },
    {
      name: "Sparsh Hospital — Kantabada",
      location: "Kantabada, Bhubaneswar, Odisha",
      mapLink: "https://maps.app.goo.gl/jmvDSCumxudyHfyP7?g_st=ic",
      bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
    }
  ];

  return (
    <section className="branches section-padding">
      <div className="container">
        <div className="section-title">
          <h5 className="sub-title">OUR BRANCHES</h5>
          <h2>Accessible Healthcare Across Regions</h2>
          <p>Find the nearest Sparsh Hospital branch for world-class medical care.</p>
        </div>

        <div className="branches-grid">
          {branchList.map((branch, index) => (
            <div key={index} className="branch-lux-card animate-up" style={{animationDelay: `${index * 0.2}s`}}>
              <div className="branch-bg" style={{ backgroundImage: `url(${branch.bgImage})` }}></div>
              <div className="branch-overlay-lux"></div>
              <div className="branch-content-lux glass">
                <div className="branch-header-flex">
                  <div className="branch-icon-wrap">
                    <Building2 className="branch-lucide-icon" size={28} strokeWidth={1.5} />
                  </div>
                  <h3>{branch.name}</h3>
                </div>
                <p className="loc-text"><MapPin size={18} className="loc-pin" /> {branch.location}</p>
                <div className="branch-actions">
                  <a 
                    href={branch.mapLink} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="btn-outline-lux btn-map-lux"
                  >
                    View on Google Maps <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Branches;
