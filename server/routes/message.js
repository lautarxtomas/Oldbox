import express from "express";
import controller from '../controllers/message.js'

const router = express.Router()

router.post('/messages', controller.save)
router.get('/messages', controller.getMessages)

export default router