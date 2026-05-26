import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faLaptopCode, faLeaf, faUsers, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const causes = [
  {
    icon: faBookOpen,
    title: 'Quality Education For All',
    description: 'Providing scholarships, learning materials, and tutoring programs to ensure every child has access to quality education regardless of their background.',
    impact: '200+ Students Supported',
    gradient: 'linear-gradient(135deg, #8B5CF6, #6D28D9)',
  },
  {
    icon: faLaptopCode,
    title: 'Digital Literacy Drive',
    description: 'Teaching essential computer skills, internet safety, and digital tools to bridge the digital divide in underserved communities.',
    impact: '15 Workshops Conducted',
    gradient: 'linear-gradient(135deg, #3B82F6, #1D4ED8)',
  },
  {
    icon: faLeaf,
    title: 'Sustainable Development',
    description: 'Promoting environmental awareness through tree planting drives, clean-up campaigns, and sustainability education programs.',
    impact: '1000+ Trees Planted',
    gradient: 'linear-gradient(135deg, #10B981, #047857)',
  },
  {
    icon: faUsers,
    title: 'Youth Leadership Program',
    description: 'Empowering young leaders through mentorship, public speaking workshops, and community organizing training to drive positive change.',
    impact: '150+ Youth Leaders Trained',
    gradient: 'linear-gradient(135deg, #F59E0B, #D97706)',
  },
];

function Causes() {
  return (
    <section id="causes" className="causes section">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          Our Causes
        </h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="50">
          Every initiative we undertake is driven by the goal of creating measurable,
          sustainable impact in communities that need it most.
        </p>

        <div className="causes-grid">
          {causes.map((cause, index) => (
            <div
              key={cause.title}
              className="cause-card"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div className="cause-card-header" style={{ background: cause.gradient }}>
                <div className="cause-icon">
                  <FontAwesomeIcon icon={cause.icon} />
                </div>
                <span className="cause-impact">{cause.impact}</span>
              </div>
              <div className="cause-card-body">
                <h3>{cause.title}</h3>
                <p>{cause.description}</p>
                <a href="#contact" className="cause-link">
                  Get Involved <FontAwesomeIcon icon={faArrowRight} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Causes;
