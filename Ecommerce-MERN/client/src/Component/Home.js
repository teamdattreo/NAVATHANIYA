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
      className="container-fluid px-0"
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 1;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hero-section {
          background: linear-gradient(135deg, rgba(46, 125, 50, 0.7) 0%, rgba(56, 142, 60, 0.7) 50%, rgba(67, 160, 71, 0.7) 100%),
                      url('/img/img.png') center/cover;
          color: white;
          padding: 5rem 0;
          position: relative;
          background-attachment: fixed;
        }
        
        .hero-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
        }
        
        .hero-subtitle {
          font-size: 1.25rem;
          opacity: 0.90;
          margin-bottom: 2rem;
        }
        
        .category-card {
          background: white;
          border-radius: 1rem;
          box-shadow: 0 4px 15px rgba(0,0,0,0.08);
          border: 1px solid #f0f0f0;
          transition: all 0.3s ease;
          cursor: pointer;
        }
        
        .category-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 25px rgba(46, 125, 50, 0.15);
        }
        
        .category-icon {
          width: 60px;
          height: 60px;
          background: #f8f9fa;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto;
        }
        
        .category-title {
          font-weight: 600;
          color: #2c3e50;
          font-size: 1.5rem;
        }
        
        .category-subtitle {
          font-size: 0.875rem;
          line-height: 1.4;
        }
        
        .category-section {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          margin-bottom: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
        }
        
        .category-divider {
          height: 2px;
          background: linear-gradient(90deg, #2E7D32 0%, #43A047 100%);
          border-radius: 1px;
          margin-top: 1rem;
        }
        
        .category-badge .badge {
          font-size: 1rem;
          padding: 0.5rem 1rem;
        }
        
        .pagination-controls {
          margin-top: 2rem;
        }
        
        .page-numbers .btn {
          min-width: 40px;
          height: 40px;
          padding: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .pagination-controls .btn:disabled {
          opacity: 1;
          cursor: not-allowed;
        }
        
        .category-filter {
          background: white;
          border-radius: 1rem;
          padding: 2rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          margin-bottom: 3rem;
        }
        
        .filter-title {
          font-size: 1.5rem;
          font-weight: 600;
          color: #2c3e50;
          margin-bottom: 0.5rem;
        }
        
        .category-filter-btn {
          background: #f8f9fa;
          border: 2px solid #e9ecef;
          border-radius: 2rem;
          padding: 0.75rem 1.5rem;
          font-weight: 500;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
        }
        
        .category-filter-btn:hover {
          background: #e9ecef;
          border-color: #2E7D32;
          transform: translateY(-2px);
        }
        
        .category-filter-btn.active {
          background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
          border-color: #2E7D32;
          color: white;
        }
        
        .category-filter-btn .badge {
          background: rgba(255,255,255,0.2);
          color: inherit;
        }
        
        .category-filter-btn.active .badge {
          background: rgba(255,255,255,0.3);
          color: white;
        }
        
        .products-section {
          padding: 3rem 0;
          background: #f8f9fa;
        }
        
        .section-header {
          text-align: center;
          margin-bottom: 3rem;
        }
        
        .section-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2c3e50;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          font-size: 1.1rem;
          color: #6c757d;
        }
        
        .search-bar {
          max-width: 600px;
          margin: 0 auto 3rem;
        }
        
        .search-input {
          border-radius: 2rem;
          padding: 1rem 1.5rem;
          border: 2px solid #e9ecef;
          font-size: 1rem;
        }
        
        .search-input:focus {
          border-color: #2E7D32;
          box-shadow: 0 0 0 0.2rem rgba(46, 125, 50, 0.25);
        }
        
        @media (max-width: 768px) {
          .hero-section {
            padding: 3rem 0;
          }
          
          .hero-title {
            font-size: 2.5rem !important;
          }
          
          .hero-subtitle {
            font-size: 1rem !important;
          }
        }
      `}</style>
      
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6">
              <h1 className="hero-title">
                NAVATHANIYA
              </h1>
              <p className="hero-subtitle">
                Quality Garments, Electrical Goods, Kitchen Items & Traditional Products
              </p>
              <div className="hero-buttons">
                {/* <button className="btn btn-light btn-lg me-3">
                  <i className="bi bi-shopping-bag me-2"></i>
                  Start Shopping
                </button>
                <button className="btn btn-outline-light btn-lg">
                  <i className="bi bi-info-circle me-2"></i>
                  Learn More
                </button> */}
              </div>
            </div>
            <div className="col-lg-6">
              {/* Empty column for layout balance */}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        {/* Loading State */}
        {loading && (
          <div className="text-center py-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-2">Loading products...</p>
          </div>
        )}
        
        {/* Category Filter */}
        {!loading && Object.keys(productsByCategory).length > 0 && (
          <CategoryFilter />
        )}
        
        {/* Single Category View */}
        {!loading && selectedCategory !== "all" && productsByCategory[selectedCategory] && (
          <div className="single-category-view">
            <CategorySection 
              categoryName={selectedCategory} 
              products={productsByCategory[selectedCategory]} 
              index={0}
            />
          </div>
        )}
        
        {/* All Categories View */}
        {!loading && selectedCategory === "all" && Object.keys(productsByCategory).length > 0 && (
          <div className="products-by-category">
            <div className="text-center mb-5">
              <h2 className="section-title">
                <i className="bi bi-grid-3x3-gap-fill me-2" style={{ color: '#2E7D32' }}></i>
                Shop by Category
              </h2>
              <p className="section-subtitle">
                Browse our products organized by categories
              </p>
            </div>
            
            {/* Show all categories including Uncategorized */}
            {Object.entries(productsByCategory).map(([categoryName, products], index) => (
              <CategorySection 
                key={categoryName} 
                categoryName={categoryName} 
                products={products} 
                index={index}
              />
            ))}
          </div>
        )}
        
        {/* Fallback: Show all products if no categories */}
        {!loading && Object.keys(productsByCategory).length === 0 && productsByArrival.length > 0 && (
          <div className="all-products-section">
            <div className="text-center mb-5">
              <h2 className="section-title">
                <i className="bi bi-star-fill text-warning me-2"></i>
                All Products
              </h2>
              <p className="section-subtitle">
                Browse our complete product collection
              </p>
            </div>
            
            <div className="row">
              {productsByArrival.map((product, i) => (
                <div key={i} className="col-xs-10 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <Card product={product} />
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Search Results */}
        {searchTerm && (
          <div className="search-results-section">
            <div className="text-center mb-4">
              <h3 className="search-title">
                <i className="bi bi-search me-2"></i>
                Search Results for "{searchTerm}"
              </h3>
              <p className="text-muted">
                {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="row">
              {filteredProducts.map((product, i) => (
                <div key={i} className="col-xs-10 col-sm-6 col-md-4 col-lg-3 mb-4">
                  <Card product={product} />
                </div>
              ))}
            </div>
            
            {filteredProducts.length === 0 && !error && (
              <div className="text-center py-5">
                <i className="bi bi-search" style={{ fontSize: '3rem', color: '#6c757d' }}></i>
                <h4 className="text-muted mt-3">No products found</h4>
                <p className="text-muted">Try adjusting your search terms</p>
              </div>
            )}
          </div>
        )}
        
        {/* Search Bar */}
        {!searchTerm && !loading && (
          <div className="search-bar-section">
            <div className="text-center mb-4">
              <h3 className="search-title">Looking for something specific?</h3>
              <p className="text-muted">Search across all our products</p>
            </div>
            <div className="search-bar">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control search-input"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="btn btn-primary" type="button">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className="alert alert-danger">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {error}
          </div>
        )}
        
        {/* Empty State */}
        {!loading && Object.keys(productsByCategory).length === 0 && !error && (
          <div className="text-center py-5">
            <i className="bi bi-box-seam" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
            <h3 className="text-muted mt-3">No products available</h3>
            <p className="text-muted">Check back later for new products</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Home;
