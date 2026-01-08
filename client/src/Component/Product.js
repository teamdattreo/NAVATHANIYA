import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { read, getProducts } from "./api";
import Card from "./Card";
import ShowImage from "./ShowImage";
import heroImage from "../img/hero.png";

const Product = (props) => {
  const [product, setProduct] = useState({});
  const [error, setError] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const getCategoryTiles = () => {
    const tiles = new Map();
    if (product && product.category) {
      const key = product.category._id || product.category.name;
      tiles.set(key, { label: product.category.name || "Category", item: product });
    }
    relatedProducts.forEach((item) => {
      if (!item || !item.category) {
        return;
      }
      const key = item.category._id || item.category.name;
      if (!tiles.has(key)) {
        tiles.set(key, { label: item.category.name || "Category", item });
      }
    });
    return Array.from(tiles.values());
  };

  const getCategoryGroups = () => {
    const groups = new Map();
    const addItem = (item) => {
      if (!item || !item.category) {
        return;
      }
      const key = item.category._id || item.category.name || "General";
      if (!groups.has(key)) {
        groups.set(key, { name: item.category.name || "General", items: [] });
      }
      const group = groups.get(key);
      if (!group.items.find((entry) => entry._id === item._id)) {
        group.items.push(item);
      }
    };

    addItem(product);
    relatedProducts.forEach(addItem);
    return Array.from(groups.values()).map((group) => ({
      ...group,
      items: group.items.filter((item) => item._id !== product._id).slice(0, 8),
    }));
  };

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
          margin: 0 2rem 2rem;
          border-radius: 22px;
          overflow: hidden;
          position: relative;
          min-height: 200px;
          background: url(${heroImage}) center/cover no-repeat;
          display: flex;
          align-items: center;
        }

        .product-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, rgba(31, 26, 23, 0.75), rgba(31, 26, 23, 0.1));
        }

        .product-hero-content {
          position: relative;
          z-index: 1;
          padding: 2.5rem;
          color: #fffdf8;
          max-width: 600px;
        }

        .product-hero-content span {
          text-transform: uppercase;
          letter-spacing: 0.2em;
          font-size: 0.7rem;
          color: rgba(255, 253, 248, 0.8);
        }

        .product-hero-content h1 {
          margin: 0.6rem 0 0;
          font-size: 2.1rem;
          font-weight: 700;
        }

        .product-wrapper {
          padding: 0 2rem 2.5rem;
          display: flex;
          justify-content: center;
        }

        .product-detail-card {
          width: min(980px, 100%);
          background: #fffdf8;
          border: 1px solid rgba(120, 91, 58, 0.18);
          border-radius: 20px;
          padding: 2rem;
          box-shadow: 0 16px 32px rgba(43, 33, 23, 0.12);
        }

        .product-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
          gap: 2rem;
          align-items: start;
        }

        .product-media {
          background: #f5efe7;
          border-radius: 18px;
          padding: 2rem;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 360px;
          position: relative;
        }

        .product-media::after {
          content: "";
          position: absolute;
          right: 18px;
          top: 18px;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          border: 1px solid rgba(120, 91, 58, 0.3);
        }

        .product-info h2 {
          font-size: 2rem;
          font-weight: 700;
          color: #2b2117;
          margin-bottom: 0.6rem;
        }

        .product-info .product-price {
          font-size: 1.4rem;
          font-weight: 700;
          color: #6d2735;
          margin-bottom: 0.75rem;
        }

        .product-info p {
          color: #5c4632;
          line-height: 1.6;
        }

        .product-divider {
          margin: 1.5rem 0;
          height: 1px;
          background: rgba(120, 91, 58, 0.2);
        }

        .product-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
        }

        .product-qty {
          width: 70px;
          border: 1px solid rgba(120, 91, 58, 0.3);
          border-radius: 10px;
          padding: 0.45rem 0.6rem;
          background: #fffdf8;
        }

        .product-buy {
          flex: 1;
          border: none;
          padding: 0.6rem 1rem;
          border-radius: 10px;
          background: #6d2735;
          color: #fffdf8;
          font-weight: 600;
        }

        .product-meta {
          margin-top: 1.25rem;
          font-size: 0.9rem;
          color: #6b5845;
        }

        .related-section {
          margin-top: 2.5rem;
        }

        .related-title {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2b2117;
          margin-bottom: 1rem;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
          gap: 1.25rem;
        }

        .category-gallery {
          margin-top: 2.5rem;
        }

        .category-gallery h3 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #2b2117;
          margin-bottom: 1rem;
        }

        .category-gallery-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
        }

        .category-gallery-card {
          background: #fff7ec;
          border: 1px solid rgba(120, 91, 58, 0.18);
          border-radius: 16px;
          padding: 1rem;
          text-align: center;
        }

        .category-gallery-card .product-grid-image {
          height: 120px;
        }

        .category-gallery-card h4 {
          margin-top: 0.75rem;
          font-size: 0.95rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #5c4632;
        }

        @media (max-width: 900px) {
          .product-grid {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .product-hero {
            margin: 0 1rem 1.5rem;
          }

          .product-hero-content {
            padding: 2rem;
          }

          .product-hero-content h1 {
            font-size: 1.8rem;
          }

          .product-wrapper {
            padding: 0 1rem 2rem;
          }

          .related-grid {
            grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          }

          .category-gallery-grid {
            grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
          }
        }

        @media (max-width: 576px) {
          .product-hero {
            margin: 0 0.5rem 1.25rem;
          }

          .product-wrapper {
            padding: 0 0.75rem 1.5rem;
          }

          .related-grid {
            grid-template-columns: 1fr;
          }

          .category-gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <section className="product-hero">
        <div className="product-hero-content">
          <span>Product details</span>
          <h1>{product && product.name ? product.name : "Loading product..."}</h1>
        </div>
      </section>

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
                  <div className="product-divider"></div>
                  <div className="product-actions">
                    <input type="number" min="1" defaultValue="1" className="product-qty" />
                    <button type="button" className="product-buy">Add to Cart</button>
                  </div>
                  <div className="product-meta">
                    Categories: {product.category ? product.category.name : "General"}
                  </div>
                </div>
              </div>
              {/* {relatedProducts.length > 0 && (
                <div className="related-section">
                  <h3 className="related-title">Related Products</h3>
                  <div className="related-grid">
                    {relatedProducts.map((item) => (
                      <Card key={item._id} product={item} />
                    ))}
                  </div>
                </div>
              )} */}
            </>
          )}
        </div>
      </div>
      {getCategoryGroups().length > 0 && (
        <div className="category-gallery product-wrapper">
          <div className="product-detail-card">
            {/* <h3>More from these categories</h3> */}
            {getCategoryGroups().map((group) => (
              <div key={group.name} className="related-section">
                <h3 className="related-title">{group.name}</h3>
                {group.items.length > 0 ? (
                  <div className="related-grid">
                    {group.items.map((item) => (
                      <Card key={item._id} product={item} />
                    ))}
                  </div>
                ) : (
                  <p className="product-meta">No other products available.</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Product;
