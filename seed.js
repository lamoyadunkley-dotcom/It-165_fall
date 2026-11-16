import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from './config/db.js';
import Product from './models/Product.js';

const samples = [
  { name: 'Carrot Juice', category: 'Juice', description: 'Freshly prepared carrot juice.', price: 10, size: '16 oz' },
  { name: 'Carrot Juice – Large', category: 'Juice', description: 'Freshly prepared carrot juice.', price: 15, size: '24 oz' },
  { name: 'Pineapple Ginger Juice', category: 'Juice', description: 'Tropical pineapple with a ginger kick.', price: 10, size: '16 oz' },
  { name: 'Mango Smoothie', category: 'Smoothie', description: 'Creamy mango fruit smoothie.', price: 15, size: '24 oz' },
  { name: 'Carrot Cupcake', category: 'Pastry', description: 'Moist carrot cupcake.', price: 3, size: '1 piece' },
  { name: 'Banana Cupcake', category: 'Pastry', description: 'Soft banana cupcake.', price: 3, size: '1 piece' },
  { name: 'Coconut Cupcake', category: 'Pastry', description: 'Coconut-flavored cupcake.', price: 3, size: '1 piece' },
  { name: 'Carrot & Pineapple Cupcake', category: 'Pastry', description: 'Carrot and pineapple cupcake.', price: 3, size: '1 piece' }
];

try {
  await connectDB();
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany(samples);
    console.log(`${samples.length} sample products added.`);
  } else {
    console.log('Products already exist. Seed skipped to avoid duplicates.');
  }
} catch (err) {
  console.error(err);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
