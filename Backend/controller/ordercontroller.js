import asyncHandler from "express-async-handler";
import Order from "../model/orderModel.js"; // Ensure correct file extension

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    console.log("Request Body:", req.body); // Log request body for debugging

    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400); /*bad request  */
      throw new Error("No order items");
    }

    if (!req.user) {
      res.status(401);
      throw new Error("User not authenticated");
    }

    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getorderbyid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error("Order not found");
    }
});

// @desc    Update order to paid
// @route   PUT /api/orders/:id/pay
// @access  Private
const updateTopaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);

    if (order) {
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time:req.body.update_time,
            email_address: req.body.email_address,
        };

        const updatedOrder = await order.save();
        res.json(updatedOrder);
    } else {
        res.status(404);ws
        throw new Error("Order not found");
    }
});


// @desc    get  log in users orders
// profile
// @route   get /api/orders/myorders
// @access  Private


const getmyorders=asyncHandler(async(req,res)=>{

const orders =await Order.find({user:req.user._id});
console.log('User ID:', req.user._id); // Check if it's a valid ObjectId
res.json(orders)



})




// @desc    get  all orders
// @route   Get /api/orders/
// @access  Private/admin


const getorders=asyncHandler(async(req,res)=>{


const orders= await Order.find({}).populate("user","name")

res.json(orders)





})



// @desc    update order to delivered
// @route   PUT/api/orders/:id/deliver
// @access  Private/admin


const updateOrdersTodelivered=asyncHandler(async(req,res)=>{

const order=await Order.findById(req.params.id)

if(order){

order.isDelivered=true;
order.isDeliveredAt=Date.now()

const updatedorder=await order.save()

res.json(updatedorder)

}
else{

res.status(404)

throw new Error('order is not found')


}



})




export { addOrderItems, getorderbyid, updateTopaid,getmyorders,getorders,updateOrdersTodelivered}