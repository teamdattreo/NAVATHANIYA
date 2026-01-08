import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => {
  const src = item.photos && item.photos.length > 0 ? item.photos[0].url : `${API}/${url}/photo/${item._id}`;
  return (
    <div className="product-grid-image">
      <img
        src={src}
        alt={item.name}
        className="product-grid-img"
      />
    </div>
  );
};

export default ShowImage;
