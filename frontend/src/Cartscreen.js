

import { cartaddAction, cart_remove } from "./action/cartAction";
import { Link as RouterLink, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { IoTrashSharp } from "react-icons/io5";
import { Box, Flex, Grid, Heading, Image, Select, Text, Button } from "@chakra-ui/react";
import { Message } from "./components/Message";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id: productId } = useParams();
  const [searchParams] = useSearchParams();
  let qty = Number(searchParams.get("qty") || 1); // Convert qty to number

  useEffect(() => {
    if (productId) {
      dispatch(cartaddAction(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const remove_from_cart = (id) => {
    dispatch(cart_remove(id));
  };

  const checkouthandle = () => {
    navigate("/shipping");
;

  };

  const cart = useSelector((state) => state.cart);
  const cartitems = cart.cartitems || [];

  return (
    <Grid p={5}>
      <Box>
        <Heading>Shopping Cart</Heading>
      </Box>

      <Flex direction="column" mt={5}>
        {cartitems.length === 0 ? (
          <Message>
            Your cart is empty{" "}
            <RouterLink to="/">
              <Text as="span" color="blue.500" fontWeight="bold">
                Go back to home page
              </Text>
            </RouterLink>
          </Message>
        ) : (
          <Grid templateColumns="4fr 2fr" gap={10} w="full">
            {cartitems.map((item) => (
              <Grid
                key={item.product}
                alignItems="center"
                justifyContent="space-between"
                borderBottom="1px solid"
                borderColor="gray.200"
                py={2}
                rounded="lg"
                _hover={{ bgColor: "gray.50" }}
                templateColumns="1fr 4fr 2fr 2fr 2fr"
              >
                {/* Product Image */}
                <Image src={item.image} alt={item.name} borderRadius="lg" height="14" width="14" objectFit="cover" />

                {/* Product Name */}
                <Text fontWeight="bold" fontSize="lg">
                  <RouterLink to={`/product/${item.product}`}>{item.name}</RouterLink>
                </Text>

                {/* Product Price */}
                <Text fontSize="lg">${item.price}</Text>

                {/* Quantity Selector */}
                <Select
                  value={item.qty}
                  onChange={(e) => dispatch(cartaddAction(item.product, Number(e.target.value)))}
                >
                  {[...Array(item.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </Select>

                {/* Remove Button */}
                <Button colorScheme="red" onClick={() => remove_from_cart(item.product)}>
                  <IoTrashSharp />
                </Button>
              </Grid>
            ))}
          </Grid>
        )}

        {cartitems.length > 0 && (
          <Box mt={5} textAlign="right">
            
            <Heading as="h2" fontSize="2xl" mb="2"> subtotal( {cartitems.reduce((acc,currval)=>acc+currval.qty,0)} {""}items)</Heading>
            <Text fontSize="xl" fontWeight="bold">
              Total: ${cartitems.reduce((acc, item) => acc + item.price * item.qty, 0).toFixed(2)}
            </Text>
            <Button colorScheme="teal" mt={3} onClick={checkouthandle}>
              Proceed to Checkout
            </Button>
          </Box>
        )}
      </Flex>
    </Grid>
  );
};


export default CartScreen