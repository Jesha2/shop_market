import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
// import Product from "./components/Product";
 import Footer from "./components/Footer";
 import ProductDetails from "./components/ProductDetails"
import { BrowserRouter , Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<BrowserRouter>
				<main>
				<Routes>
					<Route
						path="/login"
						element={
							
								<Login />
						
						}
					>
					</Route>
					<Route
						path="/checkout"
						element={
							<>
								<Header />
								<Checkout />
							</>
						}
					/>

				<Route
						path="/product/:id"
						element={
							<>
								<Header />
								<ProductDetails />
							</>
						}
					/>
					<Route
						path="/"
						element={
							<>
								<Header />
								<Home />
							</>
						}
					/>
				</Routes>
				</main>
				<Footer /> 
			</BrowserRouter>
			
		</div>
	);
}

export default App;
