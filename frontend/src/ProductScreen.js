import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  Heading,
  Image,
  Select,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { cartaddAction } from "./action/cartAction";
import { Link as Routerlink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singlelistproduct } from "./action/siingleproductlistaction";
import Rating from "./components/Rating";
import { Loader } from "./components/Loader";
import { Message } from "./components/Message";
import { producthandleReview } from "./action/productlistaction";
import {  PRODUCT_REVIEW_RESET } from "./constant/productconstant";

const ProductScreen = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [idError, setIdError] = useState(null);
  const [qty, setqty] = useState(1);
  const [rating, setrating] = useState(0);
  const [comment, setcomment] = useState("");

  const singleproductlist = useSelector((state) => state.singleproductlist);
  const { loading, error, product } = singleproductlist;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productreview = useSelector((state) => state.productreview);
  const { loading: rloading, success: rsuccess, error: rerror } = productreview;

  useEffect(() => {
    if (!id || !/^[0-9a-fA-F]{24}$/.test(id)) {
      setIdError("Invalid product ID in URL");
      return;
    }

    if (rsuccess) {
      alert("Review submitted");
      setrating(0);
      setcomment("");
      dispatch({type:PRODUCT_REVIEW_RESET})
    }

    dispatch(singlelistproduct(id));
  }, [id, dispatch, rsuccess]);

  if (idError) return <Message type="error">{idError}</Message>;

  const addtocart = () => {
    dispatch(cartaddAction(id, qty));
    navigate(`/cart`);
  };

  const submithandler = (e) => {
    e.preventDefault();
    dispatch(producthandleReview(id, { rating, comment }));
  };

  return (
    <>
      <Flex mb="5" color="grey" gap="10">
        <Button as={Routerlink} to="/">Go back</Button>
      </Flex>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : !product || Object.keys(product).length === 0 ? (
        <Message type="error">Product not found</Message>
      ) : (
        <Grid templateColumns="5fr 4fr 3fr" gap="6">
          {/* Image */}
          {product.image ? (
            <Image src={product.image} alt={product.name} borderRadius="5" />
          ) : (
            <Text>No Image Available</Text>
          )}

          {/* Product Info */}
          <Flex direction="column">
            <Heading as="h2" fontSize="4xl" mb="2">{product.name}</Heading>
            <Rating value={product.rating} text={`${product.numReviews} reviews`} />
            <Heading as="h2" mt="5" mb="5" fontWeight="bold" fontSize="4xl" color="teal.600">
              Ksh {product.price}
            </Heading>
            <Text>{product.description}</Text>
          </Flex>

          {/* Add to Cart */}
          <Flex direction="column" border="1px solid #ddd" p="4" borderRadius="md">
            <Flex justifyContent="space-between" py="2">
              <Text fontWeight="bold">Price:</Text>
              <Text>Ksh {product.price}</Text>
            </Flex>
            <Flex justifyContent="space-between" py="2">
              <Text fontWeight="bold">Status:</Text>
              <Text color={product.countInStock > 0 ? "green.500" : "red.500"}>
                {product.countInStock > 0 ? "In Stock" : "Not Available"}
              </Text>
            </Flex>

            <Flex align="center" gap="2" mt="2">
              <Text>Qty</Text> 
              <Select value={qty} onChange={(e) => setqty(Number(e.target.value))}>
                {[...Array(product.countInStock).keys()].map((i) => (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                ))}
              </Select> 
              <Flex align="center" gap="2" mt="2">
  
  
</Flex>

            </Flex>

            <Button
              onClick={addtocart}
              bgColor="gray"
              color="teal.300"
              my="4"
              isDisabled={product.countInStock === 0}
            >
              Add to Cart
            </Button>
          </Flex>

          {/* Review Section */}
          <Box bgColor="white" rounded="md" mt="10" borderColor="gray.300" borderWidth="1px" p="5">
  <Heading mb="4">Write a Review</Heading>

  {product.reviews?.length === 0 ? (
    <Message>No reviews</Message>
  ) : (
    <Box px="4" bgColor="white" rounded="1" mb="5">
      {product.reviews?.map((review) => (
        <Box key={review._id} mb="5">
          <Flex justifyContent="space-between" alignItems="center">
            <Box>
              <Text fontSize="lg" fontWeight="bold">
                {review.name}
              </Text>
              <Rating value={review.rating} />
            </Box>
            <Text mt="2">{review.comment}</Text>
          </Flex>
        </Box>
      ))}
    </Box>
  )}


            {rerror && <Message type="error">{rerror}</Message>}

            {userInfo ? (
              <form onSubmit={submithandler}>
                <FormControl id="rating" mb="3">
                  <FormLabel>Rating</FormLabel>
                  <Select
                    placeholder="Select rating"
                    value={rating}
                    onChange={(e) => setrating(Number(e.target.value))}
                  >
                    <option value="1">1 - Poor</option>
                    <option value="2">2 - Okay</option>
                    <option value="3">3 - Good</option>
                    <option value="4">4 - Very Good</option>
                    <option value="5">5 - Excellent</option>
                  </Select>
                </FormControl>

                <FormControl id="comment" mb="3">
                  <FormLabel>Comment</FormLabel>
                  <Textarea
                    value={comment}
                    onChange={(e) => setcomment(e.target.value)}
                    placeholder="Write your comment here..."
                  />
                </FormControl>

                <Button type="submit" colorScheme="blue">Submit</Button>
              </form>
            ) : (
              <Message>Please log in to write a review.</Message>
            )}
          </Box>
        </Grid>
      )}
    </>
  );
};

export default ProductScreen;
