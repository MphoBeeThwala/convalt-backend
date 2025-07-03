import { sequelize, User, Retailer, Product, RetailerProduct } from './models/index.js';
import bcrypt from 'bcrypt';

async function seed() {
  await sequelize.sync({ force: true });

  // Create test user
  const password = await bcrypt.hash('password123', 10);
  await User.create({
    name: 'Test User',
    email: 'test@example.com',
    phone: '0712345678',
    national_id: '8001015009087', // valid SA ID
    password
  });

  // Create retailers
  const retailer1 = await Retailer.create({ name: 'Shoprite', address: '123 Main St', latitude: -26.2041, longitude: 28.0473 });
  const retailer2 = await Retailer.create({ name: 'Pick n Pay', address: '456 Market Rd', latitude: -26.2050, longitude: 28.0480 });

  // Create products
  const bread = await Product.create({ name: 'Bread', category: 'Bakery' });
  const milk = await Product.create({ name: 'Milk', category: 'Dairy' });
  const eggs = await Product.create({ name: 'Eggs', category: 'Dairy' });

  // Assign products to retailers
  await RetailerProduct.bulkCreate([
    { retailer_id: retailer1.id, product_id: bread.id, price: 15.99 },
    { retailer_id: retailer1.id, product_id: milk.id, price: 19.99 },
    { retailer_id: retailer1.id, product_id: eggs.id, price: 29.99 },
    { retailer_id: retailer2.id, product_id: bread.id, price: 16.99 },
    { retailer_id: retailer2.id, product_id: milk.id, price: 18.99 },
    { retailer_id: retailer2.id, product_id: eggs.id, price: 31.99 },
  ]);

  console.log('Seed complete!');
  process.exit(0);
}

seed();
