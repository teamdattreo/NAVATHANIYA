import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Dashboard from "./Component/Dashboard";
import Home from "./Component/Home";
import About from "./Component/About";
import AddCategory from "./Component/AddCategory";
import AddProduct from "./Component/AddProduct";
import Product from "./Component/Product";
import ManageProducts from "./Component/ManageProducts";
import UpdateProduct from "./Component/UpdateProduct";
import AdminLogin from "./Component/AdminLogin";
import AdminSignup from "./Component/AdminSignup";
import ProtectedRoute from "./Component/ProtectedRoute";
import App from "./App";

const Routes = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/about" exact component={About} />
          <Route path="/admin/login" exact component={AdminLogin} />
          <Route path="/admin/signup" exact component={AdminSignup} />
          <Route path="/product/:productId" exact component={Product} />
          <Route path="/cloudinary" exact component={App} />
          
          {/* Protected Admin Routes */}
          <Route path="/dashboard" exact>
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          </Route>
          <Route path="/create/category" exact>
            <ProtectedRoute>
              <AddCategory />
            </ProtectedRoute>
          </Route>
          <Route path="/create/product" exact>
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          </Route>
          <Route path="/products" exact>
            <ProtectedRoute>
              <ManageProducts />
            </ProtectedRoute>
          </Route>
          <Route
            path="/product/update/:productId"
            exact
          >
            <ProtectedRoute>
              <UpdateProduct />
            </ProtectedRoute>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default Routes;
