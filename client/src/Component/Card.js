import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({ product, showViewProductButton = true }) => {
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) =>
    showViewProductButton && (
      <Link to={`/product/${product._id}`} className="btn btn-outline-dark btn-sm mt-2">
        View Product
      </Link>
    );

  const showStock = (quantity) =>
    quantity > 0 ? (
      <span className="badge badge-pill in-stock">In Stock</span>
    ) : (
      <span className="badge badge-pill out-stock">Out of Stock</span>
    );

  return (
    <div className="product-grid-card h-100">
      <div className="product-grid-top">
        {product.quantity > 0 && <span className="product-grid-badge">Sale</span>}
        <ShowImage item={product} url="product" />
      </div>
      <div className="product-grid-body">
        <h5 className="product-grid-title">{product.name}</h5>
        <p className="product-grid-meta text-muted">
          Added {moment(product.createdAt).fromNow()}
        </p>
        <div className="product-grid-price">
          <span>Rs.{product.price}</span>
        </div>
        <div className="product-grid-actions">
          {showViewButton(showViewProductButton)}
          {showStock(product.quantity)}
        </div>
      </div>
    </div>
  );
};

export default Card;
