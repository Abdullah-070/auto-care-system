const mongoose = require('mongoose');
const config = require('config');
const Category = require('./models/Category');
const Product = require('./models/Product');

const User = require('./models/User');
const bcrypt = require('bcryptjs');

const MONGO_URI = config.get('mongoURI');

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB for seeding...');

    await Category.deleteMany({});
    await Product.deleteMany({});
    await User.deleteMany({});

    const salt = await bcrypt.genSalt(10);
    const password = await bcrypt.hash('password123', salt);

    await User.create([
      { name: 'Admin User', email: 'admin@example.com', password, role: 'admin' },
      { name: 'Normal User', email: 'user@example.com', password, role: 'user' }
    ]);

    const lights = await Category.create({ name: 'Lights', description: 'Lights for your vehicle' });
    const filters = await Category.create({ name: 'Filters', description: 'Filters for your vehicle' });
    const oil = await Category.create({ name: 'Oil & Additives', description: 'Oil and additives for your vehicle' });

    const productsArr = [];
    for (let i = 1; i <= 30; i++) {
      const isFilter = i % 3 === 0;
      const isLight = i % 2 === 0;
      productsArr.push({
        name: `Automotive Product ${i}`,
        description: `High-quality automotive product number ${i}. Great for your vehicle needs.`,
        price: Number((Math.random() * 100 + 10).toFixed(2)),
        category: isFilter ? filters._id : (isLight ? lights._id : oil._id),
        image: isFilter 
          ? 'https://images.unsplash.com/photo-1728065117170-1cdcd4d152d9?q=80&w=1170&auto=format&fit=crop' 
          : 'https://images.unsplash.com/photo-1613214293055-5678e2f6d7de?q=80&w=687&auto=format&fit=crop'
      });
    }

    await Product.create(productsArr);

    console.log('Data seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
