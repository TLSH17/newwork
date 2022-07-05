import express from "express";
import path from "path";
import { logger } from "./logger";
import { productRoutes } from "./routers/productRoutes";

const app = express();

app.use((req, res, next) => {
  logger.debug(`path: ${req.path}, method: ${req.method}`);
  next();
});

// app.use((req, res, next) => {
//   logger.debug("testing middleware");
//   next();
// });

app.use("/products", productRoutes);

app.use(express.static(path.join(__dirname, "public")));

const PORT = 8080;
app.listen(PORT, () => {
  logger.info(`listening to PORT: ${PORT}`);
});
