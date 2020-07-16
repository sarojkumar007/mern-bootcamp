import React, { useState, useEffect } from 'react';
import '../styles.css'
// import { API } from '../backend'
import Base from './Base'
import Card from './Card';
import { loadCart } from './helper/cartHelper';
import BrainTreeCheckout from './BrainTreeCheckout';


const Cart = () => {

	const [products, setProducts] = useState([]);
	const [reload, setReload] = useState(false)

	useEffect(() => {
		setProducts(loadCart());
	}, [reload])

	const loadAllProducts = (products) => {
		return (
			<div >
				<h2>This section is to load products</h2>
				{products.map((el, i) => (
					<Card key={i} product={el} removeFromCart={true} addToCart={false} setReload={setReload} reload={reload} />
				))}
			</div>
		)
	}
	// const loadCheckout = () => {
	// 	return (
	// 		<div>
	// 			<h2>This section is for checkout</h2>
	// 		</div>
	// 	)
	// }

	return (
		<Base title="Your Cart" description="Ready to Check out ?">
			<div className="row text-center">
				<div className="col-4">
					{products.length > 0 ? loadAllProducts(products) : (<h3>No Products in the Cart</h3>)}
				</div>
				<div className="col-8">
					<BrainTreeCheckout products={products} setReload={setReload} />
				</div>
			</div>
		</Base>
	);
}

export default Cart;