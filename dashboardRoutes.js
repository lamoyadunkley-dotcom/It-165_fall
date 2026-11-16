import express from 'express';
import Product from '../models/Product.js';
import Order from '../models/Order.js';

const router = express.Router();
router.get('/', async (req, res, next) => {
  try {
    const [productCount, orderCount, pendingCount, completedRevenue, recentOrders] = await Promise.all([
      Product.countDocuments(),
      Order.countDocuments(),
      Order.countDocuments({ status: { $in: ['Pending', 'Preparing', 'Ready'] } }),
      Order.aggregate([{ $match: { status: 'Completed' } }, { $group: { _id: null, total: { $sum: '$total' } } }]),
      Order.find().sort({ createdAt: -1 }).limit(5)
    ]);
    res.json({ productCount, orderCount, pendingCount, completedRevenue: completedRevenue[0]?.total || 0, recentOrders });
  } catch (err) { next(err); }
});
export default router;
