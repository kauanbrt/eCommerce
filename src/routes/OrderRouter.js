import express from 'express';
import { OrderController } from '../controllers/OrderController.js';

const orderRouter = express.Router();

orderRouter.get('/orders', OrderController.getAll);
orderRouter.post('/orders/:id', OrderController.create);
orderRouter.put('/orders/:id', OrderController.update);
orderRouter.delete('/orders/:id', OrderController.delete);

export default orderRouter;