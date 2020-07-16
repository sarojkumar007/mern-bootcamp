import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { isAuthenticated } from '../auth/helper';
import { getAllProducts, deleteProduct } from './helper/adminapicall';

const ManageProducts = () => {
	const [products, setProducts] = useState([]);

	const { user, token } = isAuthenticated();

	const preload = () => {
		getAllProducts().then(data => {
			if (data.error) {
				console.log(data)
			}
			else {
				setProducts(data)
			}
		})
	}

	useEffect(() => {
		preload()
	}, []);

	const deleteThisProduct = (pId) => {
		deleteProduct(pId, user._id, token)
			.then(data => {
				if (data.error) {
					console.log(data)
				}
				else {
					preload();
				}
			})
	}

	return (
		<Base title="Welcome admin!" description="Manage products here">
			<section className="section section__dashboard dashboard__admin__option">
				<div className="box">
					<div className="dashboard__admin__option--cta">
						<Link to={`/admin/dashboard`}>
							Admin Home
						</Link>
					</div>

					<section className="section section__signup dashboard__admin__option--box">
						<h3 className="heading">Manage Products</h3>
						<p className="lead">Total {products.length} Products</p>
						{products.map((p, i) => {
							return (
								<div key={i} className="item">
									<h4 className="item__name">{p.name}</h4>
									<span>
										<Link
											className="button"
											to={`/admin/product/update/${p._id}`}
										>
											Update
											</Link>
										<button 
											onClick={() => {deleteThisProduct(p._id)}} 
											className="button button-2">
												Delete
									</button>
									</span>
								</div>
							)
						})}
					</section>
				</div>
			</section>
		</Base>
	)
}

export default ManageProducts;