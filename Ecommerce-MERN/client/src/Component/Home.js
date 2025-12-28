import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { getProducts, getCategories } from "./api";
import Card from "./Card";
import Search from "./Search";

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
      title="ShopHub - Online Shopping"
      description="Find everything you need at great prices"
      className="container-fluid"
    >
      <style>{`
        .shop-container {
          display: flex;
          gap: 2rem;
          padding: 2rem;
        }
        
        .sidebar {
          width: 250px;
          background: #f8f9fa;
          padding: 1.5rem;
          border-radius: 8px;
          height: fit-content;
        }
        
        .sidebar h3 {
          color: #2c3e50;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .category-list {
          list-style: none;
          padding: 0;
        }
        
        .category-item {
          padding: 0.75rem;
          margin-bottom: 0.5rem;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.3s;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .category-item:hover {
          background: #e9ecef;
        }
        
        .category-item.active {
          background: #2E7D32;
          color: white;
        }
        
        .category-count {
          background: rgba(46, 125, 50, 0.1);
          padding: 0.25rem 0.5rem;
          border-radius: 12px;
          font-size: 0.875rem;
        }
        
        .category-item.active .category-count {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .main-content {
          flex: 1;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .section-title {
          font-size: 2rem;
          font-weight: 600;
          color: #2c3e50;
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
          border-bottom: 2px solid #2E7D32;
        }
        
        .category-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2c3e50;
          margin: 0;
        }
        
        .product-count {
          background: #2E7D32;
          color: white;
          padding: 0.25rem 0.75rem;
          border-radius: 15px;
          font-size: 0.875rem;
          margin-left: 1rem;
        }
        
        .products-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 1.5rem;
        }
        
        .search-section {
          text-align: center;
          padding: 2rem;
          background: #f8f9fa;
          border-radius: 8px;
          margin-top: 2rem;
        }
        
        .search-input {
          width: 100%;
          max-width: 400px;
          padding: 0.75rem 1rem;
          border: 2px solid #e9ecef;
          border-radius: 25px;
          font-size: 1rem;
        }
        
        .search-input:focus {
          outline: none;
          border-color: #2E7D32;
        }
      `}</style>
      
      <div className="shop-container">
        {/* Sidebar */}
        <div className="sidebar">
          <h3>Filter by Category</h3>
          <ul className="category-list">
            <li 
              className={`category-item ${selectedCategory === "all" ? "active" : ""}`}
              onClick={() => setSelectedCategory("all")}
            >
              <span>All Categories</span>
              <span className="category-count">{allProducts.length}</span>
            </li>
            {Object.entries(productsByCategory)
              .filter(([categoryName, products]) => categoryName !== "Uncategorized" && products.length > 0)
              .map(([categoryName, products]) => (
                <li
                  key={categoryName}
                  className={`category-item ${selectedCategory === categoryName ? "active" : ""}`}
                  onClick={() => setSelectedCategory(categoryName)}
                >
                  <span>{categoryName}</span>
                  <span className="category-count">{products.length}</span>
                </li>
              ))}
          </ul>
        </div>
        
        {/* Main Content */}
        <div className="main-content">
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
              {/* <div className="section-header">
                <h2 className="section-title">Shop by Category</h2>
                <p>Browse our products organized by categories</p>
              </div> */}
              
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
