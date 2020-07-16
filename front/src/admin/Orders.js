import React, { useState, useEffect } from 'react';
import Base from '../core/Base';
// import { Link } from 'react-router-dom';
// import { isAuthenticated } from '../auth/helper';

const Orders = () => {
	return(
		<Base title="Welcome admin!" description="View your Orders.">
			<p className="lead py-3" style={{'textAlign':'center'}}>Your Orders will be available here...</p>
		</Base>
	)
}

export default Orders;