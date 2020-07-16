import { API } from "../../backend";

// Category calls
export const createCategory = (uid, token, category) => {
	return fetch(`${API}/category/create/${uid}`,
		{
			method: 'POST',
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`
			},
			body: JSON.stringify(category)
		})
		.then(res => res.json())
		.catch(err => console.log(err))
}

export const getAllCategories = () => {
	return fetch(`${API}/category/all`,
		{
			method: 'GET'
		})
		.then(res => res.json())
		.catch(err => console.log(err))
}

// Product calls
export const createProduct = (uid, token, product) => {
	return fetch(`${API}/product/create/${uid}`,
		{
			method: 'POST',
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			},
			body: product
		})
		.then(res => res.json())
		.catch(err => console.log(err))
}

export const getAllProducts = () => {
	return fetch(`${API}/product/all`,
		{
			method: 'GET'
		})
		.then(res => res.json())
		.catch(err => console.log(err))
}

// Del product
export const deleteProduct = (pId, uid, token) => {
	return fetch(`${API}/product/${pId}/del/${uid}`,
		{
			method: 'DELETE',
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			}
		})
		.then(res => res.json())
		.catch(err => console.log(err))
}
// get a product

export const getProduct = (pId) => {
	return fetch(`${API}/product/${pId}`, {
		method: 'GET'
	})
		.then(res => res.json())
		.catch(err => console.log(err))
}

// update a product

export const updateProduct = (pId, uid, token, product) => {
	return fetch(`${API}/product/${pId}/update/${uid}`,
		{
			method: 'PUT',
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${token}`
			},
			body: product
		})
		.then(res => res.json())
		.catch(err => console.log(err))
}