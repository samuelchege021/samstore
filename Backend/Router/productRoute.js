

 import express from 'express';
import { getproductbyid, gettproducts,deleteproduct,createproduct,updateproduct, createProductReview } from '../controller/productcontroller.js';

import {admin,protect} from '../middleware/authmiddleware.js'
const router = express.Router();

// Get all products
router.route('/').get(gettproducts).post(protect,admin,createproduct)

// Get a single product by ID
router.route('/:id').get(getproductbyid).delete(protect,admin,deleteproduct).put(protect,admin,updateproduct);
router.route('/:id/reviews').post(protect,createProductReview)
export default router;
