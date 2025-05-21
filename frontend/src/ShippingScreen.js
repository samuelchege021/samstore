import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {ShippingAddress} from "./action/cartAction"; // Ensure this is correctly imported
import {countries} from "./data/countries";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select
} from "@chakra-ui/react";
import { Checkout } from "./components/Checkout";

export const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  // State for shipping details
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const [postalCode, setPostalCode] = useState(shippingAddress?.postalCode || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(ShippingAddress({ address, city, country, postalCode }));
    navigate("/payment");
  };

  return (
    <Flex w="full" alignItems="center" justifyContent="center">
      <Box w="lg" p="6" boxShadow="lg" borderRadius="md" bg="white">
        <Heading as="h1" mb="6" fontSize="2xl" textAlign="center">
          Shipping
        </Heading>
        <Checkout step1 step2/>

        <form onSubmit={submitHandler}>
          <FormControl id="address" mb="4">
            <FormLabel>Address</FormLabel>
            <Input 
              type="text" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter address"
            />
          </FormControl>

          <FormControl id="city" mb="4">
            <FormLabel>City</FormLabel>
            <Input 
              type="text" 
              value={city} 
              onChange={(e) => setCity(e.target.value)}
              placeholder="Enter city"
            />
          </FormControl>

          <FormControl id="country" mb="4">
            <FormLabel>Country</FormLabel>
            <Select 
              value={country} 
              onChange={(e) => setCountry(e.target.value)}
              placeholder="Select country"
            >
              {countries.map((c) => (
                <option key={c.code} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl id="postalCode" mb="4">
            <FormLabel>Postal Code</FormLabel>
            <Input 
              type="text" 
              value={postalCode} 
              onChange={(e) => setPostalCode(e.target.value)}
              placeholder="Enter postal code"
            />
          </FormControl>

          <Button 
            type="submit" 
            colorScheme="teal" 
            width="full" 
            mt="4"
          >
            Continue
          </Button>
        </form>
      </Box>
    </Flex>
  );
};
