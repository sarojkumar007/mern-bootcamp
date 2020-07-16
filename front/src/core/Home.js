import React, { useState, useEffect } from 'react';
import '../styles.css'
// import { API } from '../backend'
import Base from './Base'
import Card from './Card';
import { getProduct } from './helper/coreapicalls';


const Home = () => {
	const [products, setProducts] = useState([])
	const [error, setError] = useState(false)

	const loadAllProducts = () => {
		getProduct().then(data => {
			if (data.error) {
				setError(data.error)
			}
			else {
				setProducts(data)
			}
		});
	}

	useEffect(() => {
		loadAllProducts();
	}, [])

	return (
		<Base title="Home Page">
			<section className="section section__products">
				<h1 className="heading">All Products</h1>
				<div className="products__container">
					{products.map((prod, i) => {
						return (
								<Card key={i} product={prod} />
						)
					})}
				</div>
			</section>
		</Base>
	);
}

export default Home;