import React from "react";
import { useAuth } from "../context/AuthContext";
import { useHistory } from "react-router-dom";
import adminImage from "../img/admin.png";

const AdminLayout = ({ children, title, description, className }) => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push('/admin/login');
  };

  return (
    <>
      {/* Admin Header */}
      {/* <header className="admin-header">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <div className="admin-logo">
                <div className="logo-icon">
                  <i className="bi bi-shield-check"></i>
                </div>
                <div className="logo-text">
                  <h1 className="admin-title">NAVATHANIYA Admin</h1>
                  <p className="admin-subtitle">Management Portal</p>
                </div>
              </div>
            </div>
            <div className="col-md-6 text-md-end">
              <div className="admin-nav">
                <a href="/" className="btn btn-outline-light me-2">
                  <i className="bi bi-house me-2"></i>
                  Visit Store
                </a>
                {user && (
                  <button 
                    className="btn btn-danger"
                    onClick={handleLogout}
                    title="Logout"
                  >
                    <i className="bi bi-box-arrow-right me-2"></i>
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header> */}

      {/* Admin Content */}
      <main className={className}>
        {children}
      </main>
      
      <style>{`
        .admin-header {
          background: linear-gradient(90deg, rgba(43, 33, 23, 0.85), rgba(43, 33, 23, 0.4)),
            url(${adminImage}) center/cover no-repeat;
          color: #fff7e6;
          padding: 1.5rem 0;
          border-bottom: 3px solid #b8893b;
          position: sticky;
          top: 0;
          z-index: 1000;
          box-shadow: 0 2px 15px rgba(43, 33, 23, 0.2);
        }
        
        .admin-logo {
          display: flex;
          align-items: center;
        }
        
        .logo-icon {
          width: 50px;
          height: 50px;
          background: rgba(255, 247, 230, 0.18);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          font-size: 1.5rem;
        }
        
        .logo-text h1 {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0;
          color: #fff7e6;
        }
        
        .logo-text p {
          font-size: 0.875rem;
          margin: 0;
          opacity: 0.9;
          color: rgba(255, 247, 230, 0.85);
        }
        
        .admin-nav .btn {
          border: 2px solid rgba(255, 247, 230, 0.35);
          color: #fff7e6;
          font-weight: 600;
          padding: 0.5rem 1.25rem;
          border-radius: 8px;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        
        .admin-nav .btn:hover {
          background: rgba(255, 247, 230, 0.15);
          border-color: rgba(255, 247, 230, 0.6);
          color: #fff7e6;
          transform: translateY(-2px);
        }
        
        .admin-nav .btn-danger {
          background: linear-gradient(135deg, #b03b2d 0%, #7c1f1f 100%);
          border: none;
        }
        
        .admin-nav .btn-danger:hover {
          background: linear-gradient(135deg, #7c1f1f 0%, #5b1414 100%);
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(91, 20, 20, 0.4);
        }
        
        @media (max-width: 768px) {
          .admin-header {
            padding: 1rem 0;
          }
          
          .admin-logo {
            flex-direction: column;
            text-align: center;
            margin-bottom: 1rem;
          }
          
          .logo-icon {
            margin-right: 0;
            margin-bottom: 0.5rem;
          }
          
          .admin-nav {
            text-align: center;
          }
          
          .admin-nav .btn {
            font-size: 0.875rem;
            padding: 0.4rem 1rem;
            margin: 0.25rem;
          }
        }
      `}</style>
    </>
  );
};

export default AdminLayout;
