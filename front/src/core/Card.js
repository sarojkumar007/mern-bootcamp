import React, { useState, useEffect } from 'react';
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/cartHelper';


const Card = ({
	product, addToCart = true, removeFromCart = false,
	setReload = f => f, reload = undefined
}) => {

	const [redirect, setRedirect] = useState(false)
	const [count, setount] = useState(product.count)

	const cardTitle = product ? product.name : 'A Product Title'
	const cardDescription = product ? product.description : 'A Product Desciption'
	const cardPrice = product ? product.price : '0.00'

	const addToCartFn = () => {
		addItemToCart(product, () => setRedirect(true))
	}
	const getARedirect = (redirect) => {
		if (redirect) {
			return <Redirect to="/cart" />
		}
	}

	const showAddToCart = (addToCart) => {
		return (
			addToCart && (
				<button
					onClick={addToCartFn}
					className="button button-1"
				>
					Add to Cart
        </button>
			)
		)
	}
	const showRemoveFromCart = (removeFromCart) => {
		return (
			removeFromCart && (
				<button
					onClick={() => {
						removeItemFromCart(product._id)
						setReload(!reload)
					}}
					className="button button-2"
				>
					Remove from cart
              </button>
			)
		)
	}

	return (
		<div className="product">
			<ImageHelper product={product} />
			<div className="product__body">
				{getARedirect(redirect)}
				<h3 className="product__head">{cardTitle}</h3>
				<p className="lead">{cardDescription}</p>
				<span className="product__price">${cardPrice}</span>
				{showAddToCart(addToCart)}
				{showRemoveFromCart(removeFromCart)}
			</div>
		</div>
	);
};

export default Card;