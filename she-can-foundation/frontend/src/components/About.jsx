import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faStar, faHandsHelping, faGlobe } from '@fortawesome/free-solid-svg-icons';

const aboutCards = [
  {
    icon: faGraduationCap,
    title: 'Education',
    description:
      'She Can Foundation believes that education is the most powerful weapon to change the world. We provide access to quality learning resources, scholarships, and mentorship programs for underprivileged youth, bridging the gap between ambition and opportunity.',
    color: '#8B5CF6',
  },
  {
    icon: faStar,
    title: 'Women Empowerment',
    description:
      'We are dedicated to creating a world where every woman can realize her full potential. Through skill development workshops, leadership training, and awareness campaigns, we equip women with the tools they need to thrive.',
    color: '#EC4899',
  },
  {
    icon: faHandsHelping,
    title: 'Community Support',
    description:
      'Strong communities are built on collaboration and mutual support. Our initiatives bring people together to address local challenges, from food drives to health camps, fostering a spirit of collective growth and solidarity.',
    color: '#F59E0B',
  },
  {
    icon: faGlobe,
    title: 'Digital Awareness',
    description:
      'In an increasingly digital world, we ensure no one is left behind. Our digital literacy programs teach essential technology skills, online safety, and digital citizenship, empowering individuals to navigate the digital age confidently.',
    color: '#10B981',
  },
];

function About() {
  return (
    <section id="about" className="about section">
      <div className="container">
        <h2 className="section-title" data-aos="fade-up">
          Our Mission
        </h2>
        <p className="section-subtitle" data-aos="fade-up" data-aos-delay="50">
          She Can Foundation is on a mission to create lasting social impact through
          education, empowerment, and innovation. We believe every individual has the
          power to make a difference.
        </p>

        <div className="about-story" data-aos="fade-up" data-aos-delay="100">
          <div className="story-content glass">
            <h3>Our Story</h3>
            <p>
              Founded in 2020 by a group of passionate young changemakers, She Can Foundation
              started as a small initiative to provide educational support to underprivileged
              children. Today, we have grown into a vibrant community of volunteers, educators,
              and advocates working across multiple domains to create lasting social impact.
            </p>
            <p>
              Our journey has been fueled by the unwavering belief that when you empower
              one person, you transform an entire community. From digital literacy workshops
              in rural areas to leadership programs for young women, every initiative we
              undertake is a step toward a more equitable and empowered society.
            </p>
          </div>
        </div>

        <div className="about-cards">
          {aboutCards.map((card, index) => (
            <div
              key={card.title}
              className="about-card glass"
              data-aos="fade-up"
              data-aos-delay={100 + index * 100}
            >
              <div className="card-icon" style={{ background: `${card.color}20`, color: card.color }}>
                <FontAwesomeIcon icon={card.icon} />
              </div>
              <h3 className="card-title">{card.title}</h3>
              <p className="card-description">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;
