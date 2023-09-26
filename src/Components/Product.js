import React from "react";
import "./Product.css";
import { useCartValue } from "../store/cartContext";

const Product = ({ product }) => {
	// console.log(product.id);

	const [state, dispatch] = useCartValue();

	// const addToCart = () => {
	//     dispatch({
	//       type: "ADD_TO_CART",
	//       item: product,
	//     });
	//   };
	const addToCart = () => {
		dispatch({
			type: "ADD_TO_CART",
			item: {
				id: product.id,
				imageUrl: product.imageUrl,
				productName: product.productName,
				price: product.price,
				ratings: product.ratings,
				quantity: 1,
			},
		});
	};

	return (
		<div className="product">
			<img src={product.imageUrl} alt="product_pic" />
			{product.productName}
			<p className="product_price">
				<small>$</small>
				<strong> {product.price}</strong>
			</p>
			<div className="product_rating">
				{Array(product.ratings)
					.fill()
					.map((_, i) => (
						<p>⭐</p>
					))}
			</div>
			<button onClick={addToCart}> Add to Cart</button>
		</div>
	);
};

export default Product;
// const addToCart = () => {
//     dispatch({
//         type: "ADD_TO_CART",
//         item: {
//             id: product.id,
//             image: product.imageURL,
//             price: product.price,
//             ratings: product.ratings,
//         },
//     });
// };
