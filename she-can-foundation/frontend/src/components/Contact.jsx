import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle, faMapMarkerAlt, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

function Contact() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const validate = () => {
    const errs = {};
    if (!formData.fullName.trim()) errs.fullName = 'Name is required';
    if (!formData.email.trim()) errs.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      errs.email = 'Invalid email format';
    if (!formData.phone.trim()) errs.phone = 'Phone number is required';
    else if (!/^[+]?[\d\s()-]{7,15}$/.test(formData.phone))
      errs.phone = 'Invalid phone number';
    if (!formData.message.trim()) errs.message = 'Message is required';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    try {
      const res = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({ fullName: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 4000);
      }
    } catch {
      setErrors({ submit: 'Server unavailable. Please try again later.' });
    } finally {
      setSubmitting(false);
    }
  };

  const contactInfo = [
    { icon: faMapMarkerAlt, text: '123 Hope Street, Mumbai, India' },
    { icon: faEnvelope, text: 'hello@shecanfoundation.org' },
    { icon: faPhone, text: '+91 98765 43210' },
  ];

  return (
    <section id="contact" className="contact section">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          Get In Touch
        </h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="50">
          Want to volunteer, partner with us, or just say hello? We would love to hear from you!
        </p>

        <div className="contact-wrapper">
          <div className="contact-info" data-aos="fade-right">
            <h3>Let's Connect</h3>
            <p>
              Whether you have questions, ideas, or want to contribute your time and
              skills, reach out to us. Together, we can make a difference.
            </p>
            {contactInfo.map((item, i) => (
              <div key={i} className="info-item">
                <div className="info-icon">
                  <FontAwesomeIcon icon={item.icon} />
                </div>
                <span>{item.text}</span>
              </div>
            ))}
            <div className="contact-social">
              <p>Follow us on social media for updates and stories.</p>
            </div>
          </div>

          <form className="contact-form glass" onSubmit={handleSubmit} data-aos="fade-left">
            {submitted && (
              <div className="success-popup">
                <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                <div>
                  <strong>Thank You!</strong>
                  <p>We have received your message and will get back to you soon.</p>
                </div>
              </div>
            )}

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  placeholder="Your full name"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={errors.fullName ? 'error' : ''}
                />
                {errors.fullName && <span className="error-text">{errors.fullName}</span>}
              </div>
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-text">{errors.email}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange}
                  className={errors.phone ? 'error' : ''}
                />
                {errors.phone && <span className="error-text">{errors.phone}</span>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="message">Your Message</label>
              <textarea
                id="message"
                name="message"
                rows="5"
                placeholder="Tell us how you would like to help or what you would like to know..."
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
              ></textarea>
              {errors.message && <span className="error-text">{errors.message}</span>}
            </div>

            {errors.submit && <div className="error-text submit-error">{errors.submit}</div>}

            <button
              type="submit"
              className="btn btn-primary submit-btn"
              disabled={submitting}
            >
              {submitting ? (
                <span className="btn-loading">
                  <span className="spinner"></span> Sending...
                </span>
              ) : (
                <>
                  Send Message <FontAwesomeIcon icon={faPaperPlane} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Contact;
