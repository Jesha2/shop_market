import React from "react";
import "./Home.css";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductDisplay from "./ProductDisplay";
import Product from "./Product";

const Home = () => {
	//const apiUrl = '/products'
	const [products, setProducts] = useState([]);
	useEffect(() => {
		axios
			.get("http://localhost:4000/products")
			.then((res) => {
				setProducts(res.data);
				console.log(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	}, []);
	console.log(products);
	return (
		<div className="home">
			<div className="image-container">
				<div className="image-center">
          <>
          <br/> <br/> <br/>Welcome to world of essential oils</>
          </div>
			</div>
			{/* <div >
        <img src = "https://www.essentialoil.com/cdn/shop/files/eoc-wholesale-slideshow_1800x1000.jpg?v=1678676162" className="home_image" alt="ad"/>
      </div> */}
			{/* <div
      style={{
        background: `linear-gradient(
          190deg,
          rgba(0, 0, 0, 0.3),
          rgba(0, 0, 0, 0.3)),
          url(https://www.essentialoil.com/cdn/shop/files/eoc-wholesale-slideshow_1800x1000.jpg?v=1678676162)`,
          backgroundSize: "cover",
          backgroundPosition:"center center"
      }} className="adBanner"
    ></div>  */}
			<div className="home_product">
			

      {
        products.map((product,index) => (
          <Product key={index} product={product}/>
        ))
      }
      </div>

		</div>
	);
};

export default Home;
	{/* <ProductDisplay products={products} /> */}
