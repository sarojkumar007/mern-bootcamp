import { API } from "../../backend";

export const createOrder = (uid, token, orderData) => {
	return fetch(`${API}/create/${uid}`, {
		method: "POST",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify({ order: orderData })
	})
		.then(res => res.json())
		.catch(err => console.log(err))
}