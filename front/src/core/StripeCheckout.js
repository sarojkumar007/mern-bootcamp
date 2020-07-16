import React, { useState, useEffect } from 'react'
import { isAuthenticated } from '../auth/helper'
import { clearCart, loadCart } from './helper/cartHelper'
import { Link } from 'react-router-dom'
import StripeCheckoutHandle from 'react-stripe-checkout'
import { API } from '../backend'
import { createOrder } from './helper/orderHelper'

const StripeCheckout = ({ products, setReload = f => f, reload = undefined }) => {

	const [data, setData] = useState({
		loading: false,
		success: false,
		error: "",
		address: ""
	});
	const token = isAuthenticated() && isAuthenticated().token;
	const uid = isAuthenticated() && isAuthenticated().user._id;

	const getFinalPrice = () => {
		let amount = 0;
		products.map(p => {
			amount += p.price
		});
		return amount;
	};

	const makePayment = (token) => {
		const body = {
			token,
			products
		}
		const headers = {
			"Content-Type": "application/json"
		}

		return fetch(`${API}/stripe/pay`, {
			method: "POST",
			headers,
			body: JSON.stringify(body)
		})
			.then(res => {
				console.log(res);
				// call more methods
				const { status } = res
				console.log("STATUS", status);
			})
			.catch(err => console.log(err))
	}

	const showStripeBtn = () => {
		return isAuthenticated() ? (
			<StripeCheckoutHandle
				stripeKey="pk_test_VDGsaNVdvMuoLvC927RlFjq300pKzHtCt5"
				token={makePayment}
				amount={getFinalPrice() * 100}
				name="Buy T-shirts"
				shippingAddress
				billingAddress
			>
				<button className="btn btn-success">Pay with Stripe</button>
			</StripeCheckoutHandle>
		) : (
				<Link to="/signin">
					<button className="btn btn-warning">Signin</button>
				</Link>
			)
	}

	return (
		<div>
			<h3 className="text-white">Sripe Checkout {getFinalPrice()}</h3>
			{showStripeBtn()}
		</div>
	)
}

export default StripeCheckout;