import React, { useState, useEffect } from "react";
import Layout from "./Layout";
import { Link, useHistory, useParams } from "react-router-dom";
import { getProduct, getCategories, updateProduct } from "./api";

const UpdateProduct = () => {
  const history = useHistory();
  const { productId } = useParams();
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    categories: [],
    category: "",
    quantity: "",
    tags: [],
    photo: "",
    loading: false,
    error: "",
    success: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    tags,
    quantity,
    photo,
    loading,
    error,
    success,
    formData,
  } = values;

  const init = (productId) => {
    getProduct(productId).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category?._id || data.category,
          tags: data.tags || [],
          quantity: data.quantity,
          formData: new FormData(),
        });
        initCategories();
      }
    });
  };

  const initCategories = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues((prev) => ({ ...prev, categories: data }));
      }
    });
  };

  useEffect(() => {
    init(productId);
  }, [productId]);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const addTag = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value.trim() && !tags.includes(e.target.value.trim())) {
        setValues({ ...values, tags: [...tags, e.target.value.trim()] });
        e.target.value = "";
      }
    }
  };

  const removeTag = (removedTag) => {
    const newTags = tags.filter((el) => el !== removedTag);
    setValues({ ...values, tags: newTags });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, success: false });

    formData.set("tags", tags);
    updateProduct(productId, formData).then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error, loading: false });
      } else {
        setValues({
          ...values,
          loading: false,
          success: true,
          error: "",
        });
        setTimeout(() => {
          history.push("/products");
        }, 2000);
      }
    });
  };

  const showError = () => (
    error && (
      <div className="alert alert-danger alert-dismissible fade show" role="alert">
        <i className="bi bi-exclamation-triangle-fill me-2"></i>
        {error}
        <button
          type="button"
          className="btn-close"
          onClick={() => setValues({ ...values, error: "" })}
        ></button>
      </div>
    )
  );

  const showSuccess = () => (
    success && (
      <div className="alert alert-success alert-dismissible fade show" role="alert">
        <i className="bi bi-check-circle-fill me-2"></i>
        Product updated successfully! Redirecting to products...
        <button
          type="button"
          className="btn-close"
          onClick={() => setValues({ ...values, success: false })}
        ></button>
      </div>
    )
  );

  const showLoading = () =>
    loading && (
      <div className="text-center py-4">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Updating product...</p>
      </div>
    );

  return (
    <Layout
      title="Update Product"
      description="Edit product information"
      className="container-fluid py-4"
    >
      <style>
        {`
          .update-form-container {
            background: white;
            border-radius: 1rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
            padding: 2rem;
            margin-top: 2rem;
          }

          .form-label {
            font-weight: 600;
            color: #2c3e50;
            margin-bottom: 0.5rem;
          }

          .form-control,
          .form-select {
            border: 2px solid #e9ecef;
            border-radius: 0.5rem;
            padding: 0.75rem;
            transition: all 0.3s ease;
          }

          .form-control:focus,
          .form-select:focus {
            border-color: #667eea;
            box-shadow: 0 0 0 0.2rem rgba(102, 126, 234, 0.25);
          }

          .tag-container {
            position: relative;
          }

          .tag {
            display: inline-block;
            background: #667eea;
            color: white;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            margin: 0.25rem;
            font-size: 0.875rem;
            cursor: pointer;
            transition: all 0.3s ease;
          }

          .tag:hover {
            background: #764ba2;
            transform: translateY(-2px);
          }

          .tag span {
            margin-left: 0.5rem;
            font-weight: bold;
          }

          .btn-update {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            border: none;
            border-radius: 0.5rem;
            padding: 0.75rem 2rem;
            color: white;
            font-weight: 600;
            transition: all 0.3s ease;
          }

          .btn-update:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
            color: white;
          }

          .btn-update:disabled {
            opacity: 0.7;
            transform: none;
          }

          .file-upload {
            border: 2px dashed #e9ecef;
            border-radius: 0.5rem;
            padding: 2rem;
            text-align: center;
            transition: all 0.3s ease;
            cursor: pointer;
          }

          .file-upload:hover {
            border-color: #667eea;
            background: rgba(102, 126, 234, 0.05);
          }

          .file-upload input[type="file"] {
            display: none;
          }

          .page-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 2rem 0;
            margin-bottom: 2rem;
          }
        `}
      </style>

      <div className="page-header">
        <div className="container">
          <h1 className="mb-2">
            <i className="bi bi-pencil-square me-3"></i>
            Update Product
          </h1>
          <p className="mb-0 opacity-75">
            Edit product information and details
          </p>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="update-form-container">
              {showError()}
              {showSuccess()}
              {showLoading()}

              {!loading && (
                <form onSubmit={clickSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-box me-2"></i>
                          Product Name
                        </label>
                        <input
                          onChange={handleChange("name")}
                          type="text"
                          className="form-control"
                          value={name}
                          required
                          placeholder="Enter product name"
                        />
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-tag me-2"></i>
                          Price
                        </label>
                        <input
                          onChange={handleChange("price")}
                          type="number"
                          step="0.01"
                          className="form-control"
                          value={price}
                          required
                          placeholder="0.00"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      <i className="bi bi-text-paragraph me-2"></i>
                      Description
                    </label>
                    <textarea
                      onChange={handleChange("description")}
                      className="form-control"
                      value={description}
                      required
                      rows="4"
                      placeholder="Describe your product..."
                    />
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-folder me-2"></i>
                          Category
                        </label>
                        <select
                          onChange={handleChange("category")}
                          required
                          className="form-select"
                          value={category}
                        >
                          <option value="">Select category</option>
                          {categories &&
                            categories.map((c, i) => (
                              <option key={i} value={c._id}>
                                {c.name}
                              </option>
                            ))}
                        </select>
                      </div>
                    </div>

                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-box-seam me-2"></i>
                          Quantity
                        </label>
                        <input
                          onChange={handleChange("quantity")}
                          type="number"
                          className="form-control"
                          value={quantity}
                          required
                          placeholder="0"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12">
                      <div className="mb-3">
                        <label className="form-label">
                          <i className="bi bi-tags me-2"></i>
                          Tags
                        </label>
                        <input
                          className="form-control"
                          onKeyDown={addTag}
                          placeholder="Press Enter to add tags"
                        />
                        <div className="mt-2">
                          {tags.map((tagElement, index) => (
                            <div key={index} className="tag">
                              {tagElement}{" "}
                              <span onClick={() => removeTag(tagElement)}>×</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="form-label">
                      <i className="bi bi-image me-2"></i>
                      Product Photo
                    </label>
                    <div className="file-upload">
                      <label htmlFor="photo-upload" className="mb-0">
                        <i
                          className="bi bi-cloud-upload"
                          style={{ fontSize: "2rem", color: "#667eea" }}
                        ></i>
                        <p className="mb-0 mt-2">Click to upload or drag and drop</p>
                        <small className="text-muted">PNG, JPG, GIF up to 10MB</small>
                      </label>
                      <input
                        id="photo-upload"
                        onChange={handleChange("photo")}
                        type="file"
                        name="photo"
                        accept="image/*"
                      />
                    </div>
                    {photo && (
                      <div className="mt-2">
                        <small className="text-success">
                          <i className="bi bi-check-circle me-1"></i>
                          {photo.name} selected
                        </small>
                      </div>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    <button
                      type="submit"
                      className="btn btn-update flex-fill"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <span className="spinner-border spinner-border-sm me-2"></span>
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>
                          Update Product
                        </>
                      )}
                    </button>

                    <Link to="/products" className="btn btn-outline-secondary">
                      <i className="bi bi-arrow-left me-2"></i>
                      Cancel
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
