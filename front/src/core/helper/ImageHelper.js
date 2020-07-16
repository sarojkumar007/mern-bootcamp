import React from 'react';
import { API } from '../../backend';

const ImageHelper = ({ product }) => {
	const imgURL = product ? `${API}/product/${product._id}/photo` : '/logo512.png';
	return (
		<>
			<div className="product__img">
				<img src={imgURL}
					alt="Product Thumb"
				/>
			</div>
		</>
	)
}

export default ImageHelper;