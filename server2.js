// const express = require("express");
// const cors = require("cors");
// const app = express();
// const PORT = process.env.PORT || 4005;
// //middleware
// app.use(express.json()); // this CB function is called for every request
// app.use(cors());

// const { sequelize } = require("./util/database");

// const {User} = require('../');
// const {Order} = require('./models/order');
// const {OrderDetail} = require('./models/orderDetail');
// const {Product} = require('./models/product');

// const { seed } = require("./controllers/seedController"); 
// const {register, login} = require('./controllers/auth')
// const {isAuthenticated} = require('./middleware/isAuthenticated')
// const { getAllProducts,addOrder, getOrder, getOrderDetails } = require("./controllers/shop");
// User.hasMany(Order);
// Order.belongsTo(User); //A user created the Order
// // OR Order.belongsTo(User,{constraints: true, onDelete : "CASCADE"})//deletes the Order if user is deleted
// Order.hasMany(OrderDetail);
// OrderDetail.belongsTo(Order);
// Product.hasMany(OrderDetail);

// const seedData = require("./controllers/seedData");

// // the seed controller Route
// app.post("/seed", seedData);
// //user login/register/authentication routes
// app.post('/register', register)
// app.post('/login', login)//Using GET for login is generally not recommended because it would involve sending sensitive data (i.e., the username and password) as query parameters in the URL.This approach would expose the sensitive data in the URL, which can be logged in server logs, browser history, or intermediary proxy logs, making it less secure.

// //Routes for Products
// app.get("/products", getAllProducts);
// app.post('/order', addOrder);
// app.get('/order/:userId', getOrder);
// app.get('/orderDetails/:orderId', getOrderDetails)


// // the force: true is for development -- it DROPS tables!!!
// // sequelize.sync({ force: true })
// //sequelize.sync()//.sync connects to DB &creates tables based on the models & define relations
// sequelize
// 	.sync()
// 	.then(() => {
//         console.log('Database sync successful.');
//         //seedData();
// 		app.listen(PORT, () =>
// 			console.log(`db sync successful & server running on port ${PORT}`)
// 		);
// 	})
// 	.catch((err) => console.log(err));
//     //call the seedData() function after successfully synchronizing the database using sequelize.sync({ force: true }). This way, the seeding process will only start after the database tables have been created. if you want to recreate the DB,you stop the nodemon server and You can change Sequilize.sync() to sequelize.sync({ force: true }) and uncomment seedata(). If you want to just seed the data, use the seed API in Postman or uncomment the seeddata() method here.
    
