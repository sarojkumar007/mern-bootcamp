import { API } from "../../backend";

export const addItemToCart = (item, next) => {
	let cart = [];
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'))
		}
		cart.push({ ...item, count: 1 })
		localStorage.setItem('cart', JSON.stringify(cart))
		next()
	}
}

export const loadCart = () => {
	let cart = []
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'))
		}
	}
	return cart;
}

export const removeItemFromCart = (pId) => {
	let cart = []
	if (typeof window !== undefined) {
		if (localStorage.getItem('cart')) {
			cart = JSON.parse(localStorage.getItem('cart'))
		}
		cart.map((el, i) => {
			if (pId === el._id) {
				cart.splice(i, 1)
			}
		})
		localStorage.setItem('cart', JSON.stringify(cart))
	}
	return cart;
}

export const clearCart = next => {
	if (typeof window !== undefined) {
		localStorage.removeItem('cart');
		next();
	}
}