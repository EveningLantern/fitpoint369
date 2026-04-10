import React from 'react';

const Page = ({ title, description, children }) => {
  return (
    <div className="page-wrapper section">
      <div className="container">
        <header className="page-header rounded-rect glass-card">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <div className="page-content">
          {children || (
            <div className="placeholder-content rounded-rect">
              <div className="grid">
                {[1, 2, 3].map(i => (
                  <div key={i} className="card glass-card">
                    <div className="card-img" style={{background: `linear-gradient(135deg, var(--primary-green), var(--accent-green))`}}></div>
                    <h3>Feature {i}</h3>
                    <p>Modern fitness solutions tailored for your body and mind.</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .page-wrapper {
          padding-top: 140px;
          min-height: 100vh;
        }
        
        .page-header {
          padding: 4rem;
          margin-bottom: 3rem;
          text-align: center;
          background: linear-gradient(135deg, var(--glass), rgba(34, 197, 94, 0.1));
        }

        .page-header h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1rem;
          background: linear-gradient(to right, var(--primary-green), var(--accent-green));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .page-header p {
          font-size: 1.2rem;
          max-width: 600px;
          margin: 0 auto;
          opacity: 0.8;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
        }

        .card {
          padding: 2rem;
          text-align: left;
          transition: var(--transition);
        }

        .card:hover {
          transform: translateY(-10px);
          border-color: var(--accent-green);
        }

        .card-img {
          height: 150px;
          margin-bottom: 1.5rem;
          border-radius: var(--radius-md);
        }

        .card h3 {
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
};

export default Page;
