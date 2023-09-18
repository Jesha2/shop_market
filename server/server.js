const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 4005;
//middleware
app.use(express.json()); // this CB function is called for every request
app.use(cors());

const { sequelize } = require("./util/database");

const {User} = require('./models/user');
const {Order} = require('./models/order');
const {OrderDetail} = require('./models/orderDetail');
const {Product} = require('./models/product');
User.hasMany(Order);
Order.belongsTo(User); //A user created the Order
// OR Order.belongsTo(User,{constraints: true, onDelete : "CASCADE"})//deletes the Order if user is deleted
Order.hasMany(OrderDetail);
OrderDetail.belongsTo(Order);
Product.hasMany(OrderDetail);

const seedData = require('./seed');
// the force: true is for development -- it DROPS tables!!!
// sequelize.sync({ force: true })
//sequelize.sync()//.sync connects to DB &creates tables based on the models & define relations
sequelize
	.sync({ force: true })
	.then(() => {
        console.log('Database sync successful.');
        seedData();
		app.listen(PORT, () =>
			console.log(`db sync successful & server running on port ${PORT}`)
		);
	})
	.catch((err) => console.log(err));
    //call the seedData() function after successfully synchronizing the database using sequelize.sync({ force: true }). This way, the seeding process will only start after the database tables have been created.
    
