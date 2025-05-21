import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, Flex } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { IoCaretForwardSharp } from "react-icons/io5";

export const Checkout = ({ step1, step2, step3, step4 }) => {
  return (
    <Flex justifyContent="center" mb="8">
      <Breadcrumb separator={<IoCaretForwardSharp color="gray.800" />}>
        {/* Step 1: Login */}
        <BreadcrumbItem>
          {step1 ? (
            <BreadcrumbLink as={RouterLink} to="/login">Login</BreadcrumbLink>
          ) : (
            <BreadcrumbLink color="gray.500" isDisabled>Login</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Step 2: Shipping */}
        <BreadcrumbItem>
          {step2 ? (
            <BreadcrumbLink as={RouterLink} to="/shipping">Shipping</BreadcrumbLink>
          ) : (
            <BreadcrumbLink color="gray.500" isDisabled>Shipping</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Step 3: Payment */}
        <BreadcrumbItem>
          {step3 ? (
            <BreadcrumbLink as={RouterLink} to="/payment">Payment</BreadcrumbLink>
          ) : (
            <BreadcrumbLink color="gray.500" isDisabled>Payment</BreadcrumbLink>
          )}
        </BreadcrumbItem>

        {/* Step 4: Place Order */}
        <BreadcrumbItem>
          {step4 ? (
            <BreadcrumbLink as={RouterLink} to="/placeorder">Place Order</BreadcrumbLink>
          ) : (
            <BreadcrumbLink color="gray.500" isDisabled>Place Order</BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </Breadcrumb>
    </Flex>
  );
};
