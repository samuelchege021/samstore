// import asyncHandler from 'express-async-handler'


// import User from '../model/userModel.js'





// const authuser=asyncHandler(async(req,res
// )=>{

// const {email,password}=req.body;

// const user=await User.findOne({email});




// if(user&& (await user.matchpassword(password)) ){

// res.json({
// _id:user._id,
// name:user.name,
// email:user.email,
// isAdmin:user.isAdmin,
// token:null,



// })

// }else{
//     res.status(401);
//     throw new Error("invalid email or password")

// }

// })


// export {authuser}
/*   
@DESC auth user

@route post /api/users/login
acess public

*/
import asyncHandler from 'express-async-handler';
import User from '../model/userModel.js';
import generateToken from '../utlis/generatetoken.js';
import { Error } from 'mongoose';

const authuser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {  // ✅ Fixed function name
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),  // TODO: Add JWT token
      
    });
    console.log(token)
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});





/*   
@DESC get profile

@route post /api/users/profile
acess private

*/
const getuserprofile=asyncHandler(async(req,res)=>{

  const user=await User.findById(req.user._id)
  
  if (user){
  
  
      res.json({
  _id:user._id,
  name:user.name,
  email:user.email,
  isAdmin:user.isAdmin
  
  
  
      })
  
  
  
      
  }
  
  else{
  
      res.status(404);
      throw new Error("user not found ")
  }
  
  
  
  
  })
  
  


/*   
@DESC  register new user

@route post /api/users/register
acess public

*/
const registeruser=asyncHandler(async(req,res)=>{

const{name,email,password}=req.body


const userexists=await User.findOne({email})


if (userexists){

res.status(400)  /* bad exist  */

throw new Error('user already exists')

}

const user=await User.create({name,email,password});

if (user){

// 201;;okay succefuly created



res.status().json({
_id:user._id,
name:user.name,
email:user.email,
isAdmin:user.isAdmin,
token:generateToken(user._id)



})




}


else{

res.status(400);

throw new Error("invalid user data")



}


})

// update userprofile

// Route put /api/users/profile
// acess private




const updateuser=asyncHandler(async(

req,res)=>{

const user=await User.findById(req.user._id)


if (user){

user.name=req.body.name||user.name,
user.email=req.body.email||user.email


if(req.body.password){
user.password=req.body.password


}


const updateduser=await user.save();

res.json({
  _id:user._id,
  name:updateduser.name,
  email:updateduser.email,
  isAdmin:updateduser.isAdmin,
  token:generateToken(updateduser._id)

});
}



else{

  res.status(404)
  throw new Error("user not found")
}

}


)




// get all users
//  Get /api/users/
// access private/admin

const getusers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});






//  Delete users
//  Delete /api/users/:id
// access private/admin

const  deleteuser=asyncHandler(async(req,res)=>{

const  user=await User.findById(req.params.id)
const currentUser = req.user;

if (user._id.toString() === currentUser._id.toString()) {
  res.status(403);
  throw new Error("Admins cannot delete their own account.");
};
if (user){

// await user.remove();
await user.deleteOne();
res.json({message:"deleted"})
}

res.status(404);
throw new Error("user not found")

})


//  update user
//  @route put /api/users/:id
// access private/admin



const updateUser= asyncHandler(async(req,res)=>{

const user=await User.findById(req.params.id)

if (user){

user.name=req.body.name|| user.name
user.email=req.body.email ||user.email
user.isAdmin = req.body.isAdmin !== undefined ? req.body.isAdmin : user.isAdmin;

// user.isAdmin=res.body.isAdmin



const updatedUser=await user.save()

res.json({
_id:updatedUser._id,
name:updatedUser.name,
email:updatedUser.email,
isAdmin:updatedUser.isAdmin

}



);}

else{

  res.status(404)
  throw new Error('not found')
}


});







//  update singleuserBYID
//  @route get /api/users/:id
// access private/admin



const getsingleUserbyid= asyncHandler(async(req,res)=>{

  const user=await User.findById(req.params.id).select('-password')
  
  if (user){
  
  
  
  
  res.json(user)
  
  
  
  }
  
  else{

    res.status(404)
    throw new Error('user not found')
  }
  
  });
  
  
  
  export { authuser,getuserprofile,registeruser,updateuser,getusers,deleteuser ,updateUser,getsingleUserbyid};
  
  
  
  