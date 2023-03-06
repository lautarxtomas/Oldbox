import express from 'express'

const router = express.Router()

// middlewares
import { requireSignin, isAdmin } from '../middlewares/auth.js'

// controllers
import { login, register, secret, updateProfile, getOrders } from '../controllers/auth.js'

router.post('/register', register)
router.post('/login', login)
router.get('/auth-check', requireSignin, (req, res) => {
    res.json({ok: true})
})

router.get('/admin-check', requireSignin, isAdmin, (req, res) => {
    res.json({ok: true})
})

router.put('/profile', requireSignin, updateProfile)

// orders
router.get('/orders', requireSignin, getOrders)

// testing
router.get('/secret', requireSignin, isAdmin, secret)


export default router