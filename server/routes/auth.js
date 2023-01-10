import express from 'express'

const router = express.Router()

// controllers
import { login, register } from '../controllers/auth.js'

router.post('/register', register)
router.post('/login', login)

export default router