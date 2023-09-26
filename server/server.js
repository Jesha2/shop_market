// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.SERVER_PORT || 4000;

const { seed } = require("./controllers/seedController");
const { register, login } = require("./controllers/authController");
const { isAuthenticated } = require("./middleware/isAuthenticated");
const {
	getAllProducts,
	addOrder,
	getOrder,
	getOrderDetails,
} = require("./controllers/productController");

const { createPaymentIntent,getStripeApiKey } = require("./controllers/paymentController");

// Middleware setup
app.use(express.static("public"));
app.use(express.json());
app.use(cors());

// the seed controller Route
app.post("/seed", seed);

//user login/register/authentication routes
app.post("/register", register);
app.post("/login", login); //Using GET for login is generally not recommended because it would involve sending sensitive data (i.e., the username and password) as query parameters in the URL.This approach would expose the sensitive data in the URL, which can be logged in server logs, browser history, or intermediary proxy logs, making it less secure.

//Routes for Products
app.get("/products", getAllProducts);
app.post("/order", isAuthenticated,  addOrder);
app.get("/order/:userId", getOrder);
app.get("/orderDetails/:orderId", getOrderDetails);

//Payment-Stripe
app.post("/create-payment-intent", createPaymentIntent);
//app.post("/payment/process", createPaymentIntent);
app.get("/payment/process", getStripeApiKey);
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//seed();








// the force: true is for development -- it DROPS tables!!!
// sequelize.sync({ force: true })
//sequelize.sync()//.sync connects to DB &creates tables based on the models & define relations
// sequelize
// 	.sync()
// 	.then(() => {
// 		console.log("Database sync successful.");
// 		//seed();
// 		// Start the Express app
// 		app.listen(PORT, () =>
// 			console.log(`db sync successful & server running on port ${PORT}`)
// 		);
// 	})
// 	.catch((err) => console.log(err));


// OR Comment the above line which starts the express app  and uncomment below lines if you want this file to seed the data or else use the seed API on postman to seed. The following will seed the data each time you start the server
// const startApp = async () => {
//     try {
//       await seed(); // Seed the data
//        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
//     } catch (error) {
//       console.error("Error seeding data or starting the server:", error);
//     }
//   };

// //   // Call the startApp function to start the app after seeding
//   startApp();
