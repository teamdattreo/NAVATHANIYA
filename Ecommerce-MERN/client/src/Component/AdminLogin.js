import React, { useState } from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

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
        <div className="admin-login-card">
          <div className="login-header">
            <div className="logo-circle">
              <i className="bi bi-shield-lock"></i>
            </div>
            <h2 className="login-title">Admin Portal</h2>
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
                  <span className="spinner-border spinner-border-sm me-2"></span>
                  Signing in...
                </>
              ) : (
                <>
                  <i className="bi bi-box-arrow-in-right me-2"></i>
                  Sign In to Admin
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
      
      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #43A047 100%);
          position: relative;
          padding: 2rem;
        }
        
        .background-pattern {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: 
            radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255,255,255,0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(255,255,255,0.05) 0%, transparent 50%);
        }
        
        .admin-login-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          padding: 3rem;
          width: 100%;
          max-width: 450px;
          position: relative;
          z-index: 1;
          border: 1px solid rgba(255,255,255,0.2);
        }
        
        .login-header {
          text-align: center;
          margin-bottom: 2.5rem;
        }
        
        .logo-circle {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
          box-shadow: 0 8px 25px rgba(46, 125, 50, 0.3);
        }
        
        .logo-circle i {
          color: white;
          font-size: 2rem;
        }
        
        .login-title {
          color: #2c3e50;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .login-subtitle {
          color: #6c757d;
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
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 0.5rem;
          display: flex;
          align-items: center;
        }
        
        .form-label i {
          color: #2E7D32;
        }
        
        .input-wrapper {
          position: relative;
        }
        
        .form-control {
          border: 2px solid #e9ecef;
          border-radius: 0.5rem;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          transition: all 0.3s ease;
          width: 100%;
        }
        
        .form-control:focus {
          border-color: #2E7D32;
          box-shadow: 0 0 0 0.2rem rgba(46, 125, 50, 0.25);
          outline: none;
        }
        
        .btn-login {
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border: none;
          color: white;
          font-weight: 600;
          padding: 0.875rem 2rem;
          border-radius: 0.5rem;
          width: 100%;
          font-size: 1rem;
          box-shadow: 0 4px 15px rgba(46, 125, 50, 0.3);
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .btn-login:hover:not(:disabled) {
          background: linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%);
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(46, 125, 50, 0.4);
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
          border: 2px solid #2E7D32;
          color: #2E7D32;
          font-weight: 600;
          padding: 0.75rem 1.5rem;
          border-radius: 0.5rem;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          transition: all 0.3s ease;
        }
        
        .btn-back:hover {
          background: #2E7D32;
          color: white;
          transform: translateY(-2px);
        }
        
        @media (max-width: 768px) {
          .admin-login-wrapper {
            padding: 1rem;
          }
          
          .admin-login-card {
            padding: 2rem;
            margin: 1rem;
          }
          
          .login-title {
            font-size: 1.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default AdminLogin;
