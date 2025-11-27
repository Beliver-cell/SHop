import express from 'express'
import { placeOrder, placeOrderPaystack, updateStatus, allOrders, userOrders, verifyPaystack } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()

orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/paystack', authUser, placeOrderPaystack)

orderRouter.post('/userorders', authUser, userOrders)

orderRouter.post('/verifyPaystack', authUser, verifyPaystack)

export default orderRouter;
