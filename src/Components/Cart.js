import React from "react";
import "./Cart.css";
import { useCartValue } from "../store/cartContext";
import { getCartTotal } from "../store/cartReducer";
import CartCard from "./CartCard";
import { Link,useLocation } from "react-router-dom";

const Cart = () => {
	const [{ cart }] = useCartValue();
	const value = getCartTotal(cart);
	//const products = cart;
	console.log("cart", cart);
	const location =useLocation() ;
	return (
		<div className="cart">
			<div className="cart_left">
				<h2 className="cart_title">Your Shopping cart</h2>
				<div>
					{cart.map((product, index) => (
						<CartCard key={index} product={product} />
					))}
				</div>
			</div>

			<div className="cart_right">
				<div className="subtotal">
					<p>
						Subtotal ({cart.reduce((total, item) => total + item.quantity, 0)} items): <strong>${value}</strong>
					</p>
					{/* <small className="subtotal_gift">
						<input type="checkbox" /> This order contains a gift
					</small> */}
					<Link to="/checkout" className="link-no-underline whiteColor"  state={{ from: location.pathname }} >
						<button>Proceed to Checkout</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Cart;
