import express from 'express';
import { ProductController } from '../controllers/ProductController.js';

import { auth } from '../middlewares/auth.js';

const productRouter = express.Router();

//rota publica
productRouter.get('/products', ProductController.getAll);

//rotas privadas
productRouter.post('/products', auth, ProductController.create);
productRouter.put('/products/:id', auth, ProductController.update);
productRouter.delete('/products/:id', auth, ProductController.delete);

export default productRouter;