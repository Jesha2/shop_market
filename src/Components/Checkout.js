import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartValue } from "../store/cartContext";
import AuthContext from "../store/authContext";
import CheckoutForm from "./CheckoutForm";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe(
	"pk_test_51NuKAmLB8ww5YxOuEUpQIdhKhtLOY3w0JWVuVjLnTBdlHbALgtmVL9fn7E8ZYu6g4UxqKK6Sdl86PmGpsErNoi9W00IffIhwuu"
);

const Checkout = () => {
	// const subtotal = getCartTotal(cart);
	const [clientSecret, setClientSecret] = useState("");
	const { state } = useContext(AuthContext);
	const [{ cart }] = useCartValue();
	const stripeSecKey =
		"sk_test_51NuKAmLB8ww5YxOudwndoWwk0MAyTaM1iIHmuXunzR6ixP6hNJlrNmQlChs7jhysbQQUGRxrJrklEnx05QaV6dVk00Uj5b4MVu";
	const cartItems = cart.map((item) => ({
		id: item.id,
		quantity: item.quantity, //quantity for each item
	}));
	//runs this function only once when
	useEffect(() => {
		// Create PaymentIntent as soon as the page loads-invoice

		//fetch("/createPaymentIntent", {
		fetch("http://54.84.211.174:4000/createPaymentIntent", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"Authorization": `Bearer ${stripeSecKey}`,
			},
			body: JSON.stringify({
				items: cartItems,
				userId: state.userId,
			}),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, []);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div>
			{cart.length > 0 ? (
				clientSecret && (
					<Elements options={options} stripe={stripePromise}>
						<CheckoutForm />
					</Elements>
				)
			) : (
				<div>Please add items to your cart</div>
			)}
		</div>
	);
};

export default Checkout;
