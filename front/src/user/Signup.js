import React, { useState } from 'react';
import Base from '../core/Base'
import { Link } from 'react-router-dom'
import { signup } from '../auth/helper';

const Signup = () => {

	const [values, setValues] = useState({
		name: "",
		email: "",
		password: "",
		error: "",
		success: false
	})

	const { name, email, password, error, success } = values

	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	}

	const onSubmit = e => {
		e.preventDefault()
		setValues({ ...values, error: false })
		signup({ name, email, password })
			.then(data => {
				if (data.error) {
					setValues({ ...values, error: data.error, success: false })
				}
				else {
					setValues({
						...values,
						name: "",
						email: "",
						password: "",
						error: "",
						success: true
					})
				}
			})
			.catch(err => console.log("ERROR in SIGNUP: ", err))
	}

	const signupForm = () => {
		return (
			<section className="section section__signup">
				<h3 className="heading">Create an Account</h3>
				<form action="#">
					<div className="input-group">
						<label>Name</label>
						<input
							type="text"
							onChange={handleChange('name')}
							value={name}
							spellCheck="false" autoComplete="off" />
					</div>

					<div className="input-group">
						<label>Email Address</label>
						<input
							type="email"
							onChange={handleChange('email')}
							value={email} 
							spellCheck="false" autoComplete="off" />
					</div>

					<div className="input-group">
						<label>Password</label>
						<input
							type="password"
							onChange={handleChange('password')}
							value={password}
							spellCheck="false" autoComplete="off" />
					</div>

					<div className="input-group">
						<button onClick={onSubmit} className="button">Register</button>
					</div>

				</form>
			</section>
		)
	}

	const successMessage = () => {
		return (
			<div className="alert alert-success col-md-4 offset-4"
				style={{ display: success ? "" : "none" }}>
				Account Register Success. <Link to="/signin">Signin Here</Link>
			</div>
		)
	}

	const handleMultipleErrors = err => {
		if (err.length > 0) {
			return err.map(e => <p className="small">{e.msg}</p>)
		}
	}

	const errorMessage = () => {
		return (
			<div className="alert alert-danger col-md-4 offset-sm-4"
				style={{ display: error ? "" : "none" }}>
				{handleMultipleErrors(error)}
			</div>
		)
	}

	return (
		<Base title="Create an Account!" description="Create your account to get your favourite T-Shirt">
			{successMessage()}
			{errorMessage()}
			{signupForm()}
			<p className="text-center">{JSON.stringify(values)}</p>
		</Base>
	);
}

export default Signup;