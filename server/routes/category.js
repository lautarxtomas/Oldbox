import express from 'express'

const router = express.Router()

// middlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js'

// controllers
import { create, update, remove, getAll, getById, getProductsByCategory } from '../controllers/category.js'

// CRUD
router.post('/category', requireSignin, isAdmin, create)
router.put('/category/:categoryId', requireSignin, isAdmin, update)
router.delete('/category/:categoryId', requireSignin, isAdmin, remove)
router.get('/categories', getAll)
router.get('/category/:slug', getById)
router.get('/products-by-category/:slug', getProductsByCategory);

export default router
