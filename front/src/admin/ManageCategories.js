import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
// import { isAuthenticated } from '../auth/helper';
import { getAllCategories } from './helper/adminapicall';


const ManageCategories = () => {

	const [categories, setCategories] = useState([]);

	// const { user, token } = isAuthenticated();

	const preload = () => {
		getAllCategories().then(data => {
			if (data.error) {
				console.log(data)
			}
			else {
				setCategories(data)
			}
		})
	}

	useEffect(() => {
		preload()
	}, []);

	return (
		<Base title="Welcome admin" description="Manage products here">
			<section className="section section__dashboard dashboard__admin__option">
				<div className="box">
					<div className="dashboard__admin__option--cta">
						<Link to={`/admin/dashboard`}>
							Admin Home
						</Link>
					</div>
					<section className="section section__signup dashboard__admin__option--box">
						<h3 className="heading">Manage Categories</h3>
						<p className="lead">Total {categories.length} Categories</p>

							{categories.map((cat, i) => {
								return (
									<div key={i} className="item">
										<h4 className="item__name">{cat.name}</h4>
										<span>
											<Link
												className="button"
												to={`/admin/product/update/productId`}
											>
												Update
											</Link>
											<button onClick={() => { }} className="button button-2">
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
export default ManageCategories;