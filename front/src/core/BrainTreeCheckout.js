import React, { useState, useEffect } from 'react'
import { loadCart, clearCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import { getAToken, processPayment } from './helper/brainTreeHelper';
import { createOrder } from './helper/orderHelper'
import { isAuthenticated } from '../auth/helper';
import DropIn from "braintree-web-drop-in-react"

const BrainTreeCheckout = ({ products, setReload = f => f, reload = undefined }) => {

	const [info, setInfo] = useState({
		loading: false,
		success: false,
		clientToken: null,
		error: "",
		instance: {}
	});

	const uid = isAuthenticated() && isAuthenticated().user._id;
	const token = isAuthenticated() && isAuthenticated().token;

	const getToken = (uid, token) => {
		getAToken(uid, token).then(info => {
			console.log("INFO:", info);

			if (info.error) {
				setInfo({ ...info, error: info.error })
			}
			else {
				const clientToken = info.clientToken;
				setInfo({ clientToken })
			}
		})
	}

	const showBrainTreeDropIn = () => {
		return (
			<div>
				{info.clientToken !== null && products.length > 0 ? (
					<div>
						<DropIn
							options={{ authorization: info.clientToken }}
							onInstance={instance => (info.instance = instance)}
						/>
						<button className="button button-3" onClick={() => { }}>Buy</button>
					</div>
				) : (
						<div>
							<h3>Please Login</h3>
							<Link to="/signin">Signin</Link>
						</div>
					)}
			</div>
		)
	}

	useEffect(() => {
		getToken(uid, token);
	}, [])

	const onPurchase = () => {
		setInfo({ loading: true })
		let nonce;
		let getNonce = info.instance.requestPaymentMethod()
			.then(data => {
				nonce = data.nonce;
				const paymentData = {
					paymentMethodNonce: nonce,
					amount: getAmount()
				}
				processPayment(uid, token, paymentData)
					.then(response => {
						setInfo({ ...info, success: response.success, loading: false });
						// console.log("")
						// TODO: Empty Cart
						// TODO: Force Reload
						// Create Order
					})
					.catch(err => {
						setInfo({ loading: false, success: false })
						console.log(err)
					})
			})
			.catch()
	}

	const getAmount = () => {
		let amount = 0;
		products.map(p => {
			amount += p.price
		});
		return amount;
	}

	return (
		<div>
			<h3>Your bill is: ${getAmount()}</h3>
			{showBrainTreeDropIn()}
		</div>
	)
}

export default BrainTreeCheckout;