import React from "react";
import Layout from "./Layout";
import heroImage from "../img/001.jpg";

const Contact = () => {
  return (
    <Layout
      title="Contact Us - NAVATHANIYA"
      description="Get in touch with Navathaniya for product inquiries and support"
      className="container-fluid p-0"
    >
      <style>{`
        .contact-hero {
          position: relative;
          min-height: 280px;
          background: url(${heroImage}) center/cover no-repeat;
          color: #fff7e6;
          display: flex;
          align-items: center;
          padding: 3rem 1.5rem;
        }

        .contact-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(51, 35, 20, 0.7), rgba(51, 35, 20, 0.25));
        }

        .contact-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 780px;
          margin: 0 auto;
          text-align: center;
        }

        .contact-title {
          font-size: 2.4rem;
          font-weight: 700;
          margin-bottom: 0.6rem;
          letter-spacing: 0.04em;
        }

        .contact-subtitle {
          font-size: 1.05rem;
          color: rgba(255, 247, 230, 0.9);
          margin: 0;
        }

        .contact-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 2.5rem 1.5rem 3rem;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 2rem;
        }

        .contact-card {
          background: #fdf6e6;
          border-radius: 18px;
          padding: 2rem;
          border: 1px solid rgba(181, 139, 70, 0.2);
          box-shadow: 0 18px 30px rgba(31, 18, 10, 0.12);
        }

        .contact-card h3 {
          font-size: 1.5rem;
          margin-bottom: 0.8rem;
          color: #4b3826;
        }

        .contact-card p {
          color: #6b5a4a;
          margin-bottom: 0.75rem;
        }

        .contact-details {
          display: grid;
          gap: 1rem;
        }

        .contact-detail {
          display: flex;
          gap: 0.75rem;
          align-items: flex-start;
          color: #6b5a4a;
        }

        .contact-detail i {
          color: #b58b46;
          font-size: 1.2rem;
          margin-top: 0.2rem;
        }

        .contact-detail span {
          font-weight: 600;
          color: #4b3826;
          display: block;
          margin-bottom: 0.2rem;
        }

        .contact-form {
          display: grid;
          gap: 1rem;
        }

        .contact-form input,
        .contact-form textarea {
          width: 100%;
          border: 1px solid rgba(120, 91, 58, 0.2);
          border-radius: 12px;
          padding: 0.75rem 1rem;
          background: #fffdf8;
          font-size: 0.95rem;
        }

        .contact-form textarea {
          min-height: 140px;
          resize: vertical;
        }

        .contact-form button {
          border: none;
          background: #6d2735;
          color: #fff7e6;
          padding: 0.8rem 1.4rem;
          border-radius: 999px;
          font-weight: 600;
        }

        .contact-hours {
          margin-top: 1.5rem;
          padding-top: 1rem;
          border-top: 1px solid rgba(181, 139, 70, 0.2);
          color: #6b5a4a;
          font-size: 0.9rem;
        }

        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .contact-title {
            font-size: 2rem;
          }

          .contact-content {
            padding: 2rem 1.25rem 2.5rem;
          }
        }
      `}</style>

      <section className="contact-hero">
        <div className="contact-hero-inner reveal-on-scroll">
          <h1 className="contact-title">Contact Navathaniya</h1>
          <p className="contact-subtitle">
            We are here to help with product queries, orders, and support.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-grid">
          <div className="contact-card reveal-on-scroll">
            <h3>Reach Us</h3>
            <div className="contact-details">
              <div className="contact-detail">
                <i className="bi bi-geo-alt"></i>
                <div>
                  <span>Store Address</span>
                  29, Nalliah Road, Batticaloa
                </div>
              </div>
              <div className="contact-detail">
                <i className="bi bi-telephone"></i>
                <div>
                  <span>Phone</span>
                  +94 123 456 789
                </div>
              </div>
              <div className="contact-detail">
                <i className="bi bi-envelope"></i>
                <div>
                  <span>Email</span>
                  info@navathaniya.com
                </div>
              </div>
            </div>
            <div className="contact-hours">
              <strong>Hours:</strong> Mon - Sat, 9:00 AM to 7:00 PM
            </div>
          </div>

          <div className="contact-card reveal-on-scroll">
            <h3>Send a Message</h3>
            <form className="contact-form">
              <input type="text" placeholder="Full Name" />
              <input type="email" placeholder="Email Address" />
              <textarea placeholder="How can we help you?"></textarea>
              <button type="button">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contact;
