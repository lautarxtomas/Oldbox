import express from 'express'
import formidable from 'express-formidable'

const router = express.Router()

// middlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js'

// controllers
import { create, getAll, getProduct, photo, remove, update } from '../controllers/product.js'

// CRUD
router.post('/product', requireSignin, isAdmin, formidable(), create)
router.get('/products', getAll)
router.get('/product/:slug', getProduct)
router.get('/product/photo/:productId', photo) // GET PHOTO FROM PRODUCT
router.delete('/product/:productId', remove)
router.put('/product/:productId', requireSignin, isAdmin, formidable(), update)

export default router

