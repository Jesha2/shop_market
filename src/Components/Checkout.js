import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useCartValue } from "../store/cartContext";

import CheckoutForm from "./CheckoutForm";


// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51NuKAmLB8ww5YxOuEUpQIdhKhtLOY3w0JWVuVjLnTBdlHbALgtmVL9fn7E8ZYu6g4UxqKK6Sdl86PmGpsErNoi9W00IffIhwuu");

const  Checkout=() =>{
    //const subtotal = getCartTotal(cart);
  const [clientSecret, setClientSecret] = useState("");
  const [{ cart }] = useCartValue();
  const cartItemIds = cart.map((item) => item.id);
// runs this function only once when 
 	useEffect(() => {
		// Create PaymentIntent as soon as the page loads
		fetch("/create-payment-intent", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ items: cartItemIds }),
		})
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
	}, []);

  const appearance = {
    theme: 'stripe',
  };
  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}

export default Checkout;
