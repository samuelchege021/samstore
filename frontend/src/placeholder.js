import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {createOrder} from './action/orderAction'
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Image,
  List,
  ListItem,
  Stack,
  Text,
  Grid,
  VStack,
} from "@chakra-ui/react";
import { Checkout } from "./components/Checkout";

export const Placeholderscreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);

const dispatch=useDispatch()

const ordercreate=useSelector((state)=>state.ordercreate)


const{order,success}=ordercreate;

  // Calculate item price (subtotal) 
  const cartItemPrice = cart.cartitems.reduce((acc, currval) => acc + currval.price * currval.qty, 0);

  // Shipping Price (free shipping for orders above 500, otherwise 5000)
  const shippingPrice = cartItemPrice > 500 ? 5000 : 0;

  // Tax Price (28% of item price)
  const taxPrice = (28 * cartItemPrice) / 100;

  // Total Price
  const totalPrice = cartItemPrice + shippingPrice + taxPrice;

  const placeOrderHandler = () => {
   
    dispatch(createOrder({

      orderItems: cart.cartitems,
      shippingAddress: cart.shippingAddress,
      paymentMethod: cart.paymentMethod,
      itemsPrice: cartItemPrice, // Use calculated subtotal
      taxPrice: taxPrice,
      shippingPrice: shippingPrice,
      totalPrice: totalPrice,

    }))
  };
  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);  
    }
  }, [success, navigate, order]);
  
  return (

    <Grid  templateColumns="3fr 2fr gap 20">

<Flex direction="column"w="full" alignItems="center" justifyContent="center" py={6}>
      <Box w="lg" p={6} boxShadow="lg" borderRadius="md" bg="white">
        <Heading as="h1" fontSize="2xl" textAlign="center" mb={6}>
          Order Summary
        </Heading>

        <Checkout step1 step2 step3 step4 />

        {/* Order Items Section */}
        <Box mb={6}>
          <Heading size="md" mb={3}>
            Order Items
          </Heading>
          {cart.cartitems.length === 0 ? (
            <Text color="red.500">Your cart is empty.</Text>
          ) : (
            <List spacing={3}>
              {cart.cartitems.map((item) => (
                <ListItem key={item.product} p={3} shadow="sm" borderWidth="1px" borderRadius="lg">
                  <Flex align="center" justify="space-between">
                    <Image src={item.image} alt={item.name} boxSize="50px" borderRadius="md" />
                    <Text flex="1" mx={3}>{item.name} (x{item.qty})</Text>
                    <Text fontWeight="bold">Ksh {item.price * item.qty}</Text>
                  </Flex>
                </ListItem>
              ))}
            </List>
          )}
        </Box>

        {/* Shipping Details */}
        <VStack align="stretch" spacing={3}>
          <Text><strong>Shipping Address:</strong> {cart.shippingAddress?.address || "Not Provided"}</Text>
          <Text><strong>City:</strong> {cart.shippingAddress?.city || "Not Provided"}</Text>
          <Text><strong>Country:</strong> {cart.shippingAddress?.country || "Not Provided"}</Text>
          <Text><strong>Postal Code:</strong> {cart.shippingAddress?.postalCode || "Not Provided"}</Text>
          <Text><strong>Payment Method:</strong> {cart.paymentMethod || "Not Selected"}</Text>
        </VStack>

        <Divider my={4} />

        {/* Order Summary */}
        <Flex direction="column"><Box>
          <Heading size="md" mb={3}>Summary</Heading>
          <Stack spacing={3}>
            <Flex justify="space-between">
              <Text>Subtotal:</Text>
              <Text fontWeight="bold">Ksh {cartItemPrice.toFixed(2)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Shipping:</Text>
              <Text fontWeight="bold">Ksh {shippingPrice.toFixed(2)}</Text>
            </Flex>
            <Flex justify="space-between">
              <Text>Tax (28%):</Text>
              <Text fontWeight="bold">Ksh {taxPrice.toFixed(2)}</Text>
            </Flex>
            <Divider />
            <Flex justify="space-between">
              <Text fontSize="xl" fontWeight="bold">Total:</Text>
              <Text fontSize="xl" fontWeight="bold">Ksh {totalPrice.toFixed(2)}</Text>
            </Flex>
          </Stack>
        </Box></Flex>
        

        {/* Place Order Button */}
        <Button 
          colorScheme="yellow" 
          mt={5} 
          w="full" 
          onClick={placeOrderHandler} 
          isDisabled={cart.cartitems.length === 0}
        >
          Place Order
        </Button>
      </Box>
    </Flex>
  


    </Grid>
  );
};