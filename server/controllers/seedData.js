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
				productName: "Citrus Blend Oil 14oz",
				description: "Citrus",
				price: 99.99,
				stockQuantity: 5,
				category: "Calming oil",
				imageUrl:"https://www.essentialoil.com/cdn/shop/files/Fragrance-London_Man_1_432x432.jpg?v=1693425213",
				ratings:5,
			},
			
			{
				productName: "Frankenscience Oil 4oz",
				description: "Frankenscience Oil",
				price: 49.99,
				stockQuantity: 5,
				category: "medicinal Oil",
				imageUrl:"https://doterra-prod-media1.s3.amazonaws.com/h43/h12/27855358623774.png",
				ratings:3,
			},
			{
			productName: "Apple Cinnamon Oil 4oz",
			description: "Apple Cinnamon Oil",
			price: 39.99,
			stockQuantity: 5,
			category: "Culinary Oil",
			imageUrl:"https://www.essentialoil.com/cdn/shop/files/Fragrance-Apple_Cinnamon_1_1024x1024.jpg?v=1693425377",
			ratings:4,
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

		await UserDetail.create({
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
