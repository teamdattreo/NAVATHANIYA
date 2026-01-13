import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Link, useHistory } from "react-router-dom";
import { createProduct, getCategories } from "./api";

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
    <AdminLayout title="Add a new product" description={`Add new products to NAVATHANIYA inventory`}>
      <div className="admin-page-header">
        <div>
          <h1 className="admin-page-title">Add Product</h1>
          <p className="admin-page-subtitle">Create a new product listing for your store.</p>
        </div>
        <Link to="/dashboard" className="btn btn-outline-primary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to Dashboard
        </Link>
      </div>

      <div className="admin-panel">
        {showLoading()}
        {showSuccess()}
        {showError()}
        {newPostForm()}
        {goBack()}
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
