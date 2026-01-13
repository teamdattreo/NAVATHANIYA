import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { read, getProducts } from "./api";
import Card from "./Card";
import ShowImage from "./ShowImage";
import heroImage from "../img/hero.png";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getRelatedProducts = () => relatedProducts.slice(0, 8);

  const loadRelatedProducts = (currentProduct) => {
    getProducts(1, 1000).then((data) => {
      if (!data || data.error || !Array.isArray(data)) {
        return;
      }
      const currentCategory =
        currentProduct && currentProduct.category
          ? currentProduct.category._id || currentProduct.category.name
          : null;
      const related = data.filter((item) => {
        if (!item || item._id === currentProduct._id) {
          return false;
        }
        const itemCategory = item.category
          ? item.category._id || item.category.name
          : null;
        return currentCategory && itemCategory === currentCategory;
      });
      setRelatedProducts(related.slice(0, 8));
    });
  };

  const loadSingleProduct = (productId) => {
    read(productId).then((data) => {
      if (data.error) {
        setError(data.error);
      } else {
        setProduct(data);
        loadRelatedProducts(data);
      }
    });
  };

  useEffect(() => {
    const productId = props.match.params.productId;
    loadSingleProduct(productId);
  }, [props]);

  return (
    <Layout
      title={product && product.name}
      description={
        product && product.description && product.description.substring(0, 100)
      }
      className="container-fluid"
    >
      <style>{`
        .product-hero {
          margin: 0;
          min-height: 140px;
          background: linear-gradient(135deg, rgba(181, 139, 70, 0.25), rgba(107, 74, 45, 0.15));
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .product-hero-content {
          padding: 2rem 1.5rem;
          text-align: center;
          color: #4b3826;
        }

        .product-hero-content span {
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.7rem;
          color: rgba(75, 56, 38, 0.7);
        }

        .product-hero-content h1 {
          margin: 0.5rem 0 0;
          font-size: 2rem;
          font-weight: 700;
        }

        .product-wrapper {
          padding: 0 1rem 1.75rem;
          display: flex;
          justify-content: center;
          background: #f7f1e3;
        }

        .product-detail-card {
          width: min(820px, 100%);
          background: #fdf6e6;
          border: 1px solid rgba(181, 139, 70, 0.2);
          border-radius: 18px;
          padding: 1.25rem;
          box-shadow: 0 22px 36px rgba(43, 33, 23, 0.12);
        }

        .product-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
          gap: 1.5rem;
          align-items: start;
        }

        .product-media {
          background: #efe5d3;
          border-radius: 14px;
          padding: 1rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 220px;
        }

        .product-info h2 {
          font-size: 1.35rem;
          font-weight: 700;
          color: #4b3826;
          margin-bottom: 0.4rem;
        }

        .product-info .product-price {
          font-size: 0.95rem;
          font-weight: 700;
          color: #6b4a2d;
          margin-bottom: 0.75rem;
        }

        .product-info p {
          color: #5c4632;
          line-height: 1.6;
          font-size: 0.95rem;
        }

        .product-meta {
          margin-top: 1.25rem;
          font-size: 0.9rem;
          color: #6b5845;
        }

        .related-section {
          margin-top: 2rem;
        }

        .related-title {
          font-size: 1.05rem;
          font-weight: 700;
          color: #4b3826;
          margin-bottom: 1rem;
          text-align: center;
        }

        .related-title span {
          display: inline-block;
          padding-bottom: 0.35rem;
          border-bottom: 2px solid rgba(181, 139, 70, 0.6);
        }

        .recommended-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .recommended-grid .product-grid-card {
          height: 100%;
        }

        .recommended-card h4 {
          margin: 0.75rem 0 0;
          font-size: 0.85rem;
          color: #4b3826;
        }

        .recommended-meta {
          font-size: 0.8rem;
          color: #6b5845;
        }

        .recommended-price {
          display: inline-block;
          margin-top: 0.25rem;
          font-weight: 700;
          color: #6b4a2d;
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .product-hero-content h1 {
            font-size: 1.6rem;
          }

          .product-wrapper {
            padding: 0 1rem 2rem;
          }

          .recommended-grid {
            grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          }
        }

        @media (max-width: 576px) {
          .product-wrapper {
            padding: 0 0.75rem 1.5rem;
          }

          .recommended-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* <section className="product-hero">
        <div className="product-hero-content">
          <span>Product details</span>
          <h1>{product && product.name ? product.name : "Loading product..."}</h1>
        </div>
      </section> */}
<br></br>
      <div className="product-wrapper">
        <div className="product-detail-card">
          {product && product.description && (
            <>
              <div className="product-grid">
                <div className="product-media">
                  <ShowImage item={product} url="product" />
                </div>
                <div className="product-info">
                  <h2>{product.name}</h2>
                  <div className="product-price">Rs.{product.price}</div>
                  <p>{product.description}</p>
                  <div className="product-meta">
                    Categories: {product.category ? product.category.name : "General"}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {getRelatedProducts().length > 0 && (
        <div className="product-wrapper">
          <div className="product-detail-card">
            <div className="related-section">
              <h3 className="related-title">
                <span>Recommended Products</span>
              </h3>
              <div className="recommended-grid">
                {getRelatedProducts().map((item) => (
                  <Card key={item._id} product={item} />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Product;
