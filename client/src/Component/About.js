import React from "react";
import Layout from "./Layout";

const About = () => {
  return (
    <Layout
      title="About Us - NAVATHANIYA"
      description="Learn about our comprehensive business in garments, electrical goods, and traditional items"
      className="container-fluid"
    >
      <style>{`
        .about-hero {
          background: linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #43A047 100%);
          color: white;
          padding: 4rem 0;
          margin-bottom: 3rem;
        }
        
        .about-title {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .about-subtitle {
          font-size: 1.25rem;
          opacity: 0.9;
        }
        
        .objectives-section {
          background: white;
          border-radius: 1rem;
          padding: 3rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          position: relative;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: -10px;
          left: 0;
          width: 60px;
          height: 3px;
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
        }
        
        .objectives-list {
          list-style: none;
          padding: 0;
        }
        
        .objective-item {
          background: #f8f9fa;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          border-left: 4px solid #2E7D32;
          transition: all 0.3s ease;
        }
        
        .objective-item:hover {
          transform: translateX(5px);
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        
        .objective-icon {
          color: #2E7D32;
          margin-right: 1rem;
          font-size: 1.25rem;
        }
        
        .category-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
          margin-top: 2rem;
        }
        
        .category-card {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          text-align: center;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
        }
        
        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .category-icon {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem;
        }
        
        .category-icon i {
          color: white;
          font-size: 2rem;
        }
        
        .category-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        
        .category-description {
          color: #6c757d;
          font-size: 0.9rem;
        }
        
        .services-section {
          background: #f8f9fa;
          border-radius: 1rem;
          padding: 3rem;
          margin-bottom: 2rem;
        }
        
        .service-item {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 0.5rem;
          padding: 1.5rem;
          margin-bottom: 1rem;
          box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }
        
        .service-icon {
          width: 50px;
          height: 50px;
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
          flex-shrink: 0;
        }
        
        .service-icon i {
          color: white;
          font-size: 1.25rem;
        }
        
        .service-content h4 {
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        
        .service-content p {
          color: #6c757d;
          margin: 0;
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="about-hero">
        <div className="container text-center">
          <h1 className="about-title">NAVATHANIYA</h1>
          <p className="about-subtitle">Your Trusted Partner for Quality Products Since 2024</p>
        </div>
      </div>
      
      <div className="container">
        {/* Business Objectives */}
        <div className="objectives-section">
          <h2 className="section-title">Our Business Objectives</h2>
          <p className="text-muted mb-4">
            We are committed to excellence in manufacturing, trading, and serving our customers with the highest quality products across multiple categories.
          </p>
          
          <ul className="objectives-list">
            <li className="objective-item">
              <i className="bi bi-briefcase objective-icon"></i>
              <div>
                <strong>Manufacturing & Production:</strong> Creating high-quality garments, electrical goods, plastic items, and kitchen essentials
              </div>
            </li>
            <li className="objective-item">
              <i className="bi bi-globe objective-icon"></i>
              <div>
                <strong>Trading & Distribution:</strong> Importing, exporting, and supplying a comprehensive range of products locally and globally
              </div>
            </li>
            <li className="objective-item">
              <i className="bi bi-palette objective-icon"></i>
              <div>
                <strong>Design & Craftsmanship:</strong> Expert design and production of silver, copper, brass equipment and utensils for domestic and ceremonial use
              </div>
            </li>
            <li className="objective-item">
              <i className="bi bi-tools objective-icon"></i>
              <div>
                <strong>Repair & Maintenance:</strong> Professional repair, polishing, and customization services for all our products
              </div>
            </li>
            <li className="objective-item">
              <i className="bi bi-shop objective-icon"></i>
              <div>
                <strong>Retail & Wholesale:</strong> Operating retail outlets and wholesale channels for maximum customer reach
              </div>
            </li>
            <li className="objective-item">
              <i className="bi bi-laptop objective-icon"></i>
              <div>
                <strong>Digital Presence:</strong> Managing online platforms and distribution channels for modern shopping convenience
              </div>
            </li>
          </ul>
        </div>
        
        {/* Product Categories */}
        <div className="objectives-section">
          <h2 className="section-title">Our Product Categories</h2>
          <div className="category-grid">
            <div className="category-card">
              <div className="category-icon">
                <i className="bi bi-bag"></i>
              </div>
              <h3 className="category-title">Garments</h3>
              <p className="category-description">Quality clothing and apparel for all occasions</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <i className="bi bi-lightbulb"></i>
              </div>
              <h3 className="category-title">Electrical Goods</h3>
              <p className="category-description">Reliable electrical products and accessories</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <i className="bi bi-box"></i>
              </div>
              <h3 className="category-title">Plastic Goods</h3>
              <p className="category-description">Durable plastic items for everyday use</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <i className="bi bi-egg-fried"></i>
              </div>
              <h3 className="category-title">Kitchen Items</h3>
              <p className="category-description">Essential kitchenware and cooking utensils</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <i className="bi bi-star"></i>
              </div>
              <h3 className="category-title">Pooja Items</h3>
              <p className="category-description">Traditional items for religious ceremonies</p>
            </div>
            
            <div className="category-card">
              <div className="category-icon">
                <i className="bi bi-building"></i>
              </div>
              <h3 className="category-title">Kovil Items</h3>
              <p className="category-description">Temple supplies and ceremonial accessories</p>
            </div>
          </div>
        </div>
        
        {/* Services */}
        <div className="services-section">
          <h2 className="section-title">Our Services</h2>
          <div className="row">
            <div className="col-md-6">
              <div className="service-item">
                <div className="service-icon">
                  <i className="bi bi-wrench"></i>
                </div>
                <div className="service-content">
                  <h4>Repair Services</h4>
                  <p>Professional repair and maintenance for all types of products we sell</p>
                </div>
              </div>
              
              <div className="service-item">
                <div className="service-icon">
                  <i className="bi bi-shine"></i>
                </div>
                <div className="service-content">
                  <h4>Polishing & Restoration</h4>
                  <p>Expert polishing and restoration services for metal items and utensils</p>
                </div>
              </div>
            </div>
            
            <div className="col-md-6">
              <div className="service-item">
                <div className="service-icon">
                  <i className="bi bi-palette2"></i>
                </div>
                <div className="service-content">
                  <h4>Customization</h4>
                  <p>Tailored solutions and custom designs to meet specific requirements</p>
                </div>
              </div>
              
              <div className="service-item">
                <div className="service-icon">
                  <i className="bi bi-truck"></i>
                </div>
                <div className="service-content">
                  <h4>Distribution</h4>
                  <p>Efficient distribution network for timely delivery across regions</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contact CTA */}
        <div className="text-center py-5">
          <h2 className="mb-3">Get in Touch</h2>
          <p className="text-muted mb-4">
            We'd love to hear from you. Whether you're looking for products, services, or partnerships.
          </p>
          <button className="btn btn-primary btn-lg me-3">
            <i className="bi bi-envelope me-2"></i>
            Contact Us
          </button>
          <button className="btn btn-outline-primary btn-lg">
            <i className="bi bi-telephone me-2"></i>
            Call Now
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default About;
