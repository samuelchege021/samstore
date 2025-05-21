import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Listproducts, createproduct, deleteproduct } from "./action/productlistaction"
import { Loader } from "./components/Loader"
import { Message } from "./components/Message"
import { Box, Button, Flex, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"


import { Link as RouterLink } from "react-router-dom"
import { IoAdd, IoPencilSharp, IoTrashBin } from "react-icons/io5"
import { Product_CREATE_RESET } from "./constant/productconstant"



 const Productscreenlist=()=>{

const dispatch=useDispatch()

const navigate=useNavigate()
 const productlist=useSelector((state)=>state.productlist)

const{loading,error,products}=productlist;

const userLogin=useSelector((state)=>(state.userLogin))

const {userInfo}=userLogin;
 const productdelete=useSelector((state)=>state.productdelete)

const {success}=productdelete

const productcreate=useSelector((state)=>state.productcreate)
const{product:createdproduct,loading:loadins,error:errors,success:csuccess}=productcreate




// useEffect(() => {

//     dispatch({ type: Product_CREATE_RESET });
//   console.log("productcreate:", productcreate); // log the
//     if (!userInfo || !userInfo.isAdmin) {
//       navigate('/login');
//     }
  
//     if (csuccess && createdproduct) {
//         console.log("Redirecting to edit:", createdproduct._id)
//       navigate(`/admin/product/${createdproduct._id}/edit`);
//     } else {
//       dispatch(Listproducts());
//     }
//   }, [dispatch, userInfo, navigate, csuccess, createdproduct]);
useEffect(() => {

    dispatch({type:Product_CREATE_RESET})


    if (!userInfo || !userInfo.isAdmin) {
        navigate('/login');
    }
  // Handle successful product creation and redirect
  if (csuccess ) {
      console.log("Redirecting to edit:", createdproduct._id);
      navigate(`/admin/product/${createdproduct._id}/edit`);
  } 
  // Fetch the product list if no product is created or if creation failed
  else  {
      dispatch(Listproducts());
  }


 

  

}, [dispatch, userInfo, navigate, success, csuccess,createdproduct]);

const deletehandler=(id)=>{

if(window.confirm("are you sure")){

    dispatch(deleteproduct(id))
}

}

const submitcreateproduct=()=>{

dispatch(createproduct())

    
}


return(

<>
<Flex mb="5" alignitems="center" justifyContent="space-between" >


<Heading>

<Button onClick={submitcreateproduct} colorScheme="teal" >
<Icon as={IoAdd}/>

create product
</Button>


</Heading>


</Flex>

{loading?(<Loader/>):


error?(<Message type="error">{error}</Message>):(


<Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5">

<Table variant="striped"  colorScheme="gray" size="sm">

<Thead>
    <Th>Id</Th>
    <Th>Name</Th>
    <Th>Price</Th>
    <Th>category</Th>
    <Th>brand</Th>









</Thead>


<Tbody>
{

  Array.isArray(products)&& products.map((product)=>(

<Tr key={product._id}>

<Td>{product._id}</Td>
<Td>{product.name}</Td>
<Td>{product.price}</Td>
<Td>{product.category}</Td>
<Td>{product.brand}</Td>


<Td>

<Flex justifyContent="flex-end" alignItems="center"> 

<Button mr="4" as={RouterLink} to={`/admin/product/${product._id}/edit`}>
<Icon as={IoPencilSharp}/>



</Button>

<Button onClick={()=>deletehandler(product._id)}           mr="4" >
<Icon as={IoTrashBin}/>


</Button>

</Flex>

</Td>



</Tr>

    ))
}





</Tbody>






</Table>



</Box>


)

}







</>)






}




export default Productscreenlist