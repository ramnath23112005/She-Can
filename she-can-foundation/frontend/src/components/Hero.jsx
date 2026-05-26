import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-bg">
        <div className="hero-shape shape-1"></div>
        <div className="hero-shape shape-2"></div>
        <div className="hero-shape shape-3"></div>
      </div>

      <div className="hero-content">
        <div className="hero-badge" data-aos="fade-down">
          <FontAwesomeIcon icon={faHeart} className="badge-icon" />
          Youth-Driven NGO
        </div>

        <h1 className="hero-title" data-aos="fade-up" data-aos-delay="100">
          She Can{' '}
          <span className="gradient-text">Foundation</span>
        </h1>

        <p className="hero-subtitle" data-aos="fade-up" data-aos-delay="200">
          Empowering youth through education, opportunities, and digital initiatives.
          Together, we build a future where every dream finds its wings.
        </p>

        <div className="hero-actions" data-aos="fade-up" data-aos-delay="300">
          <a href="#about" className="btn btn-primary">
            Explore Our Mission
            <FontAwesomeIcon icon={faArrowRight} />
          </a>
          <a href="#contact" className="btn btn-outline">
            Join Us Today
          </a>
        </div>

        <div className="hero-stats" data-aos="fade-up" data-aos-delay="400">
          <div className="stat-item">
            <span className="stat-number">500+</span>
            <span className="stat-label">Youth Empowered</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">25+</span>
            <span className="stat-label">Programs</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-number">10+</span>
            <span className="stat-label">Communities</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
