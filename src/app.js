import express from "express";
import dotenv from 'dotenv';

import productRouter from "./routes/productRouter.js";
import customerRouter from "./routes/CustomerRouter.js";
import orderRouter from "./routes/OrderRouter.js";
import userRouter from "./routes/UserRouter.js";
import authRouter from "./routes/AuthRouter.js";

import { auth } from "./middlewares/auth.js";

//configura o env
dotenv.config();

const app = express();

//configura para JSON
app.use(express.json());

//rotas publicas
app.use('/api', productRouter);
app.use('/api', authRouter);

//rotas protegidas (requerem autenticacao/token)
app.use('/api', auth, customerRouter);
app.use('/api', auth, orderRouter);
app.use('/api', auth, userRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "eCommerce API está funcionando!" });
});

app.use((req, res, next) => {
    res.status(404).json({ error: 'Rota não encontrada' });
});

app.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    return res.status(401).json({ error: 'Token inválido ou inexistente' });
  }
  next(err);
});

export default app;