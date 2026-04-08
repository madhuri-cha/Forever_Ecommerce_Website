import express from 'express'
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateStatus, verifyStripe, verifyRazorpay } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import { authUser } from '../middleware/auth.js'


const orderRouter = express.Router()


//Admin
orderRouter.post('/list', authUser, allOrders)
orderRouter.post('/status', authUser, updateStatus)

//payment features

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)


//user features
orderRouter.post('/userorders', authUser, userOrders)

//verify payment
orderRouter.post('/verifystripe', authUser, verifyStripe)
orderRouter.post('/verifyrazorpay', authUser, verifyRazorpay)


export default orderRouter