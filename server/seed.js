const { User } = require('./models/user');
const { Order } = require('./models/order');
const { OrderDetail } = require('./models/orderDetail');
const { Product } = require('./models/product');

const seedData = async () => { 
  try {
    // Insert data into the User table
    await User.create({
      username: 'john_doe',
      email: 'john@example.com',
      hashedPass: 'hashed_password_here', // Replace with actual data
    });

    // Insert data into the Order table
    await Order.create({
      orderDate: new Date(),
      status: true, // Replace with actual data
    });

    // Insert data into the OrderDetail table
    await OrderDetail.create({
      quantity: 5,
      subtotal: 100.50, // Replace with actual data
    });

    // Insert data into the Product table
    await Product.create({
      name: 'Product Name',
      description: 'Product description',
      price: 49.99, // Replace with actual data
    });

    console.log('Data seeded successfully.');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
}

module.exports = seedData; 
