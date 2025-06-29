import express from 'express';
import { UserController } from '../controllers/UserController.js';

const userRouter = express.Router();

userRouter.get('/users', UserController.getAll);
userRouter.post('/users', UserController.create);
userRouter.put('/users/:id', UserController.update);
userRouter.delete('/users/:id', UserController.delete);

export default userRouter;