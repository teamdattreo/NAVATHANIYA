import React, { useEffect, useState } from "react";
import Menu from "./Menu";
import "../Style/bootstrap.css";
import "../Style/style.css";

const Layout = ({ title = "Title", description = "Description", className, children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".reveal-on-scroll"));
    if (elements.length === 0) return undefined;

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [children]);

  return (
    <div className="app-root d-flex flex-column min-vh-100">
      <header className={`nava-glass-header ${isScrolled ? "nava-glass-header--scrolled" : ""}`}>
        <div className="nava-glass-inner">
          <div className="nava-logo">
            {/* <span className="nava-logo-icon">
              <i className="bi bi-lamp"></i>
            </span> */}
            <div>
              <strong>Navathaniya</strong>
              <small>Tradition Meets Everyday</small>
            </div>
          </div>

          <div className="nava-searchbar">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search for Brassware, Electronics, or Apparel..." />
          </div>

          <div className="nava-header-actions">
            <a className="nava-icon-btn" href="/admin/login" aria-label="Admin login">
              <i className="bi bi-person"></i>
            </a>
            {/* <button className="nava-icon-btn" type="button" aria-label="Favorites">
              <i className="bi bi-heart"></i>
            </button> */}
            {/* <button className="nava-icon-btn" type="button" aria-label="Cart">
              <i className="bi bi-bag"></i>
            </button> */}
            <button
              className="nava-menu-toggle"
              type="button"
              onClick={() => setIsNavOpen((prev) => !prev)}
              aria-expanded={isNavOpen}
              aria-controls="navaNavLinks"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
        <div className={`nava-nav-links ${isNavOpen ? "is-open" : ""}`} id="navaNavLinks">
          <a href="/" onClick={() => setIsNavOpen(false)}>Home</a>
          <a href="/#shop" onClick={() => setIsNavOpen(false)}>Shop</a>
          <a href="/about" onClick={() => setIsNavOpen(false)}>About Us</a>
          <a href="/contact" onClick={() => setIsNavOpen(false)}>Contact</a>
        </div>
        {/* <div className="nava-subnav">
          <span>Garments</span>
          <span>Electrical</span>
          <span>Plastic</span>
          <span>Kitchen</span>
          <span>Pooja</span>
          <span>Metalware</span>
        </div> */}
      </header>
      {/* <header>
        <Menu />
      </header> */}

      <main className="flex-grow-1">
        <div className={className}>{children}</div>
      </main>

      <footer className="modern-footer">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <div className="footer-brand">
                <h4 className="footer-logo">
                  {/* <i className="bi bi-shop me-2"></i> */}
                  NAVATHANIYA
                </h4>
                <p className="footer-description">
                  Your trusted partner for quality garments, electrical goods, kitchen items, and traditional products since 2025.
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
                {/* <li><a href="/garments">Garments</a></li> */}
                <li><a href="/electrical">Electrical Goods</a></li>
              </ul>
            </div>
            
            <div className="col-lg-3 col-md-6 mb-4">
              <h5 className="footer-title">Customer Service</h5>
              <ul className="footer-links">
                <li><a href="/contact">Contact Us</a></li>
                {/* <li><a href="/shipping">Shipping Info</a></li>
                <li><a href="/returns">Returns</a></li> */}
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
              {/* <div className="footer-payment">
                <p className="mb-2">We Accept:</p>
                <div className="payment-icons">
                  <i className="bi bi-credit-card"></i>
                  <i className="bi bi-paypal"></i>
                  <i className="bi bi-apple"></i>
                  <i className="bi bi-google"></i>
                </div>
              </div> */}
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
      .nava-glass-header {
        position: sticky;
        top: 0;
        z-index: 80;
        backdrop-filter: blur(18px);
        background: rgba(181, 139, 70, 0.16);
        border-bottom: 1px solid rgba(107, 74, 45, 0.25);
      }

      .nava-glass-header--scrolled {
        box-shadow: 0 20px 40px rgba(17, 10, 5, 0.25);
      }

      .nava-glass-inner {
        display: grid;
        grid-template-columns: auto minmax(200px, 1fr) auto;
        gap: 1.5rem;
        align-items: center;
        padding: 0.85rem 1.5rem;
      }

      .nava-logo {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        font-family: "Playfair Display", "Cormorant Garamond", Georgia, serif;
        color: #6b4a2d;
      }

      .nava-logo strong {
        display: block;
        font-size: 1.2rem;
        letter-spacing: 0.06em;
        text-transform: uppercase;
      }

      .nava-logo small {
        display: block;
        font-size: 0.65rem;
        letter-spacing: 0.2em;
        color: rgba(107, 74, 45, 0.6);
      }

      .nava-logo-icon {
        width: 38px;
        height: 38px;
        border-radius: 14px;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background: rgba(181, 139, 70, 0.2);
        color: #6b4a2d;
      }

      .nava-searchbar {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: rgba(255, 255, 255, 0.8);
        border-radius: 999px;
        padding: 0.5rem 1rem;
        border: 1px solid rgba(107, 74, 45, 0.2);
      }

      .nava-searchbar input {
        border: none;
        background: transparent;
        width: 100%;
        font-size: 0.9rem;
      }

      .nava-searchbar input:focus {
        outline: none;
      }

      .nava-header-actions {
        display: flex;
        align-items: center;
        gap: 0.6rem;
      }

      .nava-icon-btn {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.75);
        color: #6b4a2d;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
      }

      .nava-menu-toggle {
        display: none;
        border: none;
        background: transparent;
        padding: 0.35rem;
      }

      .nava-menu-toggle span {
        display: block;
        width: 22px;
        height: 2px;
        background: #6b4a2d;
        margin: 4px 0;
        border-radius: 999px;
      }

      .nava-nav-links {
        display: flex;
        justify-content: center;
        gap: 1.5rem;
        padding: 0.25rem 0 0.75rem;
        background: rgba(255, 255, 255, 0.8);
      }

      .nava-nav-links a {
        text-decoration: none;
        font-weight: 600;
        color: #4a1a23;
      }

      .nava-subnav {
        display: flex;
        justify-content: center;
        gap: 1.2rem;
        padding: 0.5rem 1rem;
        font-size: 0.8rem;
        background: rgba(181, 139, 70, 0.12);
        text-transform: uppercase;
        letter-spacing: 0.12em;
        color: #4a1a23;
      }

      @media (max-width: 900px) {
        .nava-glass-inner {
          grid-template-columns: auto 1fr auto;
        }
      }

      @media (max-width: 768px) {
        .nava-glass-inner {
          grid-template-columns: 1fr auto;
        }

        .nava-searchbar {
          display: none;
        }

        .nava-header-actions {
          gap: 0.4rem;
        }

        .nava-header-actions .nava-icon-btn {
          width: 32px;
          height: 32px;
        }

        .nava-nav-links {
          flex-direction: column;
          gap: 0.5rem;
          padding: 0.75rem 1.25rem;
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          background: #fdf6e6;
          border-bottom: 1px solid rgba(107, 74, 45, 0.2);
          box-shadow: 0 14px 24px rgba(43, 33, 23, 0.2);
        }

        .nava-nav-links.is-open {
          display: flex;
        }

        .nava-menu-toggle {
          display: inline-flex;
          flex-direction: column;
          justify-content: center;
        }

        .nava-subnav {
          flex-wrap: wrap;
          font-size: 0.7rem;
        }
      }

      @media (max-width: 576px) {
        .nava-glass-inner {
          padding: 0.75rem 1rem;
        }

        .nava-logo strong {
          font-size: 1rem;
        }

        .nava-logo small {
          letter-spacing: 0.12em;
        }

        .nava-header-actions .nava-icon-btn {
          display: none;
        }

        .nava-menu-toggle {
          display: inline-flex;
        }

        .nava-subnav {
          justify-content: flex-start;
          padding: 0.5rem 0.75rem;
          gap: 0.75rem;
          overflow-x: auto;
          white-space: nowrap;
        }
      }

      .modern-footer {
        background: linear-gradient(135deg, #b58b46 0%, #8b6230 100%);
        color: #f7f1e3;
        padding: 36px 0 16px;
        margin-top: auto;
      }
      
      .footer-logo {
        color: #f7f1e3;
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 0.6rem;
      }
      
      .footer-logo i {
        color: #f7f1e3;
      }
      
      .footer-description {
        color: rgba(255, 247, 230, 0.75);
        line-height: 1.5;
        margin-bottom: 1rem;
        font-size: 0.9rem;
      }
      
      .footer-social {
        display: flex;
        gap: 1rem;
      }
      
      .social-icon {
        width: 34px;
        height: 34px;
        background: rgba(255, 247, 230, 0.12);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff7e6;
        text-decoration: none;
        transition: all 0.3s ease;
      }
      
      .social-icon:hover {
        background: #b8893b;
        transform: translateY(-3px);
        color: #2b2117;
      }
      
      .footer-title {
        color: #fff7e6;
        font-weight: 600;
        margin-bottom: 0.9rem;
        position: relative;
        padding-bottom: 0.4rem;
        font-size: 0.95rem;
      }
      
      .footer-title::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 40px;
        height: 2px;
        background: #f7f1e3;
      }
      
      .footer-links {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      
      .footer-links li {
        margin-bottom: 0.5rem;
      }
      
      .footer-links a {
        color: rgba(255, 247, 230, 0.75);
        text-decoration: none;
        transition: color 0.3s ease;
      }
      
      .footer-links a:hover {
        color: #f7f1e3;
      }
      
      .footer-contact p {
        color: rgba(255, 247, 230, 0.75);
        margin-bottom: 0.5rem;
        font-size: 0.9rem;
      }
      
      .footer-contact i {
        color: #f7f1e3;
        width: 20px;
      }
      
      .payment-icons {
        display: flex;
        gap: 1rem;
        font-size: 1.5rem;
        color: rgba(255, 247, 230, 0.65);
      }
      
      .footer-bottom {
        border-top: 1px solid rgba(255, 247, 230, 0.15);
        margin-top: 2rem;
        padding-top: 1.25rem;
      }
      
      .copyright {
        color: rgba(255, 247, 230, 0.75);
        margin: 0;
      }
      
      .footer-legal {
        color: rgba(255, 247, 230, 0.75);
      }
      
      .footer-legal a {
        color: rgba(255, 247, 230, 0.75);
        text-decoration: none;
        transition: color 0.3s ease;
      }
      
      .footer-legal a:hover {
        color: #b8893b;
      }
      
      .footer-developed {
        color: rgba(247, 241, 227, 0.7);
        font-size: 0.8rem;
        margin-top: 0.35rem;
      }
      
      .developer-link {
        color: #f7f1e3;
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
        color: rgba(255, 247, 230, 0.5);
      }

      .reveal-on-scroll {
        opacity: 0;
        transform: translateY(24px);
        transition: opacity 0.6s ease, transform 0.6s ease;
        will-change: opacity, transform;
      }

      .reveal-on-scroll.is-visible {
        opacity: 1;
        transform: translateY(0);
      }

      html {
        scroll-behavior: smooth;
      }

      @media (prefers-reduced-motion: reduce) {
        .reveal-on-scroll {
          transition: none;
          transform: none;
        }

        html {
          scroll-behavior: auto;
        }
      }
      
      @media (max-width: 768px) {
        .modern-footer {
          padding: 28px 0 16px;
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
};

export default Layout;
