import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import adminImage from '../img/admin.png';

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    adminCode: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  const { signup } = useAuth();
  const history = useHistory();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(false);

    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.adminCode) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      const result = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        adminCode: formData.adminCode
      });
      
      if (result.success) {
        setSuccess(true);
        setTimeout(() => {
          history.replace('/dashboard');
        }, 2000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError('Signup failed. Please try again.');
    }
    
    setLoading(false);
  };

  if (success) {
    return (
      <div className="admin-login-container">
        <div className="admin-login-shell">
          <div className="login-side">
            <img src={adminImage} alt="Navathaniya admin signup" />
            <div className="login-side-overlay">
              <h2>NAVATHANIYA</h2>
              <p>Tradition meets everyday.</p>
            </div>
          </div>
          <div className="admin-login-card text-center">
            <div className="login-image">
              <img src={adminImage} alt="Navathaniya admin signup" />
            </div>
            <div className="mb-4">
              <i className="bi bi-check-circle text-success" style={{ fontSize: '4rem' }}></i>
            </div>
            <h2 className="text-success mb-3">Admin Account Created!</h2>
            <p className="text-muted">Redirecting to dashboard...</p>
            <div className="nava-loader" role="status" aria-label="Loading">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-shell">
        <div className="login-side">
          <img src={adminImage} alt="Navathaniya admin signup" />
          <div className="login-side-overlay">
            <h2>NAVATHANIYA</h2>
            <p>Tradition meets everyday.</p>
          </div>
        </div>
        <div className="admin-login-card">
          <div className="login-image">
            <img src={adminImage} alt="Navathaniya admin signup" />
          </div>
          <div className="text-center mb-4">
            <i className="bi bi-person-plus admin-login-icon"></i>
            <h2 className="admin-login-title">Admin Signup</h2>
            <p className="text-muted">Create your admin account</p>
          </div>

        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">
              <i className="bi bi-person me-2"></i>
              Full Name
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              <i className="bi bi-envelope me-2"></i>
              Email Address
            </label>
            <input
              type="email"
              className="form-control form-control-lg"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="admin@shophub.com"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              <i className="bi bi-lock me-2"></i>
              Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter password (min 6 characters)"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">
              <i className="bi bi-lock-fill me-2"></i>
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="adminCode" className="form-label">
              <i className="bi bi-key me-2"></i>
              Admin Code
            </label>
            <input
              type="text"
              className="form-control form-control-lg"
              id="adminCode"
              name="adminCode"
              value={formData.adminCode}
              onChange={handleChange}
              required
              placeholder="Enter admin authorization code"
            />
            <small className="text-muted">
              <i className="bi bi-info-circle me-1"></i>
              Demo code: ADMIN2024
            </small>
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg w-100"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="nava-loader nava-loader-sm me-2" aria-hidden="true">
                  <span></span>
                  <span></span>
                  <span></span>
                </span>
                Creating Account...
              </>
            ) : (
              <>
                <i className="bi bi-person-plus me-2"></i>
                Create Admin Account
              </>
            )}
          </button>
        </form>

        <div className="mt-4 text-center">
          <small className="text-muted">
            Already have an account?{' '}
            <Link to="/admin/login" className="text-primary">
              Sign in here
            </Link>
          </small>
        </div>

        <div className="mt-3 text-center">
          <Link to="/" className="btn btn-outline-secondary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Store
          </Link>
        </div>
        </div>
      </div>
      <style>{`
        .admin-login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f6edd9;
          padding: 2rem;
        }

        .admin-login-shell {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          max-width: 980px;
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
          max-width: 520px;
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

        .login-image img {
          width: 100%;
          height: 180px;
          object-fit: cover;
          display: block;
        }

        .admin-login-icon {
          color: #b8893b;
          font-size: 2.5rem;
        }

        .admin-login-title {
          color: #2b2117;
          font-weight: 700;
        }

        .form-label {
          color: #2b2117;
          font-weight: 600;
        }

        .form-label i {
          color: #b8893b;
        }

        .form-control {
          border: 2px solid #d9c39b;
          border-radius: 0.65rem;
          background: #fff7e6;
        }

        .form-control:focus {
          border-color: #b8893b;
          box-shadow: 0 0 0 0.2rem rgba(184, 137, 59, 0.2);
        }

        .btn-primary {
          background: #b8893b;
          border: none;
          color: #2b2117;
          box-shadow: 0 6px 16px rgba(81, 60, 35, 0.25);
        }

        .btn-primary:hover:not(:disabled) {
          background: #a9792f;
        }

        .btn-outline-secondary {
          border-color: #b8893b;
          color: #6d2735;
        }

        .btn-outline-secondary:hover {
          background: #b8893b;
          color: #2b2117;
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

        @media (max-width: 768px) {
          .admin-login-shell {
            grid-template-columns: 1fr;
            max-width: 540px;
          }

          .login-side {
            min-height: 220px;
          }

          .admin-login-card {
            padding: 2rem;
          }

          .login-image {
            margin: -2rem -2rem 1.5rem;
            display: block;
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
    </div>
  );
};

export default AdminSignup;
