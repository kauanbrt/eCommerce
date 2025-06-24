import express from "express";

import productRouter from "./routes/productRouter.js";
import customerRouter from "./routes/CustomerRouter.js";
import orderRouter from "./routes/OrderRouter.js";

const app = express();

app.use(express.json());

app.use('/api', productRouter);
app.use('/api', customerRouter);
app.use('/api', orderRouter);

app.get("/", (req, res) => {
  res.status(200).json({ message: "eCommerce API está funcionando!" });
});

export default app;