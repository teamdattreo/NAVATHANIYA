import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import adminImage from "../img/admin.png";

const AdminLayout = ({ children, className = "" }) => {
  const { user, logout } = useAuth();
  const history = useHistory();

  const handleLogout = () => {
    logout();
    history.push("/admin/login");
  };

  return (
    <div className="admin-shell">
      <aside className="admin-sidebar">
        <div className="admin-sidebar-brand">
          <div className="admin-sidebar-logo">N</div>
          <div>
            <h2>Navathaniya</h2>
            <small>Admin</small>
          </div>
        </div>
        <nav className="admin-nav">
          <Link to="/dashboard" className="active">
            <i className="bi bi-grid"></i>
            Dashboard
          </Link>
          <button type="button">
            <i className="bi bi-box-seam"></i>
            Products
          </button>
          <div className="admin-subnav">
            <Link to="/products">Manage Products</Link>
            <Link to="/create/product">Create Product</Link>
          </div>
          <Link to="/create/category">
            <i className="bi bi-tags"></i>
            Categories
          </Link>
          {/* <Link to="/dashboard">
            <i className="bi bi-receipt"></i>
            Orders
          </Link>
          <Link to="/dashboard">
            <i className="bi bi-people"></i>
            Customers
          </Link>
          <Link to="/dashboard">
            <i className="bi bi-bar-chart"></i>
            Reports
          </Link>
          <Link to="/dashboard">
            <i className="bi bi-gear"></i>
            Settings
          </Link> */}
          <Link to="/admin/signup">
            <i className="bi bi-person-plus"></i>
            Admin Signup
          </Link>
        </nav>
        <div className="admin-sidebar-footer">
          <button type="button" onClick={handleLogout}>
            <i className="bi bi-box-arrow-right"></i>
            Logout
          </button>
        </div>
      </aside>

      <section className="admin-main">
        <div className="admin-topbar">
          <div className="admin-search">
            <i className="bi bi-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
          <div className="admin-top-actions">
            <button className="admin-icon-btn" type="button" aria-label="Notifications">
              <i className="bi bi-bell"></i>
            </button>
            <div className="admin-user">
              <img src={adminImage} alt="Admin user" />
              <div>
                <strong>{user?.name || "Admin User"}</strong>
                <div className="admin-user-role">Admin</div>
              </div>
            </div>
          </div>
        </div>

        <div className={`admin-content ${className}`.trim()}>{children}</div>
      </section>

      <style>{`
        .admin-shell {
          display: grid;
          grid-template-columns: 260px 1fr;
          min-height: 100vh;
          background: #edf0f5;
        }

        .admin-sidebar {
          background: linear-gradient(180deg, #1e3658 0%, #12233a 100%);
          color: #e2e8f0;
          padding: 1.5rem 1.2rem;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .admin-sidebar-brand {
          display: flex;
          gap: 0.8rem;
          align-items: center;
        }

        .admin-sidebar-logo {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.12);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
        }

        .admin-sidebar-brand h2 {
          font-size: 1.1rem;
          margin: 0;
          color: #f8fafc;
        }

        .admin-sidebar-brand small {
          display: block;
          font-size: 0.7rem;
          color: rgba(226, 232, 240, 0.7);
        }

        .admin-nav {
          display: grid;
          gap: 0.35rem;
        }

        .admin-nav a,
        .admin-nav button {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          border: none;
          background: transparent;
          color: rgba(226, 232, 240, 0.8);
          padding: 0.6rem 0.75rem;
          border-radius: 12px;
          font-size: 0.95rem;
          text-decoration: none;
          cursor: pointer;
        }

        .admin-nav a:hover,
        .admin-nav button:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #f8fafc;
        }

        .admin-nav .active {
          background: rgba(255, 255, 255, 0.12);
          color: #f8fafc;
        }

        .admin-subnav {
          margin-left: 1.8rem;
          display: grid;
          gap: 0.3rem;
        }

        .admin-subnav a {
          font-size: 0.85rem;
          padding: 0.45rem 0.6rem;
          border-radius: 10px;
        }

        .admin-sidebar-footer button {
          width: 100%;
          margin-top: auto;
          border: none;
          background: rgba(255, 255, 255, 0.12);
          color: #f8fafc;
          padding: 0.6rem 0.75rem;
          border-radius: 12px;
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.95rem;
        }

        .admin-main {
          display: flex;
          flex-direction: column;
        }

        .admin-topbar {
          background: #ffffff;
          padding: 1rem 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e2e8f0;
        }

        .admin-search {
          display: flex;
          align-items: center;
          gap: 0.6rem;
          background: #f1f5f9;
          border-radius: 12px;
          padding: 0.5rem 0.9rem;
          min-width: 260px;
          color: #64748b;
        }

        .admin-search input {
          border: none;
          background: transparent;
          font-size: 0.9rem;
          width: 100%;
        }

        .admin-search input:focus {
          outline: none;
        }

        .admin-top-actions {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .admin-icon-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid #e2e8f0;
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #64748b;
        }

        .admin-user {
          display: flex;
          align-items: center;
          gap: 0.65rem;
          font-size: 0.9rem;
          color: #1e293b;
        }

        .admin-user img {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          object-fit: cover;
        }

        .admin-user-role {
          font-size: 0.7rem;
          color: #64748b;
        }

        .admin-content {
          padding: 2rem;
          display: grid;
          gap: 1.5rem;
        }

        .admin-panel {
          background: #ffffff;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 8px 18px rgba(15, 23, 42, 0.08);
          border: 1px solid #edf2f7;
        }

        .admin-page-header {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 1rem;
        }

        .admin-page-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1e293b;
          margin: 0;
        }

        .admin-page-subtitle {
          color: #64748b;
          margin: 0.35rem 0 0;
          font-size: 0.9rem;
        }

        @media (max-width: 1100px) {
          .admin-shell {
            grid-template-columns: 220px 1fr;
          }
        }

        @media (max-width: 900px) {
          .admin-shell {
            grid-template-columns: 1fr;
          }

          .admin-sidebar {
            position: static;
            flex-direction: column;
          }

          .admin-topbar {
            flex-direction: column;
            gap: 0.75rem;
            align-items: flex-start;
          }
        }

        @media (max-width: 768px) {
          .admin-sidebar {
            padding: 1.2rem;
          }

          .admin-topbar {
            padding: 1rem 1.25rem;
          }

          .admin-search {
            width: 100%;
            min-width: 0;
          }

          .admin-top-actions {
            width: 100%;
            justify-content: space-between;
          }

          .admin-content {
            padding: 1.5rem;
          }
        }

        @media (max-width: 576px) {
          .admin-topbar {
            padding: 0.9rem 1rem;
          }

          .admin-content {
            padding: 1.2rem 1rem 1.5rem;
          }

          .admin-panel {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
