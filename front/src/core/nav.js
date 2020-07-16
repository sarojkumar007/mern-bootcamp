import React, { Fragment } from 'react';
import { Link, withRouter } from 'react-router-dom'
import { signout, isAuthenticated } from '../auth/helper';


const currentTab = (history, path) => {
	if (history.location.pathname === path) {
		return { color: "#12213d" }
	}
	else {
		return { color: "#444" }
	}
}

const getName = () => {
	const auth = JSON.parse(localStorage.getItem('jwt'));
	if(auth){
		return auth.user.name;
	}
	return false;
}

const Menu = ({ history }) => {
	return (
		<>
		<div className="nav nav-light">
			<div className="nav__brand">T-shirt Store</div>
			<ul className="nav__list">
				<span>
					<Link
						style={currentTab(history, '/')}
						className="nav__link"
						to="/">
						Home
				</Link>
					<Link
						style={currentTab(history, '/cart')}
						className="nav__link"
						to="/cart">
						Cart
				</Link>
				{isAuthenticated() && (
						<Link
							style={currentTab(history, '/user/dashboard')}
							className="nav__link"
							to="/user/dashboard">
							Dashboard
						</Link>
				)}
				{isAuthenticated() && isAuthenticated().user.role === 1 && (
						<Link
							style={currentTab(history, '/admin/dashboard')}
							className="nav__link"
							to="/admin/dashboard">
							A Dashboard
						</Link>
				)}
				{!isAuthenticated() &&
					(<Fragment>
							<Link
								style={currentTab(history, '/signup')}
								className="nav__link"
								to="/signup">
								Signup
							</Link>
							<Link
								style={currentTab(history, '/signin')}
								className="nav__link"
								to="/signin">
								Signin
								</Link>
					</Fragment>
					)}
				</span>
				{isAuthenticated() && (
						<span>
						{ getName() }&nbsp;
						(<a href="#" style={{ 'cursor': 'pointer', 'color':'#777', 'margin':'0 3px' }}
							className="nav__link text-info"
							onClick={() => {
								signout(() => {
									history.push('/signin')
								})
							}}>
							Signout
					</a>)
					</span>
				)}
			</ul>
			</div>
		</>
	);
}

export default withRouter(Menu);