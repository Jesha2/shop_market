import "./App.css";
import Header from "./components/Header";
import Login from "./components/Login";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
// import Product from "./components/Product";
 import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
	return (
		<div className="App">
			<Router>
				<main>
				<Routes>
					<Route
						path="/login"
						element={
							<>
								<Header />
								<Login />
							</>
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
			</Router>
			
		</div>
	);
}

export default App;
