import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import ShowImage from "./ShowImage";
import moment from "moment";

const Card = ({ product, showViewProductButton = true }) => {
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) =>
    showViewProductButton && (
      <Link to={`/product/${product._id}`} className="mr-2">
        <button className="btn btn-orange mt-2 mb-2">View Product</button>
      </Link>
    );

  const showStock = (quantity) =>
    quantity > 0 ? (
      <span className="badge badge-pill in-stock">In Stock</span>
    ) : (
      <span className="badge badge-pill out-stock">Out of Stock</span>
    );

  return (
    <div className="card product-card h-100">
      <div className="card-header name text-uppercase font-weight-bold text-orange">
        {product.name}
      </div>
      <div className="card-body d-flex flex-column">
        <ShowImage item={product} url="product" />
        <p className="lead mt-2 text-muted">{product.description.substring(0, 100)}</p>
        <p className="price display-6 text-orange">Rs.{product.price}</p>
        {/* <p className="text-muted small mb-1">Category: {product.category && product.category.name}</p> */}
        <p className="text-muted small mb-2">Added {moment(product.createdAt).fromNow()}</p>

        <div className="tag-row mb-2">
          {/* <div className="mr-2 small text-muted">Tags:</div> */}
          {product.tags && product.tags.map((tag, idx) => (
            <span key={idx} className="badge badge-pill tag-badge mr-2">{tag}</span>
          ))}
        </div>

        {showStock(product.quantity)}

        <div className="mt-auto">{showViewButton(showViewProductButton)}</div>
      </div>
    </div>
  );
};

export default Card;
