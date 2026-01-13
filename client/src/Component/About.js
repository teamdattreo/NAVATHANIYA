import React from "react";
import Layout from "./Layout";
import adminImage from "../img/admin.png";
import heroImage from "../img/admin.png";
import showcaseImage from "../img/img.png";
import textileImage from "../img/hero.png";

const About = () => {
  return (
    <Layout
      title="About Us - NAVATHANIYA"
      description="Discover Navathaniya's roots in tradition, craftsmanship, and everyday essentials"
      className="container-fluid p-0"
    >
      <style>{`
        .about-hero {
          position: relative;
          min-height: 320px;
          background: url(${heroImage}) center/cover no-repeat;
          color: #fff7e6;
          display: flex;
          align-items: center;
          padding: 3.5rem 1.5rem;
          margin-bottom: 3rem;
        }

        .about-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(51, 35, 20, 0.7), rgba(51, 35, 20, 0.2));
        }

        .about-hero-inner {
          position: relative;
          z-index: 1;
          max-width: 820px;
          margin: 0 auto;
          text-align: center;
        }

        .about-title {
          font-size: 2.6rem;
          font-weight: 700;
          margin-bottom: 0.8rem;
          letter-spacing: 0.04em;
        }

        .about-subtitle {
          font-size: 1.1rem;
          color: rgba(255, 247, 230, 0.9);
          margin: 0;
        }

        .about-content {
          max-width: 1100px;
          margin: 0 auto;
          padding: 0 1.5rem 2.5rem;
        }

        .about-story {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
          gap: 2rem;
          align-items: center;
          margin-bottom: 2.5rem;
        }

        .about-card {
          background: #fdf6e6;
          border-radius: 18px;
          padding: 2rem;
          border: 1px solid rgba(181, 139, 70, 0.2);
          box-shadow: 0 18px 30px rgba(31, 18, 10, 0.12);
        }

        .about-card h2 {
          font-size: 1.7rem;
          margin-bottom: 0.75rem;
          color: #4b3826;
        }

        .about-card p {
          color: #6b5a4a;
          line-height: 1.6;
          margin-bottom: 1rem;
        }

        .about-gallery {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .about-gallery img {
          width: 100%;
          height: 160px;
          object-fit: cover;
          border-radius: 16px;
          box-shadow: 0 10px 20px rgba(31, 18, 10, 0.15);
        }

        .about-values {
          background: #f7f1e3;
          border-radius: 22px;
          padding: 2.5rem 1.5rem;
          text-align: center;
        }

        .about-values h2 {
          color: #4b3826;
          margin-bottom: 2rem;
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1.5rem;
        }

        .value-card {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.5rem;
          border: 1px solid rgba(181, 139, 70, 0.2);
        }

        .value-card i {
          font-size: 1.6rem;
          color: #b58b46;
          margin-bottom: 0.6rem;
          display: inline-block;
        }

        .value-card h4 {
          font-size: 1.05rem;
          margin-bottom: 0.4rem;
          color: #4b3826;
        }

        .value-card p {
          font-size: 0.9rem;
          color: #6b5a4a;
          margin: 0;
        }

        @media (max-width: 900px) {
          .about-story {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .about-title {
            font-size: 2.1rem;
          }

          .about-gallery img {
            height: 140px;
          }

          .values-grid {
            grid-template-columns: 1fr;
          }
        }

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

          .nava-nav-links {
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.75rem 1.25rem;
            display: none;
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
      `}</style>
      
      {/* Hero Section */}
      <section className="about-hero">
        <div className="about-hero-inner reveal-on-scroll">
          <h1 className="about-title">Navathaniya</h1>
          <p className="about-subtitle">Celebrating heritage, craftsmanship, and everyday essentials.</p>
        </div>
      </section>

      <section className="about-content">
        <div className="about-story reveal-on-scroll">
          <div className="about-card">
            <h2>Our Story</h2>
            <p>
              Navathaniya is a home for timeless tradition and practical modernity.
              We bring together brass diya, kovil essentials, and handcrafted textiles
              alongside reliable kitchen and household goods.
            </p>
            <p>
              Our mission is to keep heritage within reach while elevating daily
              living with quality goods for every Navathaniya family.
            </p>
          </div>
          <div className="about-gallery">
            <img src={textileImage} alt="Traditional textiles" />
            <img src={heroImage} alt="Kitchen and electrical goods" />
            <img src={showcaseImage} alt="Household essentials" />
            <img src={adminImage} alt="Navathaniya store" />
          </div>
        </div>

        <div className="about-values reveal-on-scroll">
          <h2>Our Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <i className="bi bi-award"></i>
              <h4>Heritage & Craftsmanship</h4>
              <p>Honoring tradition with curated brassware, textiles, and ritual items.</p>
            </div>
            <div className="value-card">
              <i className="bi bi-shield-check"></i>
              <h4>Quality & Durability</h4>
              <p>Products chosen for lasting quality and everyday reliability.</p>
            </div>
            <div className="value-card">
              <i className="bi bi-lightbulb"></i>
              <h4>Convenience & Innovation</h4>
              <p>Modern essentials that simplify the rhythm of home life.</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
