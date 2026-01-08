import React, { useState, useEffect } from "react";
import AdminLayout from "./AdminLayout";
import { Link } from "react-router-dom";
import { createCategory, getCategories } from "./api";
import adminImage from "../img/admin.png";
import categoryImage from "../img/001.jpg";

const AddCategory = () => {
  const [values, setValues] = useState({
    name: "",
    categories: [],
    super_category: "",
    loading: false,
    error: "",
    createdcategory: "",
    formData: "",
  });

  const {
    name,
    categories,
    super_category,
    loading,
    error,
    createdcategory,
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

  const handleChange = (name) => (event) => {
    const value = event.target.value;
    formData.set(name, value);

    setValues({ ...values, [name]: value });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true });
    console.log(values);
    createCategory(formData).then((data) => {
      console.log("Data", data);
      if (data.error) {
        console.log("Error", data.error);
        setValues({ ...values, error: data.error });
      } else {
        setValues({
          ...values,
          name: "",
          loading: false,
          createdcategory: data.name,
        });
      }
    });
  };

  const newCategoryFom = () => (
    <form onSubmit={clickSubmit}>
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
        <label className="text-muted">Super Category</label>
        <select
          onChange={handleChange("super_category")}
          className="form-control"
        >
          <option>Select</option>
          {categories &&
            categories.map((c, i) => (
              <option key={i} value={c._id}>
                {c.name}
              </option>
            ))}
        </select>
      </div>

      <button className="btn btn-primary">Create Category</button>
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
      style={{ display: createdcategory ? "" : "none" }}
    >
      <h2>{`${createdcategory}`} is created!</h2>
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
      title="Add a new category"
      description={`Add new categories to NAVATHANIYA inventory`}
    >
      <style>{`
        .admin-form-shell {
          background: #fffdf8;
          border: 1px solid rgba(120, 91, 58, 0.18);
          border-radius: 16px;
          padding: 2rem;
          box-shadow: 0 12px 24px rgba(43, 33, 23, 0.12);
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1.1fr);
          gap: 2rem;
        }

        .admin-form-page {
          min-height: 100vh;
          background: linear-gradient(90deg, rgba(43, 33, 23, 0.72), rgba(43, 33, 23, 0.35)),
            url(${categoryImage}) center/cover no-repeat;
          padding: 2rem 0;
          display: flex;
          align-items: center;
        }

        .admin-form-media {
          background: #f3e6cc;
          border-radius: 14px;
          overflow: hidden;
          min-height: 320px;
          border: 1px solid rgba(120, 91, 58, 0.15);
        }

        .admin-form-media img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .admin-form-content {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        @media (max-width: 992px) {
          .admin-form-shell {
            grid-template-columns: 1fr;
          }

          .admin-form-media {
            min-height: 220px;
          }
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
                <div className="admin-form-media">
                  <img src={categoryImage} alt="Navathaniya category" />
                </div>
                <div className="admin-form-content">
                  {showSuccess()}
                  {showError()}
                  {newCategoryFom()}
                  {goBack()}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AddCategory;
