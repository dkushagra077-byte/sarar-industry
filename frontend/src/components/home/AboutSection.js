import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  const highlights = [
    { title: '50+ Years of Manufacturing Experience', desc: 'Over five decades of manufacturing excellence, craftsmanship, and trusted customer relationships.' },
    { title: 'Industrial Product Expertise', desc: 'Deep technical competence in industrial thermal insulation, fluid gasketing, and engineered elastomer solutions.' },
    { title: 'Quality-Focused Manufacturing', desc: 'Strict manufacturing processes ensuring continuous dimensional accuracy, thermal resistance, and long-term durability.' },
    { title: 'Customer-Centric Solutions', desc: 'Delivering tailored industrial products designed to meet the rigorous specifications of various heavy industries.' },
    { title: 'Reliable Industrial Products', desc: 'Dependable products engineered for demanding operating environments under intense thermal and mechanical stress.' }
  ];

  return (
    <section className="section-py" style={{ backgroundColor: '#ffffff' }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '50px',
          alignItems: 'center'
        }}>
          
          <div>
            <div className="section-heading-tag">About SARAR INDUSTRIES</div>
            <h2 className="section-title">
              Built on 50 Years of Manufacturing Experience
            </h2>
            
            <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.8', marginBottom: '20px' }}>
              <strong>SARAR INDUSTRIES</strong> is a trusted manufacturer of industrial sealing, insulation, rubber and engineered products, backed by over 50 years of manufacturing experience and expertise.
            </p>

            <p style={{ fontSize: '0.975rem', color: '#475569', lineHeight: '1.8', marginBottom: '20px' }}>
              With a strong foundation in quality craftsmanship, technical knowledge and manufacturing excellence, we specialize in producing a comprehensive range of asbestos and ceramic products under our brand <strong>SAKET</strong>, along with rubber products and other engineered components under our brand <strong>DWITECH</strong>.
            </p>

            <p style={{ fontSize: '0.975rem', color: '#475569', lineHeight: '1.8', marginBottom: '28px' }}>
              As manufacturers, we maintain a strong focus on product quality, consistent performance and customer satisfaction, delivering reliable industrial solutions to meet the diverse requirements of various industries. Our legacy of over five decades reflects our commitment to innovation, reliability and long-term customer relationships.
            </p>

            <Link to="/about" className="btn btn-primary">
              Read Our Full Story →
            </Link>
          </div>

          {/* Highlights List */}
          <div style={{
            backgroundColor: '#f8fafc',
            border: '1px solid #e2e8f0',
            borderRadius: '12px',
            padding: '36px 32px'
          }}>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '24px', color: '#0b1d33' }}>
              Manufacturing Pillars
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {highlights.map((h, i) => (
                <div key={i} style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: '#0b1d33',
                    color: '#d97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                    marginTop: '2px'
                  }}>
                    ✓
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.975rem', color: '#0b1d33', marginBottom: '4px' }}>
                      {h.title}
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#64748b', margin: 0, lineHeight: '1.5' }}>
                      {h.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default AboutSection;
