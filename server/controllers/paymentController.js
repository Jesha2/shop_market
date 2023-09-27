const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { Product } = require("../models/product");


const calculateOrderAmount = async (items) => {
  try {
    const itemIds = items.map((item) => item.id);

    // Batch fetch products using a single database query
    const products = await Product.findAll({
      where: {
        id: itemIds,
      },
    });

    let totalAmount = 0;

    for (const item of items) {
      // Find the corresponding product in the fetched products
      const product = products.find((p) => p.id === item.id);

      if (product) {
        // Calculate the item's total price based on its price and quantity
        const itemTotal = product.price * item.quantity; // Assuming product.price is in dollars

        totalAmount += itemTotal;
      }
    }

    console.log("totalAmount   " + totalAmount);
    return Math.round(totalAmount * 100); // Convert to cents and round to an integer
  } catch (error) {
    console.error("Error calculating order amount:", error);
    throw error;
  }
};

module.exports = {
	createPaymentIntent: async (req, res) => {
		console.log("createPaymentIntent");
		const { items } = req.body;//has ids and quantity
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
