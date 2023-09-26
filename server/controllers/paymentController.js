const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Product } = require("../models/product");


const calculateOrderAmount = async (itemIds) => {
    console.log("calculateOrderAmount");

    try {
      const products = await Product.findAll({
        where: { id: itemIds },
      });
  
      let totalAmount = 0;
      for (const product of products) {
        const priceInCents = Math.round(product.price * 100); // Assuming product.price is in dollars

        totalAmount += priceInCents;
      }
      console.log("totalAmount   " + totalAmount)
      return totalAmount;
    } catch (error) {
      console.error("Error calculating order amount:", error);
      throw error;
    }
  };

module.exports = {
	createPaymentIntent: async (req, res) => {
		console.log("createPaymentIntent");
		const { items } = req.body;
        let orderAmount =0;
        console.log(items)
        if(items.length>0){
        orderAmount = await calculateOrderAmount(items);
        //if(orderAmount>0){
            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                //amount: calculateOrderAmount(items),
                amount: orderAmount,
                currency: "usd",
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                automatic_payment_methods: {
                    enabled: true,
                },

		    });
         

            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        }  
	},

    getStripeApiKey: async (req, res) => {


    }
};
