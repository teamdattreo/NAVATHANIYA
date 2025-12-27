import React from "react";
import Menu from "./Menu";
import "../Style/bootstrap.css";
import "../Style/style.css";

const Layout = ({ title = "Title", description = "Description", className, children }) => (
  <div className="app-root d-flex flex-column min-vh-100">
    <header>
      <Menu />
    </header>

    <main className="flex-grow-1">
      <div className={className}>{children}</div>
    </main>

    <footer className="modern-footer">
      <div className="container">
        <div className="row">
          <div className="col-lg-4 col-md-6 mb-4">
            <div className="footer-brand">
              <h4 className="footer-logo">
                <i className="bi bi-shop me-2"></i>
                NAVATHANIYA
              </h4>
              <p className="footer-description">
                Your trusted partner for quality garments, electrical goods, kitchen items, and traditional products since 2024.
              </p>
              <div className="footer-social">
                <a href="#" className="social-icon">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </div>
          </div>
          
          <div className="col-lg-2 col-md-6 mb-4">
            <h5 className="footer-title">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About Us</a></li>
              <li><a href="/garments">Garments</a></li>
              <li><a href="/electrical">Electrical Goods</a></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footer-title">Customer Service</h5>
            <ul className="footer-links">
              <li><a href="/contact">Contact Us</a></li>
              <li><a href="/shipping">Shipping Info</a></li>
              <li><a href="/returns">Returns</a></li>
              <li><a href="/faq">FAQ</a></li>
            </ul>
          </div>
          
          <div className="col-lg-3 col-md-6 mb-4">
            <h5 className="footer-title">Contact Info</h5>
            <div className="footer-contact">
              <p>
                <i className="bi bi-geo-alt me-2"></i>
                29, Nalliah Road, Batticaloa
              </p>
              <p>
                <i className="bi bi-telephone me-2"></i>
                +94 123 456 789
              </p>
              <p>
                <i className="bi bi-envelope me-2"></i>
                info@navathaniya.com
              </p>
            </div>
            <div className="footer-payment">
              <p className="mb-2">We Accept:</p>
              <div className="payment-icons">
                <i className="bi bi-credit-card"></i>
                <i className="bi bi-paypal"></i>
                <i className="bi bi-apple"></i>
                <i className="bi bi-google"></i>
              </div>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <div className="row align-items-center">
            <div className="col-md-6">
              <p className="copyright">
                © {new Date().getFullYear()} DATTREO. All rights reserved.
              </p>
              <p className="footer-developed">
                Website developed by <a href="https://dattreo.com" target="_blank" rel="noopener noreferrer" className="developer-link">DATTREO</a>
              </p>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="footer-legal">
                <a href="/privacy">Privacy Policy</a>
                <span className="separator">|</span>
                <a href="/terms">Terms of Service</a>
                <span className="separator">|</span>
                <a href="/cookies">Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>

    <style>{`
      .modern-footer {
        background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
        color: white;
        padding: 60px 0 20px;
        margin-top: auto;
      }
      
      .footer-logo {
        color: white;
        font-weight: 700;
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }
      
      .footer-logo i {
        color: #81C784;
      }
      
      .footer-description {
        color: #bdc3c7;
        line-height: 1.6;
        margin-bottom: 1.5rem;
      }
      
      .footer-social {
        display: flex;
        gap: 1rem;
      }
      
      .social-icon {
        width: 40px;
        height: 40px;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      
      .social-icon:hover {
        background: #81C784;
        transform: translateY(-3px);
        color: white;
      }
      
      .footer-title {
        color: white;
        font-weight: 600;
        margin-bottom: 1.5rem;
        position: relative;
        padding-bottom: 0.5rem;
      }
      
      .footer-title::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 2px;
        background: #81C784;
      }
      
      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .footer-links li {
        margin-bottom: 0.75rem;
      }
      
      .footer-links a {
        color: #bdc3c7;
        text-decoration: none;
        transition: color 0.3s ease;
      }
      
      .footer-links a:hover {
        color: #81C784;
      }
      
      .footer-contact p {
        color: #bdc3c7;
        margin-bottom: 0.75rem;
      }
      
      .footer-contact i {
        color: #81C784;
        width: 20px;
      }
      
      .payment-icons {
        display: flex;
        gap: 1rem;
        font-size: 1.5rem;
        color: #bdc3c7;
      }
      
      .footer-bottom {
        border-top: 1px solid rgba(255, 255, 255, 0.1);
        margin-top: 3rem;
        padding-top: 2rem;
      }
      
      .copyright {
        color: #bdc3c7;
        margin: 0;
      }
      
      .footer-legal {
        color: #bdc3c7;
      }
      
      .footer-legal a {
        color: #bdc3c7;
        text-decoration: none;
        transition: color 0.3s ease;
      }
      
      .footer-legal a:hover {
        color: #81C784;
      }
      
      .footer-developed {
        color: #bdc3c7;
        font-size: 0.875rem;
        margin-top: 0.5rem;
      }
      
      .developer-link {
        color: #81C784;
        text-decoration: none;
        font-weight: 600;
        transition: all 0.3s ease;
      }
      
      .developer-link:hover {
        color: #ffffff;
        text-decoration: underline;
      }
      
      .separator {
        margin: 0 0.5rem;
        color: #7f8c8d;
      }
      
      @media (max-width: 768px) {
        .modern-footer {
          padding: 40px 0 20px;
        }
        
        .footer-social {
          justify-content: center;
        }
        
        .payment-icons {
          justify-content: center;
        }
        
        .footer-bottom {
          text-align: center;
        }
        
        .footer-legal {
          margin-top: 1rem;
          text-align: center;
        }
      }
    `}</style>
  </div>
);

export default Layout;
