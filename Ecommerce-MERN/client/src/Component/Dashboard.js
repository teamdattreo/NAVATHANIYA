import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import { getProducts } from "./api";
import { getCategories } from "./api";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    recentProducts: 0,
    loading: true
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const productsData = await getProducts(1, 1000);
        const categoriesData = await getCategories();
        
        const products = productsData?.products || [];
        const categories = categoriesData || [];
        
        // Calculate recent products (added in last 7 days)
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentProducts = products.filter(product => 
          new Date(product.createdAt) > sevenDaysAgo
        ).length;

        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          recentProducts,
          loading: false
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };

    loadStats();
  }, []);

  const StatCard = ({ title, value, icon, color, link, linkText }) => (
    <div className="col-md-4 mb-4">
      <div className="stat-card">
        <div className="stat-icon" style={{ backgroundColor: color + '20', color: color }}>
          <i className={`bi ${icon}`}></i>
        </div>
        <div className="stat-content">
          <h3 className="stat-value">{stats.loading ? '...' : value}</h3>
          <p className="stat-title">{title}</p>
          <Link to={link} className="stat-link">
            {linkText} <i className="bi bi-arrow-right ms-1"></i>
          </Link>
        </div>
      </div>
    </div>
  );

  const QuickAction = ({ title, description, icon, link, color }) => (
    <div className="col-md-6 col-lg-4 mb-4">
      <Link to={link} className="quick-action-card">
        <div className="action-icon" style={{ backgroundColor: color + '20', color: color }}>
          <i className={`bi ${icon}`}></i>
        </div>
        <div className="action-content">
          <h5 className="action-title">{title}</h5>
          <p className="action-description">{description}</p>
        </div>
        <div className="action-arrow">
          <i className="bi bi-arrow-right"></i>
        </div>
      </Link>
    </div>
  );

  if (stats.loading) {
    return (
      <AdminLayout title="Dashboard" description="Loading..." className="container-fluid">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout
      title="Admin Dashboard"
      description="Welcome to NAVATHANIYA Admin Panel"
      className="container-fluid dashboard-container"
      footer={false}
    >
      <style>{`
        .dashboard-container {
          background: #f8f9fa;
          min-height: 100vh;
        }
        
        .dashboard-header {
          background: linear-gradient(135deg, #2E7D32 0%, #388E3C 50%, #43A047 100%);
          color: white;
          padding: 2rem 0;
          margin-bottom: 2rem;
        }
        
        .dashboard-title {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
        }
        
        .dashboard-subtitle {
          opacity: 0.9;
          margin-bottom: 0;
        }
        
        .stat-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
          height: 100%;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }
        
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1rem;
          font-size: 1.5rem;
        }
        
        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        
        .stat-title {
          color: #6c757d;
          margin-bottom: 1rem;
          font-weight: 500;
        }
        
        .stat-link {
          color: #2E7D32;
          text-decoration: none;
          font-weight: 500;
          transition: color 0.3s ease;
        }
        
        .stat-link:hover {
          color: #1B5E20;
        }
        
        .quick-action-card {
          background: white;
          border-radius: 1rem;
          padding: 1.5rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          text-decoration: none;
          color: inherit;
          height: 100%;
        }
        
        .quick-action-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
          text-decoration: none;
          color: inherit;
        }
        
        .action-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1rem;
          font-size: 1.25rem;
        }
        
        .action-content {
          flex-grow: 1;
        }
        
        .action-title {
          color: #2c3e50;
          font-weight: 600;
          margin-bottom: 0.5rem;
        }
        
        .action-description {
          color: #6c757d;
          margin-bottom: 0;
          font-size: 0.9rem;
        }
        
        .action-arrow {
          color: #2E7D32;
          font-size: 1.25rem;
          transition: transform 0.3s ease;
        }
        
        .quick-action-card:hover .action-arrow {
          transform: translateX(5px);
        }
        
        .section-title {
          font-size: 1.75rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1.5rem;
          position: relative;
          padding-bottom: 0.5rem;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 50px;
          height: 3px;
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border-radius: 2px;
        }
      `}</style>

      {/* Dashboard Header */}
      <div className="dashboard-header">
        <div className="container">
          <h1 className="dashboard-title">
            <i className="bi bi-speedometer2 me-3"></i>
            Admin Dashboard
          </h1>
          <p className="dashboard-subtitle">Manage your NAVATHANIYA store with ease</p>
        </div>
      </div>

      <div className="container">
        {/* Statistics Cards */}
        <div className="row mb-4">
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon="bi-box-seam"
            color="#2E7D32"
            link="/products"
            linkText="Manage Products"
          />
          <StatCard
            title="Categories"
            value={stats.totalCategories}
            icon="bi-tags"
            color="#43A047"
            link="/create/category"
            linkText="Manage Categories"
          />
          <StatCard
            title="New This Week"
            value={stats.recentProducts}
            icon="bi-graph-up"
            color="#d32f2f"
            link="/create/product"
            linkText="Add Product"
          />
        </div>

        {/* Quick Actions */}
        <div className="row mb-4">
          <div className="col-12">
            <h2 className="section-title">Quick Actions</h2>
          </div>
          <QuickAction
            title="Create Category"
            description="Add new product categories"
            icon="bi-plus-circle"
            link="/create/category"
            color="#43A047"
          />
          <QuickAction
            title="Add Product"
            description="Create new product listings"
            icon="bi-box"
            link="/create/product"
            color="#2E7D32"
          />
          <QuickAction
            title="Manage Products"
            description="Edit or delete existing products"
            icon="bi-gear"
            link="/products"
            color="#d32f2f"
          />
        </div>

        {/* Recent Activity
        <div className="row">
          <div className="col-12">
            <h2 className="section-title">System Overview</h2>
            <div className="card border-0 shadow-sm">
              <div className="card-body">
                <div className="row text-center">
                  <div className="col-md-3 mb-3">
                    <div className="system-stat">
                      <i className="bi bi-check-circle text-success" style={{ fontSize: '2rem' }}></i>
                      <h4 className="mt-2">System Active</h4>
                      <p className="text-muted">All systems operational</p>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="system-stat">
                      <i className="bi bi-database text-info" style={{ fontSize: '2rem' }}></i>
                      <h4 className="mt-2">Database</h4>
                      <p className="text-muted">Connected & healthy</p>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="system-stat">
                      <i className="bi bi-shield-check text-primary" style={{ fontSize: '2rem' }}></i>
                      <h4 className="mt-2">Security</h4>
                      <p className="text-muted">Authentication enabled</p>
                    </div>
                  </div>
                  <div className="col-md-3 mb-3">
                    <div className="system-stat">
                      <i className="bi bi-clock text-warning" style={{ fontSize: '2rem' }}></i>
                      <h4 className="mt-2">Last Update</h4>
                      <p className="text-muted">Just now</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
