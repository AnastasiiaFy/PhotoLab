import express from 'express'
import cors from 'cors' 
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'

import userRoutes from './routes/userRoute.js'
import productRoutes from "./routes/productRoute.js"
import orderRoutes from './routes/orderRoute.js';


dotenv.config()
connectDB()

// App Config
const app = express ()

// middlewares
app.use(cors())
app.use(express.json())


// api endpoints
app.use("/api/products", productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes);

app.get('/', (req,res)=>{
    res. send ("API Working")
})

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})