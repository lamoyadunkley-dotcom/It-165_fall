import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import recipeRoutes from './routes/recipeRoutes.js';
import dashboardRoutes from './routes/dashboardRoutes.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({ origin: process.env.CLIENT_URL || 'http://localhost:5173' }));
app.use(express.json({ limit: '1mb' }));

app.get('/api/health', (req, res) => res.json({
  status: 'ok',
  database: process.env.MONGODB_URI ? 'configured' : 'not configured',
  message: 'LASLOYALE API is running'
}));
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use(notFound);
app.use(errorHandler);

connectDB()
  .then(() => app.listen(PORT, () => console.log(`LASLOYALE API running at http://localhost:${PORT}`)))
  .catch(err => {
    console.error('Unable to start server:', err.message);
    process.exit(1);
  });
