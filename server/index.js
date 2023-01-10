import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import authRoutes from './routes/auth.js'
import morgan from 'morgan'

dotenv.config()

const app = express()

// db
mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log('DB Connected'))
.catch((err) => console.log("DB ERROR => ", err ))

// middlewares
app.use(morgan('dev'))
app.use(express.json())

// routes
app.use("/api", authRoutes)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
    console.log(`Node server is running on port ${PORT}`)
});

