import express from 'express';
import { CustomerController } from '../controllers/CustomerController.js';

const customerRouter = express.Router();

customerRouter.get('/custormers', CustomerController.getAll);
customerRouter.post('/custormers', CustomerController.create);
customerRouter.put('/custormers/:id', CustomerController.update);
customerRouter.delete('/custormers/:id', CustomerController.delete);

export default customerRouter;