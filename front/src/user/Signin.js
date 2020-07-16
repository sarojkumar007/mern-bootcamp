import React, { useState } from 'react';
import Base from '../core/Base'
import { Redirect } from 'react-router-dom'
import { signin, authenticate, isAuthenticated } from "../auth/helper"


const Signin = () => {

	const [values, setValues] = useState({
		email: "",
		password: "",
		error: "",
		loading: false,
		didRedirect: false
	})
	const { email, password, error, loading, didRedirect } = values
	const { user } = isAuthenticated()

	const handleChange = name => event => {
		setValues({ ...values, error: false, [name]: event.target.value });
	}

	const onSubmit = e => {
		e.preventDefault()
		setValues({ ...values, error: false, loading: true })
		signin({ email, password })
			.then(data => {
				if (data.error) {
					setValues({ ...values, error: data.error, loading: false })
				}
				else {
					authenticate(data, () => {
						setValues({ ...values, didRedirect: true })
					})
				}
			})
			.catch(console.log("Sign in Failed"))
	}

	const performRedirect = () => {
		console.log('Performing Redirect ...');
		if (didRedirect) {
			if (user && user.role === 1) {
				return <Redirect to="/admin/dashboard" />
			}
			else {
				return <Redirect to="/user/dashboard" />
			}
		}
		else if (isAuthenticated()) {
			return <Redirect to="/" />
		}
	}

	const loadingMessage = () => {
		return (
			loading && (
				<div className="alert alert-info">
					<h2>Logging in ...</h2>
				</div>
			)
		)
	}

	// const handleMultipleErrors = err => {
	// 	if (err.length > 1) {
	// 		return err.map(e => <p className="small">{e.msg}</p>)
	// 	}
	// 	else {
	// 		return ""
	// 	}
	// }

	const errorMessage = () => {
		return (
			<div className="alert alert-danger col-md-4 offset-sm-4"
				style={{ display: error ? "" : "none" }}>
				{JSON.stringify(error)}
			</div>
		)
	}

	const signinForm = () => {
		return (
			<section className="section section__signup">
				<h3 className="heading">Signin to your Account</h3>
				<form action="#">

					<div className="input-group">
						<label htmlFor="signup_email">Email Address</label>
						<input
							type="email"
							onChange={handleChange('email')}
							id="signup_email"
							value={email}
							spellCheck="false" autoComplete="off" required />
					</div>

					<div className="input-group">
						<label htmlFor="signup_pass">Password</label>
						<input
							type="password"
							onChange={handleChange("password")}
							id="signup_pass"
							value={password} 
							spellCheck="false" autoComplete="off" required />
					</div>

					<div className="input-group">
						<label htmlFor=""></label>
						<button onClick={onSubmit} className="button d-block">Signin</button>
					</div>

				</form>
			</section>
		)
	}

	return (
		<Base title="Signin to your Account!" description="Enter into world of your favourite collections">
			{loadingMessage()}
			{errorMessage()}
			{signinForm()}
			{performRedirect()}
			<p className="text-center">{JSON.stringify(values)}</p>
		</Base>
	);
}

export default Signin;