import React from "react";
import "./Header.css";
// import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import ShoppingCartTwoToneIcon from "@mui/icons-material/ShoppingCartTwoTone";
import WaterDropIcon from "@mui/icons-material/WaterDrop";
import { amber } from "@mui/material/colors";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useLocation } from "react-router-dom";
import { useCartValue } from "../store/cartContext";
import { useContext } from "react";
import AuthContext from "../store/authContext";

//import { BiSearchAlt2 } from 'react-icons/bi';

//import shoppingCartImage from './images/trolley.png';
//import { red } from '@mui/material/colors';

//const primary = `rgba(${red[500]}, 0.5)`;
const transparentColor = "rgba(255, 0, 0, 0.5)";

const Header = () => {

	//const [state, dispatch] = useCartValue();
	//const [{basket}, dispatch] = useCartValue();
	const [{ cart }] = useCartValue();
	const { state, dispatch } = useContext(AuthContext);
	const handleLogout = () => {
		dispatch({ type: "LOGOUT" });
	  };
	const location =useLocation() ; // when loggin tp pass the location of which page/path user logged in so that it can go back to that page
	return (
		<div className="header">
			{/* //header divided into 3 parts: logo, search bar,cart-each of these div
			will have another 2 */}
			<Link to="/" className="link-no-underline">
				<div className="header_logo">
					{/* <WaterDropIcon fontSize="large" sx={{ color: amber[900] }} 
        className="header_logoImage"/> */}
					<WaterDropIcon
						fontSize="large"
						sx={{ color: amber[500] }}
						className="header_logoImage"
					/>
					<h2 className="header_logoTitle">Essential Oils</h2>
				</div>
			</Link>

			<div className="header_search">
				<input type="text" className="header_searchInput" />
				<SearchIcon className="header_searchIcon"></SearchIcon>
				{/* <BiSearchAlt2 size="2em" color="#DA7635" /> */}
			</div>

			<div className="header_nav">
				<div className="nav_item">
					{state.token ? (
						// Content to display when the user is logged in
						<>
							<span className="nav_itemLine1">Hello {state.username}</span>
							<span className="nav_itemLine2" onClick={handleLogout}>
								Logout
							</span>
						</>
					) : (
						// Content to display when the user is not logged in
						<>
							<span className="nav_itemLine1">Hello Guest</span>
							<Link to="/auth" className="link-no-underline whiteColor"  state={{ from: location.pathname }} >
								
								<span className="nav_itemLine2">Sign in</span>
							</Link>
						</>
					)}
				</div>

				{/* <div className="nav_item">
					<span className="nav_itemLine1">my</span>
					<span className="nav_itemLine2">market</span>
				</div> */}
				<Link to="/cart" className="link-no-underline">
					<div className="nav_itemCart">
						<ShoppingCartTwoToneIcon />
						<span className="nav_itemLine2 nav_cartCount">{cart.length}</span>
					</div>
				</Link>
			</div>
		</div>
	);
};

export default Header;
