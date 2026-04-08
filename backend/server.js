import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoutes.js'
import productRouter from './routes/productRoutes.js'
import cartRouter from './routes/cartRoutes.js'
import orderRouter from './routes/orderRoutes.js'

const app = express()

// connect DB & cloudinary
connectDB()
connectCloudinary()

// middleware
app.use(express.json())
app.use(cors())

// routes
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// test route
app.get('/', (req, res) => {
  res.send("API Working ✅")
})

// ✅ IMPORTANT: export app (NO app.listen)
export default app