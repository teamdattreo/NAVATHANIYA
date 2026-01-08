import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Link, useHistory } from "react-router-dom";
import { createProduct, getCategories } from "./api";
import adminImage from "../img/admin.png";

const AddProduct = () => {
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
    createdProduct: "",
    formData: "",
  });

  const {
    name,
    description,
    price,
    categories,
    category,
    quantity,
    tags,
    loading,
    error,
    createdProduct,
    formData,
  } = values;

  const init = () => {
    getCategories().then((data) => {
      if (data.error) {
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          categories: data,
          formData: new FormData(),
        });
      }
    });
  };

  useEffect(() => {
    init();
  }, []);
  const history = useHistory();

  const addTag = (e) => {
    if (e.key === "Enter") {
      if (e.target.value.length > 0) {
        setValues({ ...values, tags: [...values.tags, e.target.value] });
        e.target.value = "";
      }
    }
  };
  const removeTag = (removedTag) => {
    const newTags = tags.filter((el) => el !== removedTag);
    setValues({ ...values, tags: newTags });
  };

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    console.log("Value", values);
    setValues({ ...values, error: "", loading: true });
    formData.set("tags", tags);
    createProduct(formData).then((data) => {
      console.log("Data", data);
      if (data.hasOwnProperty("error")) {
        setValues({ ...values, error: "Fill all the details" });
      } else {
        setValues({
          ...values,
          name: "",
          description: "",
          photo: "",
          price: "",
          quantity: "",
          tags: [],
          loading: false,
          error: "",
          createdProduct: data.name,
          formData: new FormData(),
        });
        // notify other parts of the app (Home) that a new product was added
        try {
          window.dispatchEvent(new Event("productAdded"));
        } catch (e) {
          // ignore in non-browser environments
        }
      }
    });
  };

  const newPostForm = () => (
    <form className="mb-3" onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className="form-group">
        <label className="btn btn-secondary col-12 col-sm-8 col-lg-6">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image/*"
            required
          />
        </label>
      </div>

      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          className="form-control"
          value={name}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Description</label>
        <textarea
          onChange={handleChange("description")}
          className="form-control"
          value={description}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Price</label>
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          value={price}
          required
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Category</label>
        <select
          onChange={handleChange("category")}
          className="form-control"
          required
        >
          <option value="">Select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <div className="form-group">
        <label className="text-muted">Quantity</label>
        <input
          onChange={handleChange("quantity")}
          type="number"
          className="form-control"
          value={quantity}
          required
        />
      </div>

      <div className="form-group tag-container">
        <label className="text-muted">Tags</label>
        <input className="form-control" onKeyDown={addTag} />
        {tags.map((tagElement, index) => {
          return (
            <div key={index} className="tag">
              {tagElement} <span onClick={() => removeTag(tagElement)}>x</span>
            </div>
          );
        })}
      </div>

      <button
        type="button"
        onClick={clickSubmit}
        className="btn btn-outline-primary"
      >
        Create Product
      </button>
    </form>
  );

  const showError = () => (
    <div
      className="alert alert-danger"
      style={{ display: error ? "" : "none" }}
    >
      {error}
    </div>
  );

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdProduct ? "" : "none" }}
    >
      <h2>{`${createdProduct}`} is created!</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-success d-flex align-items-center gap-3">
        <div className="nava-loader" role="status" aria-label="Loading">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    );

  const goBack = () => (
    <div className="mt-5">
      <Link to="/dashboard" className="btn btn-outline-primary">
        <i className="bi bi-arrow-left me-2"></i>
        Back to Dashboard
      </Link>
    </div>
  );

  return (
    <AdminLayout
      title="Add a new product"
      description={`Add new products to NAVATHANIYA inventory`}
    >
      <style>{`
        .admin-form-shell {
          background: #fffdf8;
          border: 1px solid rgba(120, 91, 58, 0.18);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 12px 24px rgba(43, 33, 23, 0.12);
        }

        .admin-form-page {
          min-height: 100vh;
          background: linear-gradient(90deg, rgba(43, 33, 23, 0.72), rgba(43, 33, 23, 0.35)),
            url(${adminImage}) center/cover no-repeat;
          padding: 2rem 0;
          display: flex;
          align-items: center;
        }

        @media (max-width: 768px) {
          .admin-form-page {
            padding: 1.25rem 0;
          }
        }
      `}</style>
      <div className="admin-form-page">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-7">
              <div className="admin-form-shell">
                {showLoading()}
                {showSuccess()}
                {showError()}
                {newPostForm()}
                {goBack()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
