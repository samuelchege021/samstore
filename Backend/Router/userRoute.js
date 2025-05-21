
import express from "express";

import { authuser,getuserprofile,registeruser,updateuser,getusers,deleteuser,updateUser,getsingleUserbyid} from "../controller/usercontroller.js";

import { admin, protect } from "../middleware/authmiddleware.js";

const router = express.Router()

router.route('/').post(registeruser).get(protect,admin,getusers);

router.post('/login',authuser);
router.route('/profile').get(protect,getuserprofile).put(protect,updateuser);
router.route('/:id').delete(protect,admin,deleteuser).put(protect,admin,updateUser).get(protect,admin,getsingleUserbyid)


export default router;
