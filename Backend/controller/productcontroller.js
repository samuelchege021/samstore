

import dotenv from 'dotenv';

import Product from '../model/productModel.js';
import asyncHandler from 'express-async-handler';


dotenv.config();


// Get all products

/*   

@route post /api/products/
acess public

*/
const gettproducts=asyncHandler(async(req,res)=>{
const products=await Product.find({});
console.log("my",products)

res.json(products)


})




/*   

@route post /api/product/:id
acess public

*/
// Get a single product by ID
const getproductbyid=asyncHandler(async(req,res)=>{

  try {
      
      const product=await Product.findById(req.params.id);
      if(product){
          res.json(product)
      }
      else{
          res.status(404).json({message:"product not found"})
      }
  } catch (error) {
      res.status(500).json({message:error.message})
      console.log(error)
  }
  
  
  })


//  delete product
// @route Delete /api/products/:id

// access private admin
const deleteproduct=asyncHandler(async(req,res)=>{
const product=await Product.findById(req.params.id)
if(product){

await product.deleteOne()
res.json({message:"product removed"})

}

else{
 throw new Error("product not found")

}

}
)


//  create a  product
// @route POST /api/products/:id

// access private admin


const createproduct=asyncHandler(async(req,res)=>{

const product=new Product({name:'sample product',
price:0,
user:req.user._id,
image:'/Images/womesummer.jpg',
brand:'sample brand',
category:'sample category',
countInStock:'0',
numReviews:0,
description:'some desc...'




})

const createdproduct=await product.save();
res.status(201).json(createdproduct);

})




//  update a  product
// @route Put /api/products/:id

// access private admin


const updateproduct=asyncHandler(async(req,res)=>{

const {
    price,
    name,
    image,
    brand,
    category,
    countInStock,
    // numReviews,
    description}=req.body

const product=await Product.findById(req.params.id)

if(product){

    product.name=name
    product.price=price
    product.image=image
    product.brand=brand
    product.category=category
    product.countInStock=countInStock
    // product.numReviews=numReviews
    product.description=description
    
const updatedproduct=await product.save();
res.json(updatedproduct)
}else{


res.status(404)
 throw new Error('product not found ')

}

})





//  create new review
// @route Post  /api/products/:id/reviews

// access private
const createProductReview = asyncHandler(async (req, res) => {
    const { rating, comment } = req.body;
  
    const product = await Product.findById(req.params.id);
  
    if (product) {
      const alreadyReviewed = product.reviews.find(
        (review) => review.user.toString() === req.user._id.toString()
      );
  
      if (alreadyReviewed) {
        res.status(400);
        throw new Error("Product already reviewed");
      }
  
      const review = {
        name: req.user.name,
        rating: Number(rating),
        comment,
        user: req.user._id,
      };
  
      product.reviews.push(review);
      product.numReviews = product.reviews.length;
      product.rating =
        product.reviews.reduce((acc, currval) => currval.rating + acc, 0) /
        product.reviews.length;
  
      await product.save();
      res.status(201).json({ message: "Review added" });
    } else {
      res.status(404);
      throw new Error("Product not found");
    }
  });
  




export {gettproducts,getproductbyid,deleteproduct,createproduct,updateproduct,createProductReview};