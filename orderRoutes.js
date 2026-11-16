import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const router = express.Router();
const statuses = ['Pending', 'Preparing', 'Ready', 'Completed'];

router.get('/', async (req, res, next) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 }).limit(100);
    res.json(orders);
  } catch (err) { next(err); }
});

router.get('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid order ID.' });
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json(order);
  } catch (err) { next(err); }
});

router.post('/', async (req, res, next) => {
  try {
    const { customerName, customerPhone = '', items, notes = '' } = req.body;
    if (!customerName?.trim()) return res.status(400).json({ error: 'Customer name is required.' });
    if (!Array.isArray(items) || items.length === 0) return res.status(400).json({ error: 'Add at least one item to the order.' });

    const orderItems = [];
    for (const item of items) {
      if (!mongoose.isValidObjectId(item.productId)) return res.status(400).json({ error: 'An order item has an invalid product ID.' });
      const quantity = Number(item.quantity);
      if (!Number.isInteger(quantity) || quantity < 1) return res.status(400).json({ error: 'Item quantity must be a positive whole number.' });
      const product = await Product.findById(item.productId);
      if (!product || !product.available) return res.status(400).json({ error: 'A selected product is unavailable.' });
      orderItems.push({ product: product._id, name: product.name, quantity, unitPrice: product.price });
    }
    const total = Number(orderItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0).toFixed(2));
    const order = await Order.create({ customerName, customerPhone, items: orderItems, total, notes });
    res.status(201).json(order);
  } catch (err) { next(err); }
});

router.patch('/:id/status', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid order ID.' });
    if (!statuses.includes(req.body.status)) return res.status(400).json({ error: 'Invalid order status.' });
    const order = await Order.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json(order);
  } catch (err) { next(err); }
});

router.delete('/:id', async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ error: 'Invalid order ID.' });
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ error: 'Order not found.' });
    res.json({ message: 'Order deleted successfully.' });
  } catch (err) { next(err); }
});

export default router;
