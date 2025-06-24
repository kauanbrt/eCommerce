import express from 'express';
import { ProductController } from '../controllers/ProductController.js';

const productRouter = express.Router();

productRouter.get('/products', ProductController.getAll);
productRouter.post('/products/:id', ProductController.create);
productRouter.put('/products/:id', ProductController.update);
productRouter.delete('/products/:id', ProductController.delete);

export default productRouter;