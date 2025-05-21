import { Box, Flex, Icon,Text } from "@chakra-ui/react"

import {IoStar,IoStarHalf,IoStarOutline} from "react-icons/io5"






const Rating=({value,text,color="500"})=>{


return (


<Flex align="flex-start">


    <Box mr="2">

    <Icon color={color}  as={value>=1?IoStar :value>=0.5?IoStarHalf :IoStarOutline} >     </Icon>

<Icon color={color}  as={value>=2?IoStar :value>=1.5?IoStarHalf :IoStarOutline} >     </Icon>
<Icon color={color}  as={value>=3?IoStar :value>=2.5?IoStarHalf :IoStarOutline} >     </Icon>
<Icon color={color}  as={value>=4?IoStar :value>=3.5?IoStarHalf :IoStarOutline} >     </Icon>






    </Box>


<Text >{text}</Text>

</Flex>




)






}



export default Rating