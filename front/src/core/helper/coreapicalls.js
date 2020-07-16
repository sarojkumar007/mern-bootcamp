import { API } from "../../backend";

export const getProduct = () => {
	return fetch(`${API}/product/all`, {
		method: "GET"
	})
		.then(res => res.json())
		.catch(err => console.log(err))
}