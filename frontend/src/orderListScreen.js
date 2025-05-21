import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ordermylist } from "./action/orderAction"
import { Box, Heading, Icon, Table, Tbody, Td, Th, Thead, Tr ,Button,Flex} from "@chakra-ui/react"
import { Loader } from "./components/Loader"
import { Message } from "./components/Message"
import { IoCloseCircleSharp } from "react-icons/io5"
import { IoCheckmarkCircleSharp } from "react-icons/io5"


import { Link as RouterLink } from "react-router-dom"


const OrderScreenlist=()=>{


const dispatch=useDispatch()

const navigate=useNavigate()

const orderlist=useSelector((state)=>state.orderlist)


const {loading,error,orders}=orderlist
const userLogin=useSelector((state)=>state.userLogin)
const {userInfo}=userLogin

console.log(orders)

useEffect(()=>{
if (userInfo && userInfo.isAdmin){


    dispatch(ordermylist())
}else{

    navigate("/login")
}



},[dispatch,userInfo,navigate])





return (

<>


<Heading as="h1" fontSize="3xl" mb="5">

Orders

</Heading>



{loading ?(<Loader/>):error?(

<Message type="error">{error}</Message>

):
(


<Box bgColor="white" rounded="lg" shadow="lg" px="5" py="5"

>

<Table variant="striped" colorScheme="gray" size="sm">


<Thead>



<Tr>
    
<Th>Id</Th>

<Th>User</Th>

<Th>Date</Th>

<Th>Totalprice</Th>

<Th>paid</Th>

<Th>Delivered</Th>





    
    
    

</Tr>


</Thead>




<Tbody>


{orders.map((order) => (
  <Tr key={order._id}>
    <Td>{order._id}</Td>
    <Td>{order.user && order.user.name}</Td>
    <Td>{order.createdAt?.substring(0, 10)}</Td>
    <Td>${order.totalPrice.toFixed(2)}</Td>
    <Td>
      {order.isPaid ? (
        order.paidAt?.substring(0, 10)
      ) : (
        <Icon as={IoCloseCircleSharp} color="red.600" h={8} w={8} />
      )}
    </Td>
   
    <Td>
  {order.isDelivered ? (
    <Icon as={IoCheckmarkCircleSharp} color="green.500" h={8} w={8} />
  ) : (
    <Icon as={IoCloseCircleSharp} color="red.600" h={8} w={8} />
  )}
</Td>

    <Td>
      <Flex justifyContent="flex-end" alignItems="center">
        <Button
          mr="4"
          as={RouterLink}
          to={`/order/${order._id}`}
          size="sm"
          colorScheme="blue"
        >
          Details
        </Button>
      </Flex>
    </Td>
  </Tr>
))}







</Tbody>


















</Table>







</Box>



)

}


</>




)

}

export default OrderScreenlist