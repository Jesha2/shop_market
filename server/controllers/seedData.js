const { User } = require("../models/user");
const { Order } = require("../models/order");
const { OrderDetail } = require("../models/orderDetail");
const { Product } = require("../models/product");
const UserDetail = require("../models/userDetail");

const seedData = async () => {
	try {
		// Insert data into the User table
		await User.create({
			username: "HARRY",
			email: "harry@gmail.com",
			hashedPass: "hashed_password",
		});

		//  Product table
		await Product.bulkCreate([
			{
				productName: "Lavender Oil 4oz",
				description: "Lavender Oil",
				price: 49.99,
				stockQuantity: 5,
				category: "Calming oil",
			},
			{
				productName: "CLOVE Oil 4oz",
				description: "CLOVE Oil",
				price: 49.99,
				stockQuantity: 5,
				category: "Culinary Oil",
			},
		]);

		//  Order table
		await Order.create({
			orderDate: new Date(),
			status: true,
			userId: 1,
		});

		//  OrderDetail table
		await OrderDetail.create({
			quantity: 2,
			subtotal: 99.98,
			productId: 1,
			orderId: 1,
		});

		UserDetail.create({
			userId: 1,
			fullName: "Harry Smith",
			address: "123 Highway 1",
			city: "Sacramento",
			state: "CA",
			postalCode: "97006",
		});

		console.log("Data seeded successfully.");
	} catch (error) {
		console.error("Error seeding data:", error);
	}
};

module.exports = seedData;
