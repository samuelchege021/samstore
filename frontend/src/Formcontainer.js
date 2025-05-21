import { Flex } from "@chakra-ui/react";

export const Formcontainer = ({ children, width = "xl" }) => {
  console.log(children); // Debugging

  return (
    <Flex direction="column" boxShadow="md" rounded="md" bgColor="white" p="10" width={width}>
      {children ?? <p>No content provided</p>}
    </Flex>
  );
};
