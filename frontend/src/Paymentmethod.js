import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { paymentmethod } from "./action/cartAction";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { Checkout } from "./components/Checkout";

export const PaymentMethodScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress, PaymentMethod } = cart;

  const [paymentMethodRadio, setPaymentMethodRadio] = useState(PaymentMethod || "PayPal");

  useEffect(() => {
    if (!shippingAddress) {
      navigate("/shipping");
    }
  }, [navigate, shippingAddress]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(paymentmethod(paymentMethodRadio));
    navigate("/placeholder"); // Change "/placeholder" to your actual next route.
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box w="lg" p="6" boxShadow="lg" borderRadius="md" bg="white">
        <Heading as="h1" mb="6" fontSize="2xl" textAlign="center">
          Payment Method
        </Heading>
        <Checkout step1 step2 step3 />

        <form onSubmit={submitHandler}>
          <FormControl as="fieldset" mb="4">
            <FormLabel as="legend">Select Payment Method</FormLabel>
            <RadioGroup value={paymentMethodRadio} onChange={setPaymentMethodRadio}>
              <Stack spacing={3}>
                <Radio value="PayPal">PayPal</Radio>
                {/* <Radio value="Stripe">Stripe</Radio>
                <Radio value="CashOnDelivery">Cash on Delivery</Radio> */}
              </Stack>
            </RadioGroup>
          </FormControl>

          <Button type="submit" colorScheme="teal" width="full" mt="4">
            Continue
          </Button>
        </form>
      </Box>
    </Flex>
  );
};
