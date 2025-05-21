

import { Box, Flex, Heading, Image, Link, Text } from "@chakra-ui/react";
import Rating from "./Rating";
import { Link as Routerlink } from "react-router-dom";

const ProductCard = ({ product }) => {
  return (
    <Link as={Routerlink} to={`/products/${product._id}`} _hover={{ textDecor: "none" }}>
      <Box bg="whiteAlpha.100" _hover={{ shadow: "md" }} borderRadius="lg">
        <Image
          src={product.image}
          alt={product.name}
          minH="400px"
          w="100"
          objectFit="cover"
          p="-1.5"
          py="-12"
          px="-14"
        />
        <Flex py="5" px="4" justifyContent="space-between" direction="column">
          <Heading as="h4" fontSize="lg" mb="3">{product.name}</Heading>
        </Flex>
        <Rating value={product.rating} />
        <Flex alignItems="center">
          <Text fontSize="2xl" fontWeight="bold" color="blue.600">Ksh {product.price}</Text>
        </Flex>
      </Box>
    </Link>
  );
};

export default ProductCard;