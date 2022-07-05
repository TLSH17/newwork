import express from "express";
import jsonfile from "jsonfile";
import type { Request, Response } from "express";
import { logger } from "../logger";
import path from "path";
import { Product } from "../models";

const PRODUCT_JSON_PATH = path.join(__dirname, "..", "data", "products.json");
export const productRoutes = express.Router();

// productRoutes.use((req, res, next) => {
//   logger.debug("testing productRoutes middleware");
//   next();
// });

productRoutes.get("/", getProducts);
productRoutes.post("/", createProduct);

// Get all Project
// path: /products?page=1 method: GET
async function getProducts(req: Request, res: Response) {
  try {
    const NUM_PER_PAGE = 5;
    let page = parseInt(req.query.page as string, 10);
    if (isNaN(page)) {
      page = 1;
    }

    const products: Array<Product> = await jsonfile.readFile(PRODUCT_JSON_PATH);
    const totalPageNum = Math.ceil(products.length / NUM_PER_PAGE);
    if (page > totalPageNum) {
      res.status(400).json({ success: false, message: "invalid page number" });
      return;
    }

    // page -> index
    // 1 -> 0..4,,, (1 - 1) * 5
    // 2 -> 5..9,,, (2 - 1) * 5
    // 3 -> 10..14,,, (3 - 1) * 5
    const startingIndex = (page - 1) * NUM_PER_PAGE;
    const filterProducts = products.slice(startingIndex, startingIndex + NUM_PER_PAGE);

    res.json({ current_page: page, total_page: totalPageNum, products: filterProducts });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}

function createProduct(req: Request, res: Response) {
  try {
    res.json({ message: "Create Product" });
  } catch (err) {
    logger.error(err.message);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}
