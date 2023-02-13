import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import categoryRoutes from './routes/category.js'
import productRoutes from './routes/product.js'
import morgan from 'morgan'
import cors from 'cors'

dotenv.config()

const app = express()

// db
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('DB Connected 💾'))
.catch((err) => console.log("DB ERROR => ", err ))

// middlewares
app.use(cors()) // for axios petitions
app.use(morgan('dev')) // requests logger
app.use(express.json())

// routes
app.use("/api", authRoutes)
app.use("/api", categoryRoutes)
app.use("/api", productRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Node server is running on port ${PORT} 🚀`)
});

