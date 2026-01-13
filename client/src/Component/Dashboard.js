import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./AdminLayout";
import { getCategories, getProducts } from "./api";
import ShowImage from "./ShowImage";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalCategories: 0,
    recentProducts: 0,
    newOrders: 0,
    products: [],
    loading: true,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const productsData = await getProducts(1, 1000);
        const categoriesData = await getCategories();

        const products = Array.isArray(productsData)
          ? productsData
          : productsData?.products || [];
        const categories = Array.isArray(categoriesData) ? categoriesData : [];

        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const recentProducts = products.filter(
          (product) => new Date(product.createdAt) > sevenDaysAgo
        ).length;

        const sortedProducts = [...products].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setStats({
          totalProducts: products.length,
          totalCategories: categories.length,
          recentProducts,
          newOrders: 0,
          products: sortedProducts,
          loading: false,
        });
      } catch (error) {
        console.error("Error loading dashboard stats:", error);
        setStats((prev) => ({ ...prev, loading: false }));
      }
    };

    loadStats();
  }, []);

  const StatCard = ({ title, value, icon, accent, helper }) => (
    <div className="admin-stat-card" style={{ background: accent }}>
      <div className="admin-stat-icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <div>
        <p className="admin-stat-title">{title}</p>
        <h3 className="admin-stat-value">
          {stats.loading ? "..." : Number(value).toLocaleString("en-US")}
        </h3>
        <span className="admin-stat-helper">{helper}</span>
      </div>
    </div>
  );

  if (stats.loading) {
    return (
      <AdminLayout title="Dashboard" description="Loading...">
        <div className="text-center py-5">
          <div className="nava-loader" role="status" aria-label="Loading">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Admin Dashboard" description="Welcome to NAVATHANIYA Admin Panel">
      <style>{`
        .admin-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .admin-stat-card {
          border-radius: 16px;
          padding: 1.2rem 1.3rem;
          color: #fff;
          display: flex;
          gap: 0.9rem;
          align-items: center;
          box-shadow: 0 10px 20px rgba(15, 23, 42, 0.18);
        }

        .admin-stat-icon {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: rgba(255, 255, 255, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 1.2rem;
        }

        .admin-stat-title {
          margin: 0;
          font-size: 0.85rem;
          opacity: 0.85;
        }

        .admin-stat-value {
          margin: 0.15rem 0 0.2rem;
          font-size: 1.6rem;
          font-weight: 700;
        }

        .admin-stat-helper {
          font-size: 0.75rem;
          opacity: 0.85;
        }

        .admin-panels {
          display: grid;
          grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.4fr);
          gap: 1.5rem;
        }

        .admin-panel h3 {
          font-size: 1.05rem;
          margin-bottom: 1rem;
          color: #1e293b;
          font-weight: 600;
        }

        .admin-action {
          display: flex;
          align-items: center;
          justify-content: space-between;
          border: 1px solid #e2e8f0;
          border-radius: 12px;
          padding: 0.6rem 0.8rem;
          margin-bottom: 0.7rem;
          text-decoration: none;
          color: #1e293b;
          font-size: 0.9rem;
          background: #f8fafc;
        }

        .admin-action i {
          color: #2563eb;
        }

        .admin-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 0.88rem;
        }

        .admin-table th {
          text-align: left;
          color: #64748b;
          font-weight: 600;
          padding-bottom: 0.75rem;
        }

        .admin-table td {
          padding: 0.65rem 0;
          border-top: 1px solid #edf2f7;
          color: #1e293b;
        }

        .admin-table .product-grid-image {
          width: 38px;
          height: 38px;
          border-radius: 10px;
          overflow: hidden;
          background: #f1f5f9;
        }

        .admin-table .product-grid-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .admin-table-actions {
          display: flex;
          gap: 0.4rem;
        }

        .admin-table-actions button {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          border: none;
          background: #f1f5f9;
          color: #475569;
        }

        .admin-table-footer {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
        }

        .admin-table-footer a {
          text-decoration: none;
          background: #1e3658;
          color: #f8fafc;
          padding: 0.45rem 1rem;
          border-radius: 999px;
          font-size: 0.85rem;
        }

        @media (max-width: 900px) {
          .admin-panels {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .admin-stats {
            grid-template-columns: 1fr;
          }

          .admin-panels {
            gap: 1.2rem;
          }

          .admin-table {
            font-size: 0.82rem;
          }

          .admin-table th:nth-child(3),
          .admin-table td:nth-child(3) {
            display: none;
          }
        }

        @media (max-width: 576px) {
          .admin-table th:nth-child(5),
          .admin-table td:nth-child(5) {
            display: none;
          }
        }
      `}</style>

      <div className="admin-stats">
        <StatCard
          title="Total Products"
          value={stats.totalProducts}
          icon="bi-box-seam"
          accent="linear-gradient(135deg, #5f5ce6, #4f46e5)"
          helper="Active"
        />
        <StatCard
          title="Total Categories"
          value={stats.totalCategories}
          icon="bi-folder2"
          accent="linear-gradient(135deg, #fb923c, #f97316)"
          helper="Active"
        />
        <StatCard
          title="New This Week"
          value={stats.recentProducts}
          icon="bi-calendar2-week"
          accent="linear-gradient(135deg, #14b8a6, #0ea5a4)"
          helper="Products & Categories"
        />
        {/* <StatCard
          title="New Orders This Week"
          value={stats.newOrders}
          icon="bi-cart-check"
          accent="linear-gradient(135deg, #f43f5e, #ec4899)"
          helper="Processed"
        /> */}
      </div>

      <div className="admin-panels">
        <div className="admin-panel">
          <h3>Quick Actions</h3>
          <Link to="/create/product" className="admin-action">
            <span>
              <i className="bi bi-plus-circle me-2"></i>
              Create New Product
            </span>
            <i className="bi bi-arrow-right"></i>
          </Link>
          <Link to="/create/category" className="admin-action">
            <span>
              <i className="bi bi-folder-plus me-2"></i>
              Create New Category
            </span>
            <i className="bi bi-arrow-right"></i>
          </Link>
        </div>

        <div className="admin-panel">
          <h3>Recent Products</h3>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Product Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {stats.products.slice(0, 4).map((product) => (
                <tr key={product._id}>
                  <td>
                    <ShowImage item={product} url="product" />
                  </td>
                  <td>{product.name}</td>
                  <td>{product.category?.name || "General"}</td>
                  <td>Rs.{product.price}</td>
                  <td>{product.quantity || 0}</td>
                  <td>
                    <div className="admin-table-actions">
                      <button type="button" aria-label="Edit">
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button type="button" aria-label="Delete">
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {stats.products.length === 0 && (
                <tr>
                  <td colSpan="6" style={{ color: "#94a3b8", paddingTop: "1rem" }}>
                    No products found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="admin-table-footer">
            <Link to="/products">View All Products</Link>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;
