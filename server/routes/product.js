import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// middlewares
import { requireSignin, isAdmin } from "../middlewares/auth.js";

// controllers
import {
  // crud
  create,
  getAll,
  getProduct,
  photo,
  remove,
  update,
  filteredProducts,
  productsCount,
  listProducts,
  productsSearch,
  relatedProducts,
  // braintree
  getToken,
  processPayment,
  orderStatus
} from "../controllers/product.js";

// CRUD
router.post("/product", requireSignin, isAdmin, formidable(), create);
router.get("/products", getAll);
router.get("/product/:slug", getProduct);
router.get("/product/photo/:productId", photo); // GET PHOTO FROM PRODUCT
router.delete("/product/:productId", remove);
router.put("/product/:productId", requireSignin, isAdmin, formidable(), update);
router.post("/filtered-products", filteredProducts);
router.get("/products-count", productsCount);
router.get("/list-products/:page", listProducts);
router.get("/products/search/:keyword", productsSearch);
router.get("/related-products/:productId/:categoryId", relatedProducts);

// BRAINTREE
router.get("/braintree/token", getToken);
router.post("/braintree/payment", requireSignin, processPayment);

router.put('/order-status/:orderId', requireSignin, isAdmin, orderStatus)

export default router;
