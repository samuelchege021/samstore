import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import {
  Box,
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
  Button,
} from "@chakra-ui/react";
import { getOrderDetails, orderHandleDeliver, payOrder } from "./action/orderAction"; // Fixed function name
import { Message } from "./components/Message";
import { Loader } from "./components/Loader";
import { Checkout } from "./components/Checkout";
import { ORDER_DELIVER_RESET,ORDER_PAY_RESET } from "./constant/orderconstant";

export const OrderScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: orderId } = useParams();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order = {}, loading, error } = orderDetails; // Ensure order is always an object

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingpay, success: successpay } = orderPay;


  const orderDeliver=useSelector((state)=>state.orderDeliver)

const {loading:loadingdeliver,success:successdeliver}=orderDeliver;
const userLogin=useSelector((state)=>state.userLogin);
const {userInfo}=userLogin
  useEffect(() => {
    
    dispatch({type:ORDER_PAY_RESET});
    dispatch({type:ORDER_DELIVER_RESET})
    if (orderId) {
      dispatch(getOrderDetails(orderId))
    }
  }, [dispatch, orderId,successpay,successdeliver]);

  // Calculate item prices 
  if(!loading){
    order.itemsPrice = order.orderItems.reduce(
      (acc, currval) => acc + currval.price * currval.qty,
      0
    );}
  

  // PayPal Payment Success Handler
  const successPayHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
    dispatch(getOrderDetails(orderId)); // Refresh order details after payment
  };

  if (loading) return <Loader />; // Loader while fetching order details
  if (error) return <Message type="error">{error}</Message>;

// deliver hamdler

const deliverhandler=()=>{

dispatch(orderHandleDeliver(order))
}




  return (
    <Grid templateColumns={{ base: "1fr", md: "3fr 2fr" }} gap={6} p={6}>
      <Flex direction="column" alignItems="center" w="full">
        <Box w={{ base: "full", md: "lg" }} p={6} boxShadow="lg" borderRadius="md" bg="white">
          <Heading as="h1" fontSize="2xl" textAlign="center" mb={2}>
            Order Summary
          </Heading>
          <Text textAlign="center" fontSize="md" color="gray.600">
            <strong>Name:</strong> {order?.user?.name || "N/A"}
          </Text>
          <Text textAlign="center" fontSize="md" color="gray.600" mb={4}>
            <strong>Email:</strong> {order?.user?.email || "N/A"}
          </Text>

          <Checkout step1 step2 step3 step4 />

          {/* Order Items Section */}
          <Box mb={6}>
            <Heading size="md" mb={3}>
              Order Items
            </Heading>
            {order.orderItems.length === 0 ? (
              <Text color="red.500">Your order is empty.</Text>
            ) : (
              <List spacing={3}>
                {order.orderItems.map((item) => (
                  <ListItem
                    key={item.product}
                    p={3}
                    shadow="sm"
                    borderWidth="1px"
                    borderRadius="lg"
                  >
                    <Flex align="center" justify="space-between">
                      <Image
                        src={item.image}
                        alt={item.name}
                        boxSize="50px"
                        borderRadius="md"
                      />
                      <Text flex="1" mx={3}>
                        {item.name} (x{item.qty})
                      </Text>
                      <Text fontWeight="bold">
                        Ksh {item.price * item.qty}
                      </Text>
                    </Flex>
                  </ListItem>
                ))}
              </List>
            )}
          </Box>

          {/* Shipping Details */}
          <VStack align="stretch" spacing={3}>
            <Text>
              <strong>Shipping Address:</strong> {order?.shippingAddress.address || "Not Provided"}
            </Text>
            <Text>
              <strong>City:</strong> {order?.shippingAddress.city || "Not Provided"}
            </Text>
            <Text>
              <strong>Country:</strong> {order?.shippingAddress?.country || "Not Provided"}
            </Text>
            <Text>
              <strong>Postal Code:</strong> {order?.shippingAddress?.postalCode || "Not Provided"}
            </Text>
          </VStack>

          <Divider my={4} />

          {/* Payment Method & Delivery Status */}
          <Box mb={4}>
            <Heading size="md" mb={3}>
              Payment Method
            </Heading>
            <Text>
              <strong>Method:</strong> {order?.paymentMethod?.toUpperCase() || "Not Provided"}
            </Text>
            <Text mt={2}>
              {order?.isPaid ? (
                <Message type="success">Paid on {new Date(order.paidAt).toLocaleDateString()}</Message>
              ) : (
                <Message type="error">Not Paid</Message>
              )}
            </Text>
          </Box>

          <Box mb={4}>
            <Heading size="md" mb={3}>
              Delivery Status
            </Heading>
            {order?.isDelivered ? (
              <Message type="success">Delivered on {order.deliveredAt}</Message>
            ) : (
              <Message type="error">Not Delivered</Message>
            )}
          </Box>

          <Divider my={4} />

          {/* Order Summary */}
          <Box>
            <Heading size="md" mb={3}>
              Summary
            </Heading>
            <Stack spacing={3}>
              <Flex justify="space-between">
                <Text>Subtotal:</Text>
                <Text fontWeight="bold">Ksh {order.itemsPrice.toFixed(2) || "0.00"}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Shipping:</Text>
                <Text fontWeight="bold">Ksh {order.shippingPrice.toFixed(2) || "0.00"}</Text>
              </Flex>
              <Flex justify="space-between">
                <Text>Tax (28%):</Text>
                <Text fontWeight="bold">Ksh {order.taxPrice.toFixed(2) || "0.00"}</Text>
              </Flex>
              <Divider />
              <Flex justify="space-between">
                <Text fontSize="xl" fontWeight="bold">Total:</Text>
                <Text fontSize="xl" fontWeight="bold">Ksh {order.totalPrice.toFixed(2) || "0.00"}</Text>
              </Flex>
            </Stack>
          </Box>

          {/* Payment Button */}
          {!order.isPaid && !loadingpay && (
            <Box mt={4}>
              <PayPalScriptProvider options={{ clientId: "AaATrxCSiotz8JNGW6icruCubkY2AkWfEyI7HeikSUG2qs1sQgTae2LfmacUSLs_IrfuFLSDAWwrLSpY" }}>
                <PayPalButtons
                  style={{ layout: "horizontal" }}
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: (order.totalPrice || 0).toFixed(2),  // Ensure two decimal places
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const PaymentResult = {
                        id: details.id,
                        status: details.status,
                        update_time: details.update_time,
                        email_address: details.payer.email_address,
                      };
                      successPayHandler(PaymentResult);
                    });
                  }}
                />
              </PayPalScriptProvider>
            </Box>
          )}

          {/* Loading State */}
          {loadingpay && <Loader />} {/* Show loading spinner while processing payment */}

          {/* Success Message */}
          {successpay && !order.isPaid && (
            <Message type="success">Payment Successful!</Message>
          )}
        </Box>

{/* deliver button */}

{loadingdeliver&& <Loader/>}
{userInfo &&userInfo.isAdmin &&order.isPaid && !order.isDelivered}


<Button type="Button" colorScheme="teal" onClick={deliverhandler}> 
mark as delivered


</Button>
      </Flex>
    </Grid>
  );
};
