import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react";

export const Message = ({ type = "info", children }) => {
  return (
    <Alert status={type} variant="subtle">
      <AlertIcon />
      {type === "error" && <AlertTitle>Error!</AlertTitle>}
      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
};


