const { User } = require("../models/user");
const { Order } = require("../models/order");
const { OrderDetail } = require("../models/orderDetail");
const { Product } = require("../models/product");

module.exports = {
	addOrder: async (req, res) => {
		console.log("addOrder");
		try {
			const { userId, productsInOrder } = req.body;
//console.log(userId, productsInOrder)
			await Order.create({
				orderDate: new Date(),
				status: "processing",
				userId: userId,
			});
			const newOrder = await Order.findOne({
				where: { userId: userId },
				attributes: ['id'],
				order: [['id', 'DESC']], // Order by id in descending order to get the latest order
			  });
			console.log("newOrder.id",newOrder.id);
			// Loop through the orderDetail array and create OrderDetail records for each product
			for (const product of productsInOrder) {
				await OrderDetail.create({
					quantity: product.quantity,
					subtotal: product.subtotal,
					productId: product.productId,
					orderId: newOrder.id, // Set the OrderId to the newly created Order's id
				});
			}

			res.status(200).send("Order added");
			console.log("Order added successfully");
		} catch (err) {
			res.status(400).send("Error adding add Order " + err);
			console.error(err);
		}
	},
	getAllProducts: async (req, res) => {
		try {
			console.log("========================getAllProduct");
			const Products = await Product.findAll();
			console.log("===================sucess in getAllProducts");

			res.status(200).send(Products);
		} catch (error) {
			console.log("ERROR IN getAllPProduct");
			console.log(error);
			res.sendStatus(400);
		}
	},

	getOrder: async (req, res) => {
		try {
			const { userId } = req.params;
			const orders = await Order.findAll({
				where: { userId: userId },
				attributes: ["id", "orderDate", "status"], //specify the attributes to retrieve
			});
			res.status(200).send(orders);
		} catch (error) {
			console.log("ERROR IN getOrder");
			console.log(error);
			res.sendStatus(400);
		}
	},

	getOrderDetails:async (req, res) => {
		try {
			const { orderId } = req.params;
			const orderDetails = await OrderDetail.findAll({
                where: {orderId: orderId},
                include: [{
                    model: Order,
                    required: true, //inner join
                    attributes: [`orderDate`, `status`]
                }]
            })
            console.log(orderDetails)
			res.status(200).send(orderDetails);
		} catch (error) {
			console.log("ERROR IN getOrder");
			console.log(error);
			res.sendStatus(400);
		}
	},
};
