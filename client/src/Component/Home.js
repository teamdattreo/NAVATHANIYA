import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getCategories } from "./api";
import Card from "./Card";
import Search from "./Search";
import heroImage from "../img/hero.png";

const Home = () => {
  const [allProducts, setAllProducts] = useState([]);
  const [productsByArrival, setProductsByArrival] = useState([]);
  const [categories, setCategories] = useState([]);
  const [productsByCategory, setProductsByCategory] = useState({});
  const [categoryPages, setCategoryPages] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [error, setError] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const PRODUCTS_PER_PAGE = 10;

  const loadCategories = () => {
    return getCategories().then((data) => {
      if (!data) {
        setError("Failed to load categories");
        return Promise.reject("Failed to load categories");
      }
      if (data.error) {
        setError(data.error);
        return Promise.reject(data.error);
      } else {
        setCategories(data);
        return Promise.resolve(data);
      }
    }).catch((error) => {
      setError(error.message || "Failed to load categories");
      return Promise.reject(error);
    });
  };

  const loadProductsByArrival = (limit = 10000) => {
    // fetch all products by requesting a large limit
    getProducts(1, limit).then((data) => {
      if (!data) {
        setError("Server returned no data");
        return;
      }
      if (Array.isArray(data)) {
        // Server returns array directly
        const products = data;
        setAllProducts(products);
        setProductsByArrival(products);
        setFilteredProducts(products);
        
        // Group products by category - handle different data structures
        const grouped = {};
        products.forEach((product) => {
          const categoryName = product.category?.name || "Uncategorized";
          if (!grouped[categoryName]) {
            grouped[categoryName] = [];
          }
          grouped[categoryName].push(product);
        });
        
        setProductsByCategory(grouped);
        setLoading(false);
      } else if (data.error) {
        setError(data.error);
      } else {
        // Handle case where data might be an object with products property
        const products = data.products || [];
        setAllProducts(products);
        setProductsByArrival(products);
        setFilteredProducts(products);
        
        // Group products by category
        const grouped = {};
        products.forEach((product) => {
          const categoryName = product.category?.name || "Uncategorized";
          if (!grouped[categoryName]) {
            grouped[categoryName] = [];
          }
          grouped[categoryName].push(product);
        });
        
        setProductsByCategory(grouped);
        setLoading(false);
      }
    }).catch((error) => {
      setError(error.message || "Failed to load products");
      setLoading(false);
    });
  };

  useEffect(() => {
    // Load categories first, then products
    loadCategories().then(() => {
      loadProductsByArrival();
    });

    const onProductAdded = () => {
      // Reload categories and products when a new product is added
      loadCategories().then(() => {
        loadProductsByArrival();
      });
    };
    const onSearchResults = (e) => {
      const results = e && e.detail ? e.detail : null;
      if (!results || results.length === 0) {
        // restore full list when no results by reloading
        loadCategories().then(() => {
          loadProductsByArrival();
        });
      } else {
        setProductsByArrival(results);
        setFilteredProducts(results);
      }
    };

    window.addEventListener("productAdded", onProductAdded);
    window.addEventListener("searchResults", onSearchResults);
    return () => {
      window.removeEventListener("productAdded", onProductAdded);
      window.removeEventListener("searchResults", onSearchResults);
    };
  }, []);

  useEffect(() => {
    const filtered = productsByArrival.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, productsByArrival]);

  // Modern category sections
  const featuredCategories = [
    {
      title: "Garments",
      subtitle: "Quality clothing for all occasions",
      icon: "bi-bag",
      color: "#ff6b35",
      link: "/garments"
    },
    {
      title: "Electrical Goods",
      subtitle: "Reliable electrical products",
      icon: "bi-lightbulb",
      color: "#4ecdc4",
      link: "/electrical"
    },
    {
      title: "Kitchen Items",
      subtitle: "Essential kitchenware",
      icon: "bi-egg-fried",
      color: "#45b7d1",
      link: "/kitchen"
    },
    {
      title: "Traditional Items",
      subtitle: "Pooja & Kovil items",
      icon: "bi-star",
      color: "#f7b731",
      link: "/traditional"
    }
  ];

  // Category Filter Component
  const CategoryFilter = () => {
    const handleCategoryChange = (categoryName) => {
      setSelectedCategory(categoryName);
      setSearchTerm(""); // Clear search when changing category
    };
    
    // Get only categories that have products
    const categoriesWithProducts = Object.entries(productsByCategory)
      .filter(([categoryName, products]) => categoryName !== "Uncategorized" && products.length > 0)
      .map(([categoryName, products]) => ({ name: categoryName, count: products.length }));
    
    return (
      <div className="category-filter mb-5">
        <div className="text-center mb-4">
          <h3 className="filter-title">
            <i className="bi bi-funnel me-2" style={{ color: '#2E7D32' }}></i>
            Filter by Category
          </h3>
          <p className="text-muted">Choose a category to view specific products</p>
        </div>
        
        <div className="d-flex flex-wrap justify-content-center gap-2">
          <button
            className={`category-filter-btn ${selectedCategory === "all" ? "active" : ""}`}
            onClick={() => handleCategoryChange("all")}
          >
            <i className="bi bi-grid-3x3-gap me-2"></i>
            All Categories
            <span className="badge ms-2">{allProducts.length}</span>
          </button>
          
          {categoriesWithProducts.map((category) => (
            <button
              key={category.name}
              className={`category-filter-btn ${selectedCategory === category.name ? "active" : ""}`}
              onClick={() => handleCategoryChange(category.name)}
            >
              <i className="bi bi-folder me-2"></i>
              {category.name}
              <span className="badge ms-2">{category.count}</span>
            </button>
          ))}
          
          {/* Show Uncategorized only if it has products */}
          {productsByCategory["Uncategorized"] && productsByCategory["Uncategorized"].length > 0 && (
            <button
              className={`category-filter-btn ${selectedCategory === "Uncategorized" ? "active" : ""}`}
              onClick={() => handleCategoryChange("Uncategorized")}
            >
              <i className="bi bi-question-circle me-2"></i>
              Uncategorized
              <span className="badge ms-2">{productsByCategory["Uncategorized"].length}</span>
            </button>
          )}
        </div>
        
        {categoriesWithProducts.length === 0 && (
          <div className="text-center mt-4">
            <p className="text-muted">
              <i className="bi bi-info-circle me-2"></i>
              No categories found. Products may not be assigned to categories yet.
            </p>
          </div>
        )}
      </div>
    );
  };

  // Component to display products by category
  const CategorySection = ({ categoryName, products, index }) => {
    const [currentPage, setCurrentPage] = useState(1);
    
    const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
    const endIndex = startIndex + PRODUCTS_PER_PAGE;
    const currentProducts = products.slice(startIndex, endIndex);
    
    const handlePageChange = (page) => {
      setCurrentPage(page);
    };
    
    const PaginationControls = () => {
      if (totalPages <= 1) return null;
      
      return (
        <div className="pagination-controls d-flex justify-content-center align-items-center gap-2 mt-4">
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          
          <div className="page-numbers d-flex gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                className={`btn btn-sm ${currentPage === i + 1 ? 'btn-primary' : 'btn-outline-secondary'}`}
                onClick={() => handlePageChange(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
          
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      );
    };
    
    return (
      <div 
        className="category-section mb-5" 
        style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.2}s both` }}
      >
        <div className="section-header mb-4">
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h3 className="category-title mb-2">
                <i className="bi bi-folder-fill me-2" style={{ color: '#2E7D32' }}></i>
                {categoryName}
              </h3>
              <p className="category-subtitle text-muted">
                {products.length} product{products.length !== 1 ? 's' : ''} available
                {totalPages > 1 && ` (Page ${currentPage} of ${totalPages})`}
              </p>
            </div>
            <div className="category-badge">
              <span className="badge bg-primary rounded-pill">
                {products.length}
              </span>
            </div>
          </div>
          <div className="category-divider"></div>
        </div>
        
        <div className="row">
          {currentProducts.map((product, i) => (
            <div key={i} className="col-xs-10 col-sm-6 col-md-4 col-lg-3 mb-4">
              <Card product={product} />
            </div>
          ))}
        </div>
        
        {currentProducts.length === 0 && (
          <div className="text-center py-4">
            <i className="bi bi-inbox" style={{ fontSize: '2rem', color: '#6c757d' }}></i>
            <p className="text-muted mt-2">No products in this category yet</p>
          </div>
        )}
        
        <PaginationControls />
      </div>
    );
  };

  const CategoryCard = ({ category, index }) => (
    <div 
      className="col-md-3 col-sm-6 mb-4"
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className="category-card h-100 text-center p-4">
        <div className="category-icon mb-3">
          <i className={`bi ${category.icon}`} style={{ color: category.color, fontSize: '2.5rem' }}></i>
        </div>
        <h5 className="category-title">{category.title}</h5>
        <p className="category-subtitle text-muted small">{category.subtitle}</p>
        <a href={category.link} className="btn btn-outline-primary btn-sm mt-2">
          Shop Now
        </a>
      </div>
    </div>
  );

  return (
    <Layout
      title="Navathaniya - Everyday Essentials"
      description="Navathaniya marketplace for garments, kitchen, electrical, and traditional items"
      className="container-fluid"
    >
      <style>{`
        :root {
          --nava-ink: #0f172a;
          --nava-amber: #f59e0b;
          --nava-emerald: #16a34a;
          --nava-coral: #fb7185;
          --nava-sand: #fff7ed;
          --nava-cloud: #f8fafc;
        }

        .nava-hero {
          position: relative;
          overflow: hidden;
          padding: 7.5rem 2rem 4.5rem;
          border-radius: 28px;
          color: #f8fafc;
          margin: 1.5rem 2rem 2rem;
          background: linear-gradient(120deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.4)),
            url("/img/img.png");
          background-size: cover;
          background-position: center;
        }

        .nava-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(180deg, rgba(15, 23, 42, 0.35), rgba(15, 23, 42, 0.85));
          pointer-events: none;
        }


        .nava-hero-content {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr);
          gap: 2rem;
          align-items: center;
        }

        .nava-hero h1 {
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.1;
          margin-bottom: 1rem;
        }

        .nava-hero p {
          font-size: 1.05rem;
          color: rgba(248, 250, 252, 0.8);
          max-width: 520px;
        }

        .nava-chip-row {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 1.5rem 0;
        }

        .nava-chip {
          background: rgba(248, 250, 252, 0.12);
          border: 1px solid rgba(248, 250, 252, 0.15);
          padding: 0.4rem 0.9rem;
          border-radius: 999px;
          font-size: 0.85rem;
        }

        .nava-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: var(--nava-amber);
          color: #1f2937;
          font-weight: 600;
          padding: 0.8rem 1.4rem;
          border-radius: 999px;
          text-decoration: none;
        }

        .nava-hero-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 1rem;
        }

        .nava-hero-card {
          background: rgba(248, 250, 252, 0.08);
          border: 1px solid rgba(248, 250, 252, 0.12);
          border-radius: 18px;
          padding: 1rem;
        }

        .nava-hero-card img {
          width: 100%;
          border-radius: 14px;
          display: block;
          height: 180px;
          object-fit: cover;
        }

        .nava-hero-card h4 {
          margin: 0.8rem 0 0.2rem;
          font-size: 1rem;
          color: #f8fafc;
        }

        .nava-hero-card p {
          margin: 0;
          font-size: 0.85rem;
          color: rgba(248, 250, 252, 0.7);
        }

        .nava-stats {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 1rem;
          margin-top: 1.5rem;
        }

        .nava-stat {
          background: rgba(15, 23, 42, 0.6);
          border: 1px solid rgba(148, 163, 184, 0.2);
          border-radius: 14px;
          padding: 0.9rem 1rem;
          text-align: left;
        }

        .nava-stat span {
          display: block;
          font-size: 1.4rem;
          font-weight: 700;
        }

        .nava-stat small {
          color: rgba(248, 250, 252, 0.7);
        }

        .nava-highlights {
          margin: 0 2rem 2rem;
        }

        .nava-highlight-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 1rem;
        }

        .nava-highlight-card {
          background: var(--nava-cloud);
          border-radius: 16px;
          padding: 1rem;
          box-shadow: 0 10px 25px rgba(15, 23, 42, 0.08);
        }

        .nava-highlight-card img {
          width: 100%;
          height: 130px;
          border-radius: 12px;
          object-fit: cover;
          margin-bottom: 0.7rem;
        }

        .nava-highlight-card h5 {
          font-size: 1rem;
          margin-bottom: 0.3rem;
          color: var(--nava-ink);
        }

        .nava-highlight-card p {
          font-size: 0.85rem;
          color: #64748b;
        }



        .nava-topbar {
          background: #6d2735;
          color: #fef7e7;
          font-size: 0.8rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.35rem 2rem;
        }

        .nava-topbar span {
          letter-spacing: 0.04em;
        }

        .nava-topbar-right {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .nava-header {
          background: #ffffff;
          border-bottom: 1px solid rgba(120, 91, 58, 0.18);
          padding: 1rem 2rem;
          display: grid;
          grid-template-columns: 1.2fr 2fr 1fr;
          align-items: center;
          gap: 1rem;
        }

        .nava-brand {
          display: flex;
          flex-direction: column;
          font-weight: 700;
          color: #b8893b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-size: 1.1rem;
        }

        .nava-brand small {
          color: #705a46;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
        }

        .nava-search {
          display: flex;
          border: 1px solid rgba(120, 91, 58, 0.18);
          border-radius: 999px;
          overflow: hidden;
          background: #fffdf8;
        }

        .nava-search input {
          flex: 1;
          border: none;
          padding: 0.65rem 1rem;
          background: transparent;
          font-size: 0.9rem;
        }

        .nava-search button {
          border: none;
          background: #6d2735;
          color: #fffdf8;
          padding: 0 1rem;
        }

        .nava-icons {
          display: flex;
          justify-content: flex-end;
          gap: 1rem;
          font-size: 0.9rem;
          color: #5c4632;
        }

        .nava-nav {
          display: flex;
          gap: 1.5rem;
          justify-content: center;
          padding: 0.65rem 2rem;
          background: #fffdf8;
          border-bottom: 1px solid rgba(120, 91, 58, 0.18);
          font-size: 0.9rem;
        }

        .nava-nav a {
          text-decoration: none;
          color: #5c4632;
          font-weight: 500;
        }

        .nava-hero {
          margin: 0 2rem 2rem;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          min-height: 420px;
          background: url(${heroImage}) center/cover no-repeat;
          display: flex;
          align-items: center;
        }

        .nava-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(31, 26, 23, 0.6), rgba(31, 26, 23, 0.1));
        }

        .nava-admin-link {
          display: inline-flex;
          align-items: center;
          gap: 0.4rem;
          border: 1px solid rgba(255, 253, 248, 0.4);
          border-radius: 999px;
          padding: 0.2rem 0.65rem;
          color: #fff7e6;
          text-decoration: none;
          font-size: 0.78rem;
          font-weight: 600;
        }

        .nava-admin-link span {
          width: 22px;
          height: 22px;
          border-radius: 999px;
          background: rgba(255, 247, 230, 0.2);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          font-size: 0.7rem;
        }

        .nava-hero-content {
          position: relative;
          z-index: 1;
          padding: 3rem;
          max-width: 520px;
          color: #fffdf8;
        }

        .nava-hero-content span {
          text-transform: uppercase;
          letter-spacing: 0.18em;
          font-size: 0.7rem;
        }

        .nava-hero-content h1 {
          margin: 0.8rem 0 1rem;
          font-size: 2.6rem;
          font-weight: 700;
          line-height: 1.15;
        }

        .nava-hero-content p {
          font-size: 1rem;
          color: rgba(255, 253, 248, 0.85);
        }

        .nava-hero-content a {
          display: inline-flex;
          margin-top: 1.5rem;
          padding: 0.65rem 1.5rem;
          border-radius: 999px;
          background: #b8893b;
          color: #2b2117;
          font-weight: 600;
          text-decoration: none;
        }

        .shop-container {
          padding: 0 2rem 2rem;
        }

        .main-content {
          flex: 1;
        }

        .category-bar {
          display: flex;
          gap: 0.75rem;
          overflow-x: auto;
          padding: 0.5rem 0 1rem;
          margin-bottom: 1.5rem;
        }

        .category-pill {
          border: 1px solid rgba(120, 91, 58, 0.25);
          background: #fffdf8;
          color: #5c4632;
          border-radius: 999px;
          padding: 0.45rem 1rem;
          font-size: 0.85rem;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
          transition: all 0.2s ease;
        }

        .category-pill:hover {
          border-color: #b8893b;
          color: #b8893b;
        }

        .category-pill.active {
          background: #6d2735;
          color: #ffffff;
          border-color: #6d2735;
        }

        .category-pill-count {
          background: rgba(109, 39, 53, 0.08);
          border-radius: 999px;
          padding: 0.15rem 0.5rem;
          font-size: 0.75rem;
        }

        .category-pill.active .category-pill-count {
          background: rgba(255, 255, 255, 0.2);
          color: #ffffff;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 600;
          color: #2b2117;
          margin-bottom: 0.5rem;
        }
        
        .category-section {
          margin-bottom: 3rem;
        }
        
        .category-header {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 2px solid #b8893b;
        }
        
        .category-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2b2117;
          margin: 0;
        }
        
        .product-count {
          background: #6d2735;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.875rem;
          margin-left: 1rem;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem;
        }
        
        .search-section {
          text-align: center;
          padding: 2rem;
          background: #fffdf8;
          border-radius: 8px;
          margin-top: 2rem;
          border: 1px solid rgba(120, 91, 58, 0.15);
        }
        
        .search-input {
          width: 100%;
          max-width: 400px;
          padding: 0.75rem 1rem;
          border: 2px solid rgba(120, 91, 58, 0.2);
          border-radius: 25px;
          font-size: 1rem;
          background: #fffdf8;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #b8893b;
        }

        .product-grid-card {
          background: #ffffff;
          border: 1px solid rgba(120, 91, 58, 0.15);
          border-radius: 14px;
          box-shadow: 0 12px 24px rgba(43, 33, 23, 0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .product-grid-top {
          position: relative;
          padding: 1rem;
          background: #fff7ec;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 190px;
        }

        .product-grid-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          background: rgba(184, 137, 59, 0.18);
          color: #6d2735;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 0.2rem 0.55rem;
          border-radius: 999px;
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }

        .product-grid-image {
          height: 100%;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-grid-img {
          max-height: 140px;
          max-width: 100%;
          object-fit: contain;
        }

        .product-grid-body {
          padding: 0.9rem 1rem 1.1rem;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
          flex: 1;
        }

        .product-grid-title {
          font-size: 0.95rem;
          font-weight: 600;
          color: #2b2117;
          margin: 0;
        }

        .product-grid-meta {
          font-size: 0.75rem;
          margin: 0;
        }

        .product-grid-price span {
          font-size: 0.95rem;
          font-weight: 700;
          color: #6d2735;
        }

        .product-grid-actions {
          margin-top: 0.6rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 0.5rem;
        }
        
        /* Mobile Responsive Styles */
        @media (max-width: 768px) {
          .nava-topbar {
            padding: 0.35rem 1rem;
            flex-direction: column;
            gap: 0.25rem;
          }

          .nava-header {
            padding: 1rem;
            grid-template-columns: 1fr;
            text-align: center;
          }

          .nava-search {
            width: 100%;
          }

          .nava-icons {
            justify-content: center;
          }

          .nava-nav {
            flex-wrap: wrap;
            gap: 1rem;
            padding: 0.6rem 1rem;
          }

          .nava-hero {
            margin: 0 1rem 1.5rem;
          }

          .nava-hero-content {
            padding: 2.2rem;
          }

          .nava-hero-content h1 {
            font-size: 2rem;
          }
          .nava-hero {
            margin: 1rem 1rem 1.5rem;
            padding: 6rem 1.5rem 3rem;
          }

          .nava-hero-content {
            grid-template-columns: 1fr;
          }

          .nava-hero h1 {
            font-size: 2.2rem;
          }


          .nava-hero-grid {
            grid-template-columns: 1fr;
          }

          .nava-highlights {
            margin: 0 1rem 1.5rem;
          }

          .nava-highlight-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }



          .shop-container {
            padding: 0 1rem 1.5rem;
          }
          
          .section-title {
            font-size: 1.5rem;
          }
          
          .category-title {
            font-size: 1.25rem;
          }
          
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
            gap: 1rem;
          }
          
          .search-section {
            padding: 1.5rem;
          }
          
          .search-input {
            max-width: 100%;
          }
        }
        
        @media (max-width: 576px) {
          .nava-hero {
            margin: 0 0.5rem 1.25rem;
          }

          .shop-container {
            padding: 0 1rem 1.5rem;
          }

          .nava-highlight-grid {
            grid-template-columns: 1fr;
          }


          .nava-stats {
            grid-template-columns: 1fr;
          }


          .shop-container {
            padding: 0.5rem;
          }
          
          .section-title {
            font-size: 1.25rem;
          }
          
          .category-title {
            font-size: 1.1rem;
          }
          
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
            gap: 0.75rem;
          }
          
          .search-section {
            padding: 1rem;
          }
          
          .category-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
          .product-count {
            margin-left: 0;
            align-self: flex-start;
          }
        }
      `}</style>

      <div className="nava-topbar">
        <span>Free shipping on orders in Navathaniya</span>
        <div className="nava-topbar-right">
          <span>Need help? +91 98765 43210</span>
          <a className="nava-admin-link" href="/admin/login" aria-label="Admin login">
            <span>ADM</span>
            Admin
          </a>
        </div>
      </div>
      <div className="nava-header">
        <div className="nava-brand">
          Navathaniya
          <small>Tradition Meets Everyday</small>
        </div>
        <div className="nava-search">
          <input type="text" placeholder="Search products..." />
          <button type="button">Search</button>
        </div>
        {/* <div className="nava-icons">
          <span>Account</span>
          <span>Wishlist</span>
          <span>Cart</span>
        </div> */}
      </div>
      <nav className="nava-nav">
        <a href="/">Home</a>
        <a href="#shop">Shop</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </nav>

      <section className="nava-hero">
        <div className="nava-hero-content">
          <span>Welcome to Navathaniya</span>
          <h1>Tradition meets everyday essentials.</h1>
          <p>
            Explore garments, kitchenware, electricals, and traditional items curated
            for Navathaniya homes.
          </p>
          <a href="#shop">Shop Now</a>
        </div>
      </section>

      <div className="shop-container" id="shop">
        <div className="main-content">
          <div className="category-bar">
            <button
              className={`category-pill ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              All
              <span className="category-pill-count">{allProducts.length}</span>
            </button>
            {Object.entries(productsByCategory)
              .filter(([categoryName, products]) => categoryName !== "Uncategorized" && products.length > 0)
              .map(([categoryName, products]) => (
                <button
                  key={categoryName}
                  className={`category-pill ${selectedCategory === categoryName ? "active" : ""}`}
                  onClick={() => setSelectedCategory(categoryName)}
                >
                  {categoryName}
                  <span className="category-pill-count">{products.length}</span>
                </button>
              ))}
          </div>
          {/* Single Category View */}
          {selectedCategory !== "all" && productsByCategory[selectedCategory] && (
            <div className="category-section">
              <div className="category-header">
                <h2 className="category-title">{selectedCategory}</h2>
                <span className="product-count">{productsByCategory[selectedCategory].length} products available</span>
              </div>
              <div className="products-grid">
                {productsByCategory[selectedCategory].map((product, i) => (
                  <div key={i}>
                    <Card product={product} />
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* All Categories View */}
          {selectedCategory === "all" && (
            <div>
              {Object.entries(productsByCategory)
                .filter(([categoryName, products]) => categoryName !== "Uncategorized" && products.length > 0)
                .map(([categoryName, products]) => (
                  <div key={categoryName} className="category-section">
                    <div className="category-header">
                      <h3 className="category-title">{categoryName}</h3>
                      <span className="product-count">{products.length} products available</span>
                    </div>
                    <div className="products-grid">
                      {products.map((product, i) => (
                        <div key={i}>
                          <Card product={product} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          )}
          
          {/* Search Section */}
          <div className="search-section">
            <h3>Looking for something specific?</h3>
            <p>Search across all our products</p>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
