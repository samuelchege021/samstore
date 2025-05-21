import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import {  Link as  RouterLink, useNavigate, useParams } from "react-router-dom";
import {  Product_UPDATE_RESET } from "./constant/productconstant";
import {  updateproduct } from "./action/productlistaction";
import { Flex, Heading ,FormControl,FormLabel,Spacer,Button,Link, Input




} from "@chakra-ui/react";
import axios from 'axios'
import { Formcontainer } from "./Formcontainer";
import { Message } from "./components/Message";
import { Loader } from "./components/Loader";
import { singlelistproduct } from "./action/siingleproductlistaction";
import { Product_Details_Reset } from "./constant/siingleproduct";



const Producteditscreen=()=>{


const dispatch=useDispatch();


const navigate=useNavigate()

const {id:productId}=useParams()


const [name,setname]=useState("");

const [price,setprice]=useState("");



const [image,setimage]=useState("");

const [brand,setbrand]=useState("");

const [category,setcategory]=useState("")


const [description,setdescription]=useState("");

const [countInStock,setcountInstock]=useState("")

const   singleproductlist=useSelector((state)=>state. singleproductlist)

const {loading,error,product}= singleproductlist;

const productupdate=useSelector((state)=>state.productupdate)

const {success:usucess,loading:loadingupdate,error:errorupdate}=productupdate

const [uploading,setuploading]=useState(false)

// useEffect(() => {


//     dispatch({type:Product_Details_Reset})
//     if ( usucess) {
//         console.log("my sucess",usucess)
//       dispatch({ type: Product_UPDATE_RESET });
//       navigate("/admin/productlist")  // Always reset first


     
//     }
    

//      else{

//         if (!product || !product.name || product._id !== productId) {
//             dispatch(singlelistproduct(productId));
//           }
          
    
    
    
    
//     else {
        
//       setname(product.name);
//       setprice(product.price);
//       setimage(product.image);
//       setbrand(product.brand);
//       setcategory(product.category);
//       setcountInstock(product.countInStock);
//       setdescription(product.description);
//     }}
//   }, [dispatch, navigate, productId, product, usucess]);
//   console.log(product)
//   useEffect(() => {
//     if (usucess) {
//       navigate("/admin/productlist");
//     }
//   }, [usucess, navigate]);
  

useEffect(() => {
    dispatch({ type: Product_Details_Reset });
  
    if (usucess) {
      console.log("my success", usucess);
      dispatch({ type: Product_UPDATE_RESET });
      navigate("/admin/productlist");
    } else if (!product || product._id !== productId) {
      dispatch(singlelistproduct(productId));
    }
  }, [dispatch, navigate, productId, usucess]);
  
  // Separate useEffect for setting product details
  useEffect(() => {
    if (product) {
      setname(product.name || "");
      setprice(product.price || "");
      setimage(product.image || "");
      setbrand(product.brand || "");
      setcategory(product.category || "");
      setcountInstock(product.countInStock || "");
      setdescription(product.description || "");
    }
  }, [product]);
  
  
const submithandler=(e)=>{

e.preventDefault()


console.log({ name, price, image, brand, category, description, countInStock });




dispatch(updateproduct({_id:productId,name,price,image,brand,category,description,countInStock})
)

}



const uploadhandler=async(e)=>{

const file=e.target.files[0]

const formData=new FormData();

    formData.append('image',file);
  setuploading(true)
console.log("I am here on upload file")

try {
    const config={

        headers:{
        
           'Content-Type':"multipart/form-data "

        }

        
    }


    const{data}= await axios.post('/api/uploads',formData,config)
    console.log(data)
    setimage(data)
    setuploading(false)
} catch (error) {
    console.error(error)
    setuploading(false)
}



}

    return(
        
<>


<Link as={RouterLink} to='/admin/productlist'>


Go back

</Link>

<Flex w="full" alignItems="center" justifyContent="center" py="5">

<Formcontainer>
<Heading as="h1"  mb="8" fontSize="3xl"  ></Heading>




{loadingupdate &&<Loader/>}
{errorupdate&&<Message>{errorupdate}</Message>}



{loading ?(
    <Loader/>
)   : error ?(
    <Message>{error}</Message>
):(


    
<form onSubmit={submithandler}> 
<FormControl id="name " >
<FormLabel>
    Name
</FormLabel>
<Input
type="text"
placeholder="enter  name"
value={name}
onChange={(e)=>setname(e.target.value)}

/>




</FormControl>

<Spacer h="4"/>






<FormControl>
<FormLabel isRequired>
    price
</FormLabel>
<Input
type="text"
placeholder="enter price"
value={price}
onChange={(e)=>setprice(e.target.value)}

/>




</FormControl>

<Spacer h="4"/>



<FormControl>
<FormLabel isRequired>
    image
</FormLabel>
<Input
type="text"
placeholder="enter image url"
value={image}
onChange={(e)=>setimage(e.target.value)}

/>


<Input type="file" id="image-file" onChange={uploadhandler}





/>


</FormControl>

<Spacer h="4"/>


<FormControl>
<FormLabel isRequired>
    brand
</FormLabel>
<Input
type="text"
placeholder="enter brand"
value={brand}
onChange={(e)=>setbrand(e.target.value)}

/>





</FormControl>

<Spacer h="4"/>

<FormControl>
<FormLabel isRequired>
    category
</FormLabel>
<Input
type="text"
placeholder="enter brand"
value={category}
onChange={(e)=>setcategory(e.target.value)}

/>





</FormControl>

<Spacer h="4"/>

<FormControl>
<FormLabel isRequired>
    CountInstock
</FormLabel>
<Input
type="text"
placeholder="counTIntock"
value={countInStock}
onChange={(e)=>setcountInstock(e.target.value)}

/>





</FormControl>

<Spacer h="4"/>


<FormControl>
<FormLabel isRequired>
    description
</FormLabel>
<Input
type="text"
placeholder="description"
value={description}
onChange={(e)=>setdescription(e.target.value)}

/>





</FormControl>

<Spacer h="4"/>


<Button type="submit" isLoading={loading} colorScheme="teal" mt="4">update</Button>
</form>
)




}









</Formcontainer>


</Flex>








</>





    )
}

export default Producteditscreen