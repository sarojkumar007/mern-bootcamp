import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
import { Link } from 'react-router-dom';
import { getProduct, updateProduct, getAllCategories } from './helper/adminapicall';
import { isAuthenticated } from '../auth/helper';


const goBack = () => (
	<div class="dashboard__admin__option--cta">
		<Link to="/admin/dashboard">&nbsp;Back</Link>
	</div>
)

const UpdateProduct = ({ match }) => {

	const { user, token } = isAuthenticated();

	const [values, setValues] = useState({
		name: "",
		description: "",
		price: "",
		stock: "",
		photo: "",
		categories: [],
		category: "",
		loading: false,
		error: "",
		createdProduct: "",
		getARedirect: false,
		formData: ""
	})

	const { name, description, price, stock, photo, categories, category, loading, error, createdProduct, getARedirect, formData } = values

	const preload = (pId) => {
		getProduct(pId).then(data => {
			console.log(data)
			if (data.error) {
				setValues({ ...values, error: data.error })
			}
			else {
				setValues({ ...values, name: data.name, description: data.description, price: data.price, category: data.category._id, stock: data.stock, formData: new FormData() })
				console.log(categories)
				preloadCategories();
			}
		});
	};

	const preloadCategories = () => {
		getAllCategories().then(data => {
			if (data.error) {
				setValues({ ...values, error: data.error })
			}
			else {
				setValues({ categories: data, formData: new FormData() })
			}
		})
	}

	// useEffect(()=>{},[])
	useEffect(() => {
		preload(match.params.pId)
	}, [])

	const handleChange = name => e => {
		const value = name === 'photo' ? e.target.files[0] : e.target.value;
		formData.set(name, value)
		setValues({ ...values, [name]: value })
	}
	// TODO:
	const onSubmit = (e) => {
		e.preventDefault()
		setValues({ ...values, error: "", loading: true })
		updateProduct(match.params.pId, user._id, token, formData)
			.then(data => {
				if (data.error) {
					setValues({ ...values, error: data.error })
				}
				else {
					setValues({ ...values, name: "", description: "", price: "", stock: "", loading: false, createdProduct: data.name })
				}
			})
			.catch()
	}

	const successMessage = () => {
		return (
			<div
				className="alert alert-success mt-3"
				style={{ display: createdProduct ? "" : "none" }}>
				<h4>{createdProduct} updated successfully</h4>
			</div>
		)
	}
	const errorMessage = () => {
		if (error) {
			return (
				<div className="alert alert-danger mt-3">
					<h4>{createdProduct} update failed</h4>
				</div>
			)
		}
	}
	const createProductForm = () => (
		<form>
			<div className="input-group">
				<label>Upload Photo</label>
				<label>
					<input
						onChange={handleChange("photo")}
						type="file"
						name="photo"
						accept="image"
						placeholder="choose a file"
					/>
				</label>
			</div>

			<div className="input-group">
				<label>Product Name</label>
				<input
					onChange={handleChange("name")}
					name="photo"
					placeholder="Name"
					value={name}
				/>
			</div>

			<div className="input-group">
				<label>Product Description</label>
				<textarea
					onChange={handleChange("description")}
					name="photo"
					placeholder="Description"
					value={description}
				/>
			</div>

			<div className="input-group">
				<label>Product Price</label>
				<input
					onChange={handleChange("price")}
					type="number"
					placeholder="Price"
					value={price}
				/>
			</div>

			<div className="input-group">
				<label>Select Category</label>
				<select
					onChange={handleChange("category")}
					placeholder="Category"
				>
					<option>Select</option>
					{categories && categories.map((el, index) => {
						return (<option key={index} value={el._id}>{el.name}</option>)
					})}
				</select>
			</div>

			<div className="input-group">
				<label>Quantity</label>
				<input
					onChange={handleChange("stock")}
					type="number"
					placeholder="Quantity"
					value={stock}
				/>
			</div>

			<div className="input-group">
				<button type="submit" onClick={onSubmit} className="button">Update Product</button>
			</div>
		</form>
	);
	return (
		<Base title="Update a Product" description="Update your product here.">
			<section className="section section__dashboard dashboard__admin__option">
				<div className="box">
					{goBack()}
					<section class="section section__signup dashboard__admin__option--box">
						{successMessage()}
						{errorMessage()}
						<h3 class="heading">Update Product</h3>
						{createProductForm()}
					</section>
				</div>
			</section>
		</Base>
	)
}
export default UpdateProduct;