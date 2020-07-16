import { API } from "../../backend";

export const getAToken = (uid, token) => {
	return fetch(`${API}/bt/gettoken/${uid}`, {
		method: "GET",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`
		}
	})
		.then(response => {
			return response.json()
		})
		.catch(err => console.log(err))
}

export const processPayment = (uid, token, paymentInfo) => {
	return fetch(`${API}/bt/pay/${uid}`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			"Content-Type": 'application/json',
			Authorization: `Bearer ${token}`
		},
		body: JSON.stringify(paymentInfo)
	})
		.then(response => response.json())
		.catch(err => console.log(err))
}