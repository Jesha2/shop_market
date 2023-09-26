import "./App.css";
import { useContext, useEffect, useState } from "react";
import AuthContext from "./store/authContext";
import { useCartValue } from "./store/cartContext";
import { getCartTotal } from "./store/cartReducer";

import Header from "./components/Header";
import Login from "./components/Login";
import Cart from "./components/Cart";
import Home from "./components/Home";
import CheckoutForm from "./components/CheckoutForm";
import Product from "./components/Product";
import PaymentComplete from "./components/PaymentComplete"
import Footer from "./components/Footer";
import ProductDetails from "./components/ProductDetails";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
// import { CartProvider } from "./store/cartContext";
import Auth from "./components/Auth";

import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
	"pk_test_51NuKAmLB8ww5YxOuEUpQIdhKhtLOY3w0JWVuVjLnTBdlHbALgtmVL9fn7E8ZYu6g4UxqKK6Sdl86PmGpsErNoi9W00IffIhwuu"
);

function App() {
	const { state } = useContext(AuthContext);
	const [{ cart }] = useCartValue();
	

	const [clientSecret, setClientSecret] = useState("");

	useEffect(() => {
	const cartItemIds = cart.map((item) => item.id);
		//const subtotal = getCartTotal(cart);
		// Create PaymentIntent as soon as the page loads
		fetch("/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items: cartItemIds }),
		})
			.then((res) => res.json())
			.then((data) => setClientSecret(data.clientSecret));
	}, [cart]);

	const appearance = {
		theme: "stripe",
	};
	const options = {
		clientSecret,
		appearance,
	};

	return (
		<div className="App">
			<BrowserRouter>
				<main>
					<Header />
					<Routes>
						<Route path="/auth" element={<Auth />} />
						{clientSecret && (
							<Route
								path="/checkout"
								element={
									state.token ? (
										<Elements options={options} stripe={stripePromise}>
											<CheckoutForm />
										</Elements>
									) : (
										<Navigate to="/auth" />
									)
								}
							/>
						)}
						{/* <Route path='/checkout' element={state.token ? <CheckoutForm/> : <Navigate to="/auth" />}/> */}

						<Route path="/cart" element={<Cart />} />
						<Route path="/paymentComplete" element={<PaymentComplete />} />
						<Route path="/products" element={<Product />} />
						<Route path="/product/:id" element={<ProductDetails />} />
						<Route path="/" element={<Home />} />
						{/* <Route
							path="/login"
							element={
								<>
									<Header />
									<Login />
								</>
							}
						/> */}
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;

