
import { Spinner,Flex } from "@chakra-ui/react"

export const Loader=()=>{


return <div>


<Flex alignitems="center"  justifycontent="center">



<Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>



</Flex>





</div>


}