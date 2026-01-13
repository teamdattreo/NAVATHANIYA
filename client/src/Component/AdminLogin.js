import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import adminImage from '../img/admin.png';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const history = useHistory();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/dashboard';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      // Redirect to the intended page or dashboard
      history.replace(from);
    } else {
      setError(result.error);
    }
    
    setLoading(false);
  };

  return (
    <>
      <div className="admin-login-wrapper">
        <div className="background-pattern"></div>
        <div className="admin-login-shell">
          <div className="login-side">
            <img src={adminImage} alt="Navathaniya admin login" />
            <div className="login-side-overlay">
              <h2>NAVATHANIYA</h2>
              <p>Tradition meets everyday.</p>
            </div>
          </div>
          <div className="admin-login-card">
          <div className="login-image">
            <img src={adminImage} alt="Navathaniya admin login" />
          </div>
          <div className="login-header">
            {/* <div className="logo-circle">
              <i className="bi bi-shield-lock"></i>
            </div> */}
            <h2 className="login-title"></h2>
            <p className="login-subtitle">NAVATHANIYA Administration</p>
          </div>

          {error && (
            <div className="alert alert-error">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                <i className="bi bi-envelope me-2"></i>
                Email Address
              </label>
              <div className="input-wrapper">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your admin email"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="password" className="form-label">
                <i className="bi bi-lock me-2"></i>
                Password
              </label>
              <div className="input-wrapper">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-login"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="nava-loader nava-loader-sm me-2" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Sign In 
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <Link to="/" className="btn btn-back">
              <i className="bi bi-arrow-left me-2"></i>
              Back to Store
            </Link>
          </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f6edd9;
          position: relative;
          padding: 2rem;
        }
        
        .background-pattern {
          position: absolute;
          inset: 0;
          background-image:
            radial-gradient(circle at 15% 20%, rgba(184, 137, 59, 0.12) 0%, transparent 55%),
            radial-gradient(circle at 85% 80%, rgba(184, 137, 59, 0.12) 0%, transparent 55%);
        }
        
        .admin-login-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          max-width: 880px;
          width: 100%;
          border-radius: 1.5rem;
          overflow: hidden;
          box-shadow: 0 18px 32px rgba(81, 60, 35, 0.25);
        }

        .login-side {
          position: relative;
          background: #f3e6cc;
        }

        .login-side img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .login-side-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(43, 33, 23, 0.2), rgba(43, 33, 23, 0.75));
          color: #fff7e6;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 2rem;
        }

        .login-side-overlay h2 {
          letter-spacing: 0.25em;
          font-size: 1.4rem;
        }

        .login-side-overlay p {
          margin: 0.5rem 0 0;
          font-size: 0.95rem;
        }

        .admin-login-card {
          background: #fdf7e6;
          border-radius: 1.25rem;
          box-shadow: 0 18px 32px rgba(81, 60, 35, 0.2);
          padding: 2.5rem 3rem 3rem;
          width: 100%;
          position: relative;
          z-index: 1;
          border: 2px solid #c9a25a;
          animation: cardFloat 0.8s ease;
        }

        .login-image {
          margin: -2.5rem -3rem 2rem;
          border-radius: 1.1rem 1.1rem 0 0;
          overflow: hidden;
          border-bottom: 2px solid #c9a25a;
          display: none;
        }
        
        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .logo-circle {
          width: 80px;
          height: 80px;
          background: #b8893b;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: inset 0 0 0 6px rgba(253, 247, 230, 0.4);
        }
        
        .logo-circle i {
          color: #2b2117;
          font-size: 2rem;
        }
        
        .login-title {
          color: #2b2117;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .login-subtitle {
          color: #6b5845;
          font-size: 1rem;
          margin: 0;
        }
        
        .alert-error {
          background: rgba(211, 47, 47, 0.1);
          border: 1px solid rgba(211, 47, 47, 0.2);
          color: #d32f2f;
          padding: 1rem;
          border-radius: 0.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-label {
          color: #2b2117;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }
        
        .form-label i {
          color: #b8893b;
        }
        
        .input-wrapper {
          position: relative;
        }
        
        .form-control {
          border: 2px solid #d9c39b;
          border-radius: 0.65rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          width: 100%;
          background: #fff7e6;
        }
        
        .form-control:focus {
          border-color: #b8893b;
          box-shadow: 0 0 0 0.2rem rgba(184, 137, 59, 0.2);
          outline: none;
        }
        
        .btn-login {
          background: #b8893b;
          border: none;
          color: #2b2117;
          font-weight: 600;
          padding: 0.875rem 2rem;
          border-radius: 0.6rem;
          width: 100%;
          font-size: 1rem;
          box-shadow: 0 6px 16px rgba(81, 60, 35, 0.25);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-login:hover:not(:disabled) {
          background: #a9792f;
          transform: translateY(-2px);
          box-shadow: 0 8px 18px rgba(81, 60, 35, 0.3);
        }
        
        .btn-login:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .login-footer {
          text-align: center;
          margin-top: 2rem;
        }
        
        .btn-back {
          background: transparent;
          border: 2px solid #b8893b;
          color: #6d2735;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 0.6rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .btn-back:hover {
          background: #b8893b;
          color: #2b2117;
          transform: translateY(-2px);
        }

        @keyframes cardFloat {
          0% {
            opacity: 0;
            transform: translateY(18px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0%, 100% {
            opacity: 0.8;
          }
          50% {
            opacity: 1;
          }
        }
        
        @media (max-width: 768px) {
          .admin-login-wrapper {
            padding: 1rem;
          }
          
          .admin-login-shell {
            grid-template-columns: 1fr;
            max-width: 520px;
          }

          .login-side {
            min-height: 220px;
          }

          .admin-login-card {
            padding: 2rem;
            margin: 1rem;
          }

          .login-image {
            margin: -2rem -2rem 1.5rem;
            display: block;
          }
          
          .login-title {
            font-size: 1.75rem;
          }
        }

        @media (max-width: 576px) {
          .login-side {
            display: none;
          }

          .admin-login-card {
            margin: 0;
          }
        }
      `}</style>
    </>
  );
};

export default AdminLogin;
