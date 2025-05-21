






import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Input,
} from "@chakra-ui/react";
import {
   Table,
     Thead,
     Tbody,
    
    Tr,
     Th,
     Td,
    
    TableContainer,
    } from '@chakra-ui/react'
import { Formcontainer } from "./Formcontainer";
 import { Loader } from "./components/Loader";
import { Message } from "./components/Message";
import { getuserdetails, userupdateprofile } from "./action/useraction";
import { orderprofile } from "./action/orderAction";
import { USER_UPDATEPROFILE_RESET } from "./constant/userconstant";
import {IoWarning}  from "react-icons/io5"
import { Link as RouterLink } from "react-router-dom";
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

 const orderProfile=useSelector((state)=>state.orderProfile)


const {loading:loadingprofile,orders,error:erroroderprof}=orderProfile

  const updateprofile=useSelector((state)=>state.updateprofile)
  const {success}=updateprofile
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState(null);
  // useEffect(() => {
  //   if (!userInfo) {
  //     navigate("/login");
  //   } else {
  //     if (!user || !user._id || user._id !== userInfo._id) {
  //       console.log("Fetching user details...");
  //       dispatch(getuserdetails(userInfo._id));
       
  //       console.log("Orders:", orders);

  //     } else {
  //       console.log("Setting user details:", user);
  //       console.log(orders)
  //       setName(user.name || "");
  //       setEmail(user.email || "");
  //       dispatch({ type: USER_UPDATEPROFILE_RESET });
  //       dispatch(orderprofile())
  //     }
  //   }
  // }, [dispatch, navigate,userInfo, user,success,orders]);
  
  useEffect(() => {
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user || !user._id || user._id !== userInfo._id) {
        console.log("Fetching user details...");
        dispatch(getuserdetails(userInfo._id));
        dispatch(orderprofile());
      } else {
        console.log("Setting user details:", user);
        setName(user.name || "");
        setEmail(user.email || "");
        dispatch({ type: USER_UPDATEPROFILE_RESET });
  
        // Fetch orders only if not already fetched
        if (!orders || orders.length === 0) {
          console.log("Fetching user orders...");
          dispatch(orderprofile());
        }
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);
  
  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
    } else {
      dispatch(userupdateprofile({ id: user._id, name, email, password }));
      //        
      // Dispatch update profile action here
      console.log("Profile updated:", { name, email, password });
      setMessage(null);
    }
  };

  return (
    <Grid templateColumns={{ sm: "1fr", md: "1fr " }}>
      <Flex w="full" alignItems="center" justifyContent="center" py="5">
        <Formcontainer>
          <Heading as="h1" mb="8" fontSize="3xl">
            User Profile
          </Heading>
           {success && <Message type="success">profile updated</Message>}
          {message && <Message type="error">{message}</Message>}
          {error && <Message type="error">{error}</Message>}

          <form onSubmit={submitHandler}>
            <Grid templateColumns={{ base: "1fr", sm: "1fr " }} gap={4}>
              <FormControl id="name">
                <FormLabel>Name</FormLabel>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Enter name"
                />
              </FormControl>

              <FormControl id="email">
                <FormLabel>Email Address</FormLabel>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter email"
                />
              </FormControl>
            </Grid>

            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4} mt={4}>
              <FormControl id="password">
                <FormLabel>New Password</FormLabel>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </FormControl>

              <FormControl id="confirmPassword">
                <FormLabel>Confirm Password</FormLabel>
                <Input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm password"
                />
              </FormControl>
            </Grid>

            <Button type="submit" colorScheme="teal" mt="4" isLoading={loading} isDisabled={!name || !password}>
              Update Profile
            </Button>
          </form>
        </Formcontainer>
        <Flex direction="column">
 <Heading as="h2" mb="2">My Orders</Heading>

 {loadingprofile ? <Loader /> : erroroderprof ? (
   <Message type="error">{erroroderprof}</Message>
  ) : (
    <TableContainer>
      <Table variant="striped">
         <Thead>
           <Tr>
            <Th>ID</Th>
            <Th>Date</Th>
           <Th>Total Amount</Th>
           <Th>Paid</Th>           <Th>Delivered</Th>
           <Th>Action</Th>
          </Tr>
        </Thead>
       <Tbody>
  {Array.isArray(orders) && orders.length > 0 ? (
    orders.map((order) => (
      <Tr key={order._id}>
        <Td>{order._id}</Td>
        <Td>{new Date(order.createdAt).toLocaleDateString()}</Td>
        <Td>Ksh {order.totalPrice}</Td>
        <Td>
          {order.isPaid ? (
            new Date(order.PaidAt).toLocaleDateString()
          ) : (
            <IoWarning color="red" />
          )}
        </Td>
        <Td>
          {order.isDelivered ? (
            new Date(order.DeliveredAt).toLocaleDateString()
          ) : (
            <IoWarning color="red" />
          )}
        </Td>
        <Td>
          <Button
            as={RouterLink}
            to={`/order/${order._id}`}
            colorScheme="blue"
          >
            View Order
          </Button>
        </Td>
      </Tr>
    ))
  ) : (
    <Tr>
      <Td colSpan="6" textAlign="center">
        No Orders Found
      </Td>
    </Tr>
  )}
</Tbody>

      </Table>
   </TableContainer>
  )}
</Flex>
      </Flex>
    </Grid>
  );
};


export default ProfileScreen;



