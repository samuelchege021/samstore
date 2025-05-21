
import mongoose from 'mongoose'

import dotenv from 'dotenv'

import colors from 'colors'
import users from './data/user.js'
import products from './data/products.js'
import User from "./model/userModel.js"
import Product from "./model/productModel.js"
import Order from "./model/productModel.js"
import connectDb from "./config/db.js"


dotenv.config()


connectDb()




const importData=async()=>{

try{

    await Order.deleteMany({});
    await User.deleteMany({}) ;
    await User.deleteMany({}) ;

    await Product.deleteMany({});

  const createdUsers=  await User.insertMany(users);

  const adminuser=createdUsers[0]._id;


  const sampleroducts=products.map(product=>{

return {...product,user:adminuser}

  })



  console.log(createdUsers);


  await Product.insertMany(sampleroducts);

console.log('data imported'.green.inverse),
process.exit();
}catch(error){
  console.error(`${error}.red.inverse`)
  process.exit(1);
};






};



const destroydata= async ()=>{

try {
  await Order.deleteMany({});

  
  await User.deleteMany({}) ;
  await Product.deleteMany({}) ;

console.log('data destroyed'.red.inverse)
process.wait()
  
} catch (error) {

  console.error(`${error}`)
  
  process.exit(1);
}





};







if (process.argv[2]==='-d'){

  destroydata();
}else{

  importData();
}