import { errorHandler } from "./../middlewares/error.middleware";
import express from "express";
import orderRoutes from "./../routes/order.routes";
// import { errorHandler } from "./middlewares/error.middleware";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
  console.log(`Incoming request: ${req.method} ${req.path}`);
  next();
});
app.use("/api", orderRoutes);
app.use(errorHandler);

export default app;
