import React from 'react';
import Nav from './nav'

const Base = ({
	title = "T-shirt Store",
	description = "Get your favourite code t-shirts",
	children
}) => {
	return (
		<>
			<Nav />
			<main className="main">
				<header className="header">
					<span>
						<h2 className="display-4">{title}</h2>
						<p className="lead">{description}</p>
					</span>
				</header>
				{children}
			</main>
			<hr />
			<footer className="footer mt-auto py-3">
				<div className="container-fluid text-white text-center mt-3">
					<h4>If you got any questions feel free to reach out</h4>
				</div>
				<div className="container text-center text-muted">
						Designed by <a href="https://sarojkumar007.github.io/contact" className="nav__link text-white">dev_sarojkumar</a>
				</div>
			</footer>
		</>
	);
}

export default Base;