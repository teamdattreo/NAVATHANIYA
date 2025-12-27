import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

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
        <div className="admin-login-card text-center">
          <div className="mb-4">
            <i className="bi bi-check-circle text-success" style={{ fontSize: '4rem' }}></i>
          </div>
          <h2 className="text-success mb-3">Admin Account Created!</h2>
          <p className="text-muted">Redirecting to dashboard...</p>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
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
                <span className="spinner-border spinner-border-sm me-2"></span>
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
  );
};

export default AdminSignup;
