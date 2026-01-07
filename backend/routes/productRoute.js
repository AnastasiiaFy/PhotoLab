import express from "express"
import { getProducts, getProductById } from "../controllers/productController.js"

const router = express.Router()

// Отримати всі продукти
router.get("/", getProducts)

// Отримати продукт по ID
router.get("/:id", getProductById)

export default router
