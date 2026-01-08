import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import { getProducts, deleteProduct } from "./api";
import adminImage from "../img/admin.png";

const ManageProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  const loadProducts = () => {
    setLoading(true);
    setError("");
    getProducts().then((data) => {
      if (data.error) {
        setError(data.error);
        console.log(data.error);
      } else {
        // Handle paginated response structure
        const productList = data.products || data;
        setProducts(productList);
        setFilteredProducts(productList);
      }
      setLoading(false);
    }).catch(err => {
      setError("Failed to load products");
      console.log(err);
      setLoading(false);
    });
  };

  useEffect(() => {
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const destroy = (productId) => {
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }
    
    setDeleteLoading(productId);
    deleteProduct(productId).then((data) => {
      setDeleteLoading(null);
      if (data.error) {
        setError(data.error);
        console.log(data.error);
      } else {
        loadProducts();
      }
    }).catch(err => {
      setError("Failed to delete product");
      console.log(err);
      setDeleteLoading(null);
    });
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const showError = () => (
    <div className="alert alert-danger alert-dismissible fade show" role="alert" style={{ display: error ? "" : "none" }}>
      <i className="bi bi-exclamation-triangle-fill me-2"></i>
      {error}
      <button type="button" className="btn-close" onClick={() => setError("")}></button>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="d-flex justify-content-center my-5">
        <div className="nava-loader" role="status" aria-label="Loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );

  const showEmptyState = () => (
    !loading && !error && filteredProducts.length === 0 && (
      <div className="text-center py-5">
        <div className="mb-4">
          <i className="bi bi-box-seam" style={{ fontSize: '4rem', color: '#6c757d' }}></i>
        </div>
        <h4 className="text-muted">No products found</h4>
        <p className="text-muted">
          {searchTerm ? "Try adjusting your search terms" : "Add some products to get started"}
        </p>
        {!searchTerm && (
          <Link to="/create/product" className="btn btn-primary mt-3">
            <i className="bi bi-plus-circle me-2"></i>
            Add Your First Product
          </Link>
        )}
      </div>
    )
  );

  const ProductCard = ({ product, index }) => (
    <div 
      className="col-lg-4 col-md-6 mb-4" 
      style={{ animation: `fadeInUp 0.5s ease-out ${index * 0.1}s both` }}
    >
      <div className="card h-100 shadow-sm hover-card">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start mb-3">
            <div className="flex-grow-1">
              <h5 className="card-title mb-1">{product.name}</h5>
              <p className="text-muted small mb-2">
                <i className="bi bi-tag me-1"></i>
                {product.category?.name || 'Uncategorized'}
              </p>
            </div>
            <span className="badge bg-success rounded-pill">
              ${product.price}
            </span>
          </div>
          
          <p className="card-text text-muted small mb-3">
            {product.description?.substring(0, 100)}
            {product.description?.length > 100 && '...'}
          </p>
          
          <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex gap-2">
              {product.tags?.slice(0, 2).map((tag, i) => (
                <span key={i} className="badge bg-light text-dark">
                  {tag}
                </span>
              ))}
            </div>
            <div className="text-muted small">
              <i className="bi bi-box me-1"></i>
              {product.quantity || 0} in stock
            </div>
          </div>
        </div>
        
        <div className="card-footer bg-transparent border-top">
          <div className="d-flex gap-2">
            <Link 
              to={`/product/update/${product._id}`} 
              className="btn btn-outline-primary btn-sm flex-fill"
            >
              <i className="bi bi-pencil-square me-1"></i>
              Edit
            </Link>
            <button
              onClick={() => destroy(product._id)}
              className="btn btn-outline-danger btn-sm flex-fill"
              disabled={deleteLoading === product._id}
            >
              {deleteLoading === product._id ? (
                <>
                  <span className="nava-loader nava-loader-sm me-1" aria-hidden="true">
                    <span></span>
                    <span></span>
                    <span></span>
                  </span>
                  Deleting...
                </>
              ) : (
                <>
                  <i className="bi bi-trash me-1"></i>
                  Delete
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AdminLayout
      title="Manage Products"
      description="Manage NAVATHANIYA product inventory"
      className="container-fluid py-4"
    >
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .hover-card {
          transition: all 0.3s ease;
        }
        
        .hover-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0,0,0,0.1) !important;
        }
        
        .page-header {
          background: linear-gradient(90deg, rgba(43, 33, 23, 0.85), rgba(43, 33, 23, 0.35)),
            url(${adminImage}) center/cover no-repeat;
          color: #fff7e6;
          padding: 2rem 0;
          margin-bottom: 2rem;
          border-radius: 0.5rem;
        }
        
        .search-box {
          position: relative;
        }
        
        .search-box input {
          padding-left: 2.5rem;
        }
        
        .search-box i {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #6c757d;
        }
      `}</style>
      
      <div className="page-header mb-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <h1 className="mb-2">
                <i className="bi bi-box-seam me-3"></i>
                Product Management
              </h1>
              <p className="mb-0 opacity-75">
                Manage your inventory with ease
              </p>
            </div>
            <div className="col-md-6 text-md-end mt-3 mt-md-0">
              <div className="d-inline-flex gap-2 align-items-center">
                <div className="text-end">
                  <div className="h4 mb-0">{filteredProducts.length}</div>
                  <small className="opacity-75">Total Products</small>
                </div>
                <Link to="/create/product" className="btn btn-primary">
                  <i className="bi bi-plus-circle me-2"></i>
                  Add Product
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="container">
        <div className="row mb-4">
          <div className="col-12">
            <div className="search-box">
              <i className="bi bi-search"></i>
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Search products by name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
        
        {showError()}
        {showLoading()}
        
        {!loading && !error && filteredProducts.length > 0 && (
          <div className="row">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product._id} product={product} index={index} />
            ))}
          </div>
        )}
        
        {showEmptyState()}
      </div>
    </AdminLayout>
  );
};

export default ManageProducts;
