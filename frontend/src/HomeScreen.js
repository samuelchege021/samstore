import { Flex, Grid, Heading } from "@chakra-ui/react";
import ProductCard from "./components/ProductCard";
import { useEffect } from "react";

import {useDispatch,useSelector} from 'react-redux'
import { Listproducts } from "./action/productlistaction";
import { Loader } from "./components/Loader";
import { Message } from "./components/Message";
// import axios from "axios";

// const APP_URL = "http://localhost:5000";

const HomeScreen = () => {
    // const [products, setProducts] = useState([]); 

    const dispatch=useDispatch()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(Listproducts())
                // setProducts(data);
                // console.log("Products are",products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };
        fetchProducts();
    }, [dispatch]);

const productlist=useSelector((state)=>state.productlist)
  const {products,loading,error}=productlist

  console.log("Product List State:", { products, loading, error }); // Debug

  console.log("Products State:", products);

  return (
    <Flex direction="column" p="4" width="100%">
      <Heading as="h2" mb="8" fontSize="3xl" mt="-2">
        Latest Products
      </Heading>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message key={error} type="error">{error}</Message>
      ) : !Array.isArray(products) ? (
        <Message type="info">Products not loaded correctly: {JSON.stringify(products)}</Message>
      ) : (
        <Grid
          templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(3, 1fr)", lg: "repeat(4, 1fr)" }}
          gap={4}
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </Grid>
      )}
    </Flex>
  );
};

export default HomeScreen
