import axios from 'axios'

const API = axios.create({
	baseURL: 'https://smartshopping-27iu.onrender.com/'
})

export const createproduct = formData =>
	API.post('/products/createUser', formData)
export const getproduct = id => API.get(`/products/${id}`)
export const deleteproduct = id => API.delete(`/products/${id}`)
export const getproducts = () => API.get('/products')
export const updateproduct = (id, formData) =>
	API.put(`/products/${id}`, formData)
