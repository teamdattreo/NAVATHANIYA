import React from "react";
import { Link, withRouter } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Menu = ({ history }) => {
  const { user, logout, isAdmin } = useAuth();

  const handleLogout = () => {
    logout();
    history.push('/');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
        <div className="container">
          {/* Logo */}
          <Link className="navbar-brand d-flex align-items-center" to="/" style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#2c3e50' }}>
            <div className="brand-icon-wrapper me-2">
              <i className="bi bi-shop"></i>
            </div>
            <span className="brand-text">GENERAL STORE</span>
          </Link>
          
          {/* Mobile toggle */}
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Left Navigation - Admin Login */}
            <div className="me-auto d-flex align-items-center">
              {user && isAdmin() ? (
                <>
                  <div className="dropdown me-3">
                    <button 
                      className="btn admin-dropdown-btn dropdown-toggle" 
                      type="button" 
                      id="adminDropdown"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="bi bi-shield-check me-1"></i>
                      <span>Admin Panel</span>
                    </button>
                    <div className="dropdown-menu" aria-labelledby="adminDropdown">
                      <Link className="dropdown-item" to="/dashboard">
                        <i className="bi bi-speedometer2 me-2"></i>
                        <span>Dashboard</span>
                      </Link>
                      <Link className="dropdown-item" to="/create/product">
                        <i className="bi bi-plus-circle me-2"></i>
                        <span>Add Product</span>
                      </Link>
                      <Link className="dropdown-item" to="/products">
                        <i className="bi bi-box-seam me-2"></i>
                        <span>Manage Products</span>
                      </Link>
                      <Link className="dropdown-item" to="/create/category">
                        <i className="bi bi-tags me-2"></i>
                        <span>Add Category</span>
                      </Link>
                      <div className="dropdown-divider"></div>
                      <button className="dropdown-item text-danger" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right me-2"></i>
                        <span>Logout</span>
                      </button>
                    </div>
                  </div>
                  <button 
                    className="btn logout-btn"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <i className="bi bi-box-arrow-right"></i>
                  </button>
                </>
              ) : (
                <Link to="/admin/login" className="btn login-btn">
                  <i className="bi bi-shield-lock me-2"></i>
                  <span>Admin Login</span>
                </Link>
              )}
            </div>
            
            {/* Center Navigation */}
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house-door me-1"></i>
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">
                  <i className="bi bi-box me-1"></i>
                  <span>Products</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/garments">
                  <i className="bi bi-bag me-1"></i>
                  <span>Garments</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/kitchen">
                  <i className="bi bi-cup-hot me-1"></i>
                  <span>Kitchen</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/traditional">
                  <i className="bi bi-star me-1"></i>
                  <span>Traditional</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/blog">
                  <i className="bi bi-journal-text me-1"></i>
                  <span>Blog</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/resources">
                  <i className="bi bi-book me-1"></i>
                  <span>Resources</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/contact">
                  <i className="bi bi-envelope me-1"></i>
                  <span>Contact</span>
                </Link>
              </li>
            </ul>
            
            {/* Right Navigation */}
            <div className="d-flex align-items-center">
              <button className="btn btn-link nav-icon-btn me-3">
                <i className="bi bi-search"></i>
              </button>
              <button className="btn btn-link nav-icon-btn me-3 position-relative">
                <i className="bi bi-cart3"></i>
                <span className="cart-badge">0</span>
              </button>
              <button className="btn btn-sign-up">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>
      
      <style>{`
        .navbar {
          border-bottom: 2px solid #2E7D32;
          background: linear-gradient(to right, #ffffff 0%, #f8f9fa 100%);
        }
        
        .brand-icon-wrapper {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-size: 1.2rem;
          box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
        }
        
        .brand-text {
          background: linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }
        
        .nav-link {
          color: #2c3e50 !important;
          font-weight: 500;
          padding: 0.5rem 1rem !important;
          border-radius: 6px;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        
        .nav-link:hover {
          background: rgba(46, 125, 50, 0.1);
          color: #2E7D32 !important;
          transform: translateY(-1px);
        }
        
        .nav-link i {
          font-size: 1.1rem;
        }
        
        .admin-dropdown-btn {
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border: none;
          color: white;
          font-weight: 600;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
          transition: all 0.3s ease;
        }
        
        .admin-dropdown-btn:hover {
          background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.4);
        }
        
        .login-btn {
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border: none;
          color: white;
          font-weight: 600;
          padding: 0.5rem 1.2rem;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
          transition: all 0.3s ease;
          text-decoration: none;
        }
        
        .login-btn:hover {
          background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.4);
          color: white;
        }
        
        .logout-btn {
          background: linear-gradient(135deg, #d32f2f 0%, #f44336 100%);
          border: none;
          color: white;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(211, 47, 47, 0.3);
          transition: all 0.3s ease;
        }
        
        .logout-btn:hover {
          background: linear-gradient(135deg, #c62828 0%, #d32f2f 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(211, 47, 47, 0.4);
        }
        
        .dropdown-menu {
          border: 1px solid #e0e0e0;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.1);
          margin-top: 0.5rem;
        }
        
        .dropdown-item {
          color: #2c3e50;
          padding: 0.7rem 1.2rem;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        
        .dropdown-item:hover {
          background: rgba(46, 125, 50, 0.1);
          color: #2E7D32;
        }
        
        .dropdown-item i {
          width: 20px;
          text-align: center;
        }
        
        .nav-icon-btn {
          color: #2c3e50 !important;
          background: none;
          border: none;
          padding: 0.5rem;
          border-radius: 50%;
          transition: all 0.3s ease;
          position: relative;
        }
        
        .nav-icon-btn:hover {
          background: rgba(46, 125, 50, 0.1);
          color: #2E7D32 !important;
          transform: scale(1.1);
        }
        
        .cart-badge {
          position: absolute;
          top: 0;
          right: 0;
          background: #ff6b35;
          color: white;
          border-radius: 50%;
          width: 18px;
          height: 18px;
          font-size: 0.7rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
        }
        
        .btn-sign-up {
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border: none;
          color: white;
          font-weight: 600;
          padding: 0.5rem 1.5rem;
          border-radius: 25px;
          box-shadow: 0 2px 8px rgba(46, 125, 50, 0.3);
          transition: all 0.3s ease;
        }
        
        .btn-sign-up:hover {
          background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(46, 125, 50, 0.4);
          color: white;
        }
        
        @media (max-width: 768px) {
          .navbar {
            padding: 1rem 0;
          }
          
          .brand-text {
            font-size: 1.2rem;
          }
          
          .nav-link {
            padding: 0.7rem 1rem !important;
          }
          
          .login-btn, .admin-dropdown-btn {
            padding: 0.6rem 1rem;
            font-size: 0.9rem;
          }
        }
      `}</style>
    </>
  );
};

export default withRouter(Menu);
