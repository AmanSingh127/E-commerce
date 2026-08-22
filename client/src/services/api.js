import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api'
});

// Products
export const getProducts = (category) =>
  API.get('/products', { params: category ? { category } : {} })
    .then((res) => res.data);

export const getProductById = (id) =>
  API.get(`/products/${id}`)                    //FETCHING THE DATA
    .then((res) => res.data);

export const createProduct = (data) =>
  API.post('/products', data)
    .then((res) => res.data);

export const updateProduct = (id, data) =>
  API.put(`/products/${id}`, data)
    .then((res) => res.data);

export const deleteProduct = (id) =>
  API.delete(`/products/${id}`)
    .then((res) => res.data);

export default API;