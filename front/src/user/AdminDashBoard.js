import React from 'react';
import Base from '../core/Base';
import { isAuthenticated } from '../auth/helper';
import { Link } from 'react-router-dom';

const AdminDashBoard = () => {

	const { user: { name, email, role } } = isAuthenticated();

	const adminLeftSidebar = () => {
		return (
			<div className="dashboard__admin--sidebar">
				<Link to="/admin/create/category">Create category</Link>
				<Link to="/admin/category">Manage categories</Link>
				<Link to="/admin/create/product">Create product</Link>
				<Link to="/admin/products">Manage Products</Link>
				<Link to="/admin/orders">Manage Orders</Link>
			</div>
		)
	}
	const adminRightSidebar = () => {
		return (
			<div className="dashboard__admin--main">
				<h3>Admin Information</h3>
					<article>
						<span>Name:</span>
						<p>{name}</p>
					</article>
					<article>
						<span>Email:</span>
						<p>{email}</p>
					</article>
					<article>
						<span>Role:</span>
						<p>{role === 1 ? "Admin" : "User"}</p>
					</article>
			</div>
		)
	}

	return (
		<>
			<Base title="Welcome Admin!" description="Manage your Products here.">
				<section className="section section__dashboard dashboard__admin">
						{adminLeftSidebar()}
						{adminRightSidebar()}
				</section>
			</Base>
		</>
	)
}

export default AdminDashBoard;