import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faLinkedinIn, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHeart, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const year = new Date().getFullYear();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterStatus, setNewsletterStatus] = useState(null);
  const [subscribing, setSubscribing] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setSubscribing(true);
    setNewsletterStatus(null);
    try {
      const res = await fetch('http://localhost:5000/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        setNewsletterStatus('success');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus(null), 4000);
      } else {
        setNewsletterStatus('error');
      }
    } catch {
      setNewsletterStatus('error');
    } finally {
      setSubscribing(false);
    }
  };

  const socialLinks = [
    { icon: faFacebookF, href: '#', label: 'Facebook' },
    { icon: faTwitter, href: '#', label: 'Twitter' },
    { icon: faInstagram, href: '#', label: 'Instagram' },
    { icon: faLinkedinIn, href: '#', label: 'LinkedIn' },
    { icon: faYoutube, href: '#', label: 'YouTube' },
  ];

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About Us' },
    { href: '#causes', label: 'Our Causes' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <footer className="footer">
      <div className="footer-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.07,209.4,13.07,36.15-5.6,73.23-15.21,107.57-29.65,34.18-14.38,64.78-33.58,97.58-48.71,32.79-15.13,68.76-27.32,103.45-29.84,34.69-2.52,67.74,5.22,100.4,15.62,32.63,10.4,64.84,24.52,93.77,41.79V0Z" fill="currentColor"></path>
        </svg>
      </div>

      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand" data-aos="fade-up">
              <h3 className="footer-logo">✦ She Can Foundation</h3>
              <p className="footer-mission">
                Empowering youth through education, opportunities, and digital initiatives.
                Building a future where every dream finds its wings.
              </p>
              <div className="footer-social">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="social-link"
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FontAwesomeIcon icon={link.icon} />
                  </a>
                ))}
              </div>
            </div>

            <div className="footer-links" data-aos="fade-up" data-aos-delay="100">
              <h4>Quick Links</h4>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-newsletter" data-aos="fade-up" data-aos-delay="200">
              <h4>Stay Connected</h4>
              <p>Join our newsletter to receive updates on our programs and initiatives.</p>
              {newsletterStatus === 'success' && (
                <div className="newsletter-success">
                  <FontAwesomeIcon icon={faCheckCircle} /> Subscribed successfully!
                </div>
              )}
              {newsletterStatus === 'error' && (
                <div className="newsletter-error">Subscription failed. Try again.</div>
              )}
              <form className="newsletter-form" onSubmit={handleSubscribe}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                />
                <button className="btn btn-primary" type="submit" disabled={subscribing}>
                  {subscribing ? 'Subscribing...' : 'Subscribe'}
                </button>
              </form>
            </div>
          </div>

          <div className="footer-bottom">
            <p>
              &copy; {year} She Can Foundation. All rights reserved.
              Made with <FontAwesomeIcon icon={faHeart} className="heart-icon" /> for a better tomorrow.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
