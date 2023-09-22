import React from "react";
import "./Header.css"
// import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { amber } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";

//import { BiSearchAlt2 } from 'react-icons/bi';

//import shoppingCartImage from './images/trolley.png';
//import { red } from '@mui/material/colors';

//const primary = `rgba(${red[500]}, 0.5)`; 
const transparentColor = 'rgba(255, 0, 0, 0.5)'; 

const Header = () => {
	return (
		<div className="header">
			{/* //header divided into 3 parts: logo, search bar,cart-each of these div
			will have another 2 */}
			<div className="header_logo">
				{/* <WaterDropIcon fontSize="large" sx={{ color: amber[900] }} 
        className="header_logoImage"/> */}
        <WaterDropIcon fontSize="large"  sx={{ color: amber[500] }} 
        className="header_logoImage"/>
				<h2 className="header_logoTitle"> 
        Essential Oils</h2>
			</div>

			
			<div className="header_search">
				<input type="text" className="header_searchInput" />
				<SearchIcon className="header_searchIcon"></SearchIcon>
				{/* <BiSearchAlt2 size="2em" color="#DA7635" /> */}
			</div>

			<div className="header_nav">
      <div className="nav_item">
					<span className="nav_itemLine1">Hello Guest</span>
					<span className="nav_itemLine2">Sign in</span>
				</div>
				{/* <div className="nav_item">
					<span className="nav_itemLine1">my</span>
					<span className="nav_itemLine2">market</span>
				</div> */}
				<div className="nav_itemCart">
					<ShoppingCartTwoToneIcon />
					<span className="nav_itemLine2 nav_cartCount">0</span>
				</div>
			</div>
		</div>
	);
};

export default Header;
