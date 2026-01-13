const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const Product = require("../models/product");
const { errorHandler } = require("../helpers/dbErrorHandler");
const cloudinary = require("cloudinary").v2;

exports.productById = (req, res, next, id) => {
  Product.findById(id)
    .populate("category")
    .populate("subcategory")
    .exec((err, product) => {
      if (err || !product) {
        return res.status(400).json({
          error: "Product not found",
        });
      }
      req.product = product;
      next();
    });
};

exports.read = (req, res) => {
  // Hide binary Buffer photo data from API responses (legacy)
  if (req.product && req.product.photo) req.product.photo = undefined;
  return res.json(req.product);
};

exports.create = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }

    try {
      let product = new Product(fields);

      // normalize tags: accept comma string or array
      if (product.tags && typeof product.tags === "string") {
        product.tags = product.tags.split(",");
      } else if (!product.tags) {
        product.tags = [];
      }

      // If an image file was provided, upload to Cloudinary and save metadata
      if (files.photo) {
        if (files.photo.size > 10 * 1024 * 1024) {
          return res.status(400).json({ error: "Image should be less than 10MB in size" });
        }

        const uploadResult = await cloudinary.uploader.upload(files.photo.path, { folder: "products" });

        product.photos = [
          {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            contentType: files.photo.type,
          },
        ];
      }

      product.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json(result);
      });
    } catch (uploadErr) {
      return res.status(400).json({ error: "Image upload failed", details: uploadErr.message });
    }
  });
};

exports.remove = (req, res) => {
  let product = req.product;
  product.remove((err, deletedProduct) => {
    if (err) {
      return res.status(400).json({
        error: errorHandler(err),
      });
    }
    res.json({
      message: "Product deleted successfully",
    });
  });
};

exports.update = (req, res) => {
  let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, async (err, fields, files) => {
    if (err) {
      return res.status(400).json({ error: "Image could not be uploaded" });
    }

    try {
      let product = req.product;
      product = _.extend(product, fields);

      if (product.tags && typeof product.tags === "string") {
        product.tags = product.tags.split(",");
      }

      if (files.photo) {
        if (files.photo.size > 10 * 1024 * 1024) {
          return res.status(400).json({ error: "Image should be less than 10MB in size" });
        }

        // If an old Cloudinary image exists, attempt to remove it
        if (product.photos && product.photos.length > 0 && product.photos[0].public_id) {
          try {
            await cloudinary.uploader.destroy(product.photos[0].public_id);
          } catch (delErr) {
            console.error("Failed to remove old image from Cloudinary:", delErr.message);
          }
        }

        const uploadResult = await cloudinary.uploader.upload(files.photo.path, { folder: "products" });

        product.photos = [
          {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id,
            contentType: files.photo.type,
          },
        ];
      }

      product.save((err, result) => {
        if (err) {
          return res.status(400).json({ error: errorHandler(err) });
        }
        res.json(result);
      });
    } catch (uploadErr) {
      return res.status(400).json({ error: "Image upload failed", details: uploadErr.message });
    }
  });
};

exports.list = (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 30;

  Product.find()
    .select("-photo")
    .populate("category")
    .populate("subcategory")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, products) => {
      if (err) {
        return res.status(400).json({
          error: "Products not found",
        });
      }
      res.json(products);
    });
};

// legacy photo route: still serve Buffer if present; otherwise client should use product.photos[0].url
exports.photo = (req, res, next) => {
  if (req.product && req.product.photo && req.product.photo.data) {
    res.set("Content-Type", req.product.photo.contentType);
    return res.send(req.product.photo.data);
  }
  next();
};

exports.listSearch = (req, res) => {
  const query = {};
  if (req.query.search) {
    query.name = { $regex: req.query.search, $options: "i" };
    if (req.query.category && req.query.category != "All") {
      query.category = req.query.category;
    }
    Product.find(query, (err, products) => {
      if (err) {
        return res.status(400).json({
          error: errorHandler(err),
        });
      }
      res.json(products);
    }).select("-photo");
  }
};
