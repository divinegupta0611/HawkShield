import React, { useState } from 'react';
import '../style/HomeCSS.css';
import NavBar from '../components/NavBar.jsx';
const Home = () => {
  const [user] = useState({ name: 'User' }); // Replace with actual user data

  return (
    <div className="home-container">
        <NavBar/>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Advanced Surveillance & Threat Detection</h1>
          <p>Protecting what matters most with AI-powered security solutions</p>
          <button className="cta-button">Get Started</button>
        </div>
      </section>

      {/* Add Cameras Feature */}
      <section className="cameras-section">
        <div className="section-content">
          <h2>Add & Manage Cameras</h2>
          <p>Seamlessly integrate multiple camera feeds into your security network</p>
          <div className="camera-features">
            <div className="feature-card">
              <div className="feature-icon">📹</div>
              <h3>Easy Integration</h3>
              <p>Connect IP cameras, CCTV systems, and webcams with just a few clicks</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>Real-time Monitoring</h3>
              <p>Watch live feeds from all your cameras in one centralized dashboard</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Instant Alerts</h3>
              <p>Get notified immediately when threats are detected</p>
            </div>
          </div>
          <button className="secondary-button">Add Camera Now</button>
        </div>
      </section>

      {/* Why We Section */}
      <section className="why-we-section" id="about">
        <div className="section-content">
          <h2>Why Choose HawkShield?</h2>
          <div className="why-we-grid">
            <div className="why-card">
              <h3>🤖 AI-Powered Detection</h3>
              <p>Advanced machine learning algorithms identify potential threats with high accuracy</p>
            </div>
            <div className="why-card">
              <h3>🌐 Cloud-Based</h3>
              <p>Access your security system from anywhere, anytime</p>
            </div>
            <div className="why-card">
              <h3>🔒 Secure & Encrypted</h3>
              <p>Military-grade encryption protects your surveillance data</p>
            </div>
            <div className="why-card">
              <h3>📊 Smart Analytics</h3>
              <p>Get detailed insights and reports on security patterns</p>
            </div>
            <div className="why-card">
              <h3>⚙️ Easy Setup</h3>
              <p>Get your system running in minutes, not hours</p>
            </div>
            <div className="why-card">
              <h3>💬 24/7 Support</h3>
              <p>Our team is always here to help you</p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Mission Section */}
      <section className="mission-section">
        <div className="section-content">
          <h2>Our Mission</h2>
          <div className="mission-content">
            <p>
              At HawkShield, we believe that everyone deserves access to cutting-edge security 
              technology. Our mission is to make advanced surveillance and threat detection 
              systems accessible, affordable, and easy to use for businesses and individuals alike.
            </p>
            <p>
              We combine artificial intelligence, computer vision, and cloud computing to deliver 
              a security solution that's always vigilant, constantly learning, and perpetually 
              improving. Your safety is our priority.
            </p>
            <div className="mission-stats">
              <div className="stat">
                <h3>10,000+</h3>
                <p>Active Users</p>
              </div>
              <div className="stat">
                <h3>99.9%</h3>
                <p>Uptime</p>
              </div>
              <div className="stat">
                <h3>50,000+</h3>
                <p>Cameras Connected</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <div className="footer-content">
          <div className="footer-section">
            <h3>HawkShield</h3>
            <p>Next-generation surveillance technology</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="/dashboard">Dashboard</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/pricing">Pricing</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h4>Contact Us</h4>
            <p>Email: support@hawkshield.com</p>
            <p>Phone: +1 (555) 123-4567</p>
            <p>Address: 123 Security Ave, Tech City</p>
          </div>
          <div className="footer-section">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a href="#facebook">Facebook</a>
              <a href="#twitter">Twitter</a>
              <a href="#linkedin">LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 HawkShield. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;