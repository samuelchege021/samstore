import express from "express";
import { addOrderItems, getorderbyid, updateTopaid,getmyorders,getorders,updateOrdersTodelivered } from "../controller/ordercontroller.js";
import { protect,admin } from "../middleware/authmiddleware.js";


const router = express.Router();

// POST /api/orders - Create a new order
router.route('/').post(protect, addOrderItems).get(protect,admin,getorders);


// GET /api/orders/:id - Get order by ID
router.route('/myorders').get(protect, getmyorders);
router.route('/:id').get(protect, getorderbyid);

// PUT /api/orders/:id/pay - Mark an order as paid

router.route('/:id/pay').put(protect, updateTopaid);

router.route('/:id/deliver').put(protect,admin,updateOrdersTodelivered)
export default router;
