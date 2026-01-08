import { API } from "../config";
import queryString from "query-string";

export const createCategory = (category) => {
  return fetch(`${API}/category/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: category,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getCategories = () => {
  const url = `${API}/categories`;
  console.log('Fetching categories from:', url);
  return fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })
    .then((response) => {
      console.log('Response status:', response.status);
      console.log('Response headers:', response.headers);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((err) => {
      console.error('Error fetching categories:', err);
      throw err;
    });
};

export const createProduct = (product) => {
  return fetch(`${API}/product/create`, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getProducts = (page = 1, limit = 10) => {
  const query = `?page=${page}&limit=${limit}`;
  return fetch(`${API}/products${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getProduct = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const updateProduct = (productId, product) => {
  return fetch(`${API}/product/${productId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
    },
    body: product,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const list = (params) => {
  const query = queryString.stringify(params);
  console.log("query", query);
  return fetch(`${API}/products/search?${query}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const read = (productId) => {
  return fetch(`${API}/product/${productId}`, {
    method: "GET",
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
