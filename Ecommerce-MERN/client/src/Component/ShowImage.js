import React from "react";
import { API } from "../config";

const ShowImage = ({ item, url }) => {
  const src = item.photos && item.photos.length > 0 ? item.photos[0].url : `${API}/${url}/photo/${item._id}`;
  return (
    <div className="product-img">
      <img
        src={src}
        alt={item.name}
        className="mb-3"
        style={{ height: "200px", maxWidth: "100%", objectFit: "contain" }}
      />
    </div>
  );
};

export default ShowImage;
