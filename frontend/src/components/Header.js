

import { Box, Flex, Heading, Icon, Link, MenuButton } from '@chakra-ui/react';
import { useState } from 'react';
import { HiShoppingBag, HiUser, HiOutlineMenuAlt3 } from "react-icons/hi";
import { logout } from '../action/useraction';
import {IoChevronDown} from "react-icons/io5"
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MenuButton as Button,MenuList,Menu,MenuItem } from '@chakra-ui/react';
const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const userLogin = useSelector((state) => state.userLogin);
     const { userInfo } = userLogin;
    
    const [show, setShow] = useState(false);

    const logoutHandler = () => {
        dispatch(logout()); // Should dispatch a logout action
        navigate('/'); // Should navigate to home or login page
    };

    return (
        <Flex 
            as="header" 
            justifyContent="space-between" 
            wrap="wrap" 
            py="6" 
            px="6" 
            bg="gray.800" 
            w="100%" 
            top="0" 
            pos="fixed" 
            zIndex="2"
        >
            <Heading 
                as="h2" 
                color="whiteAlpha.800" 
                size="md" 
                letterSpacing="md" 
                fontWeight="bold"
            >
                <Link 
                    as={RouterLink} 
                    to='/' 
                    _hover={{ color: "gray.800", textDecor: "none" }}
                >
                    chegestore
                </Link>
            </Heading>

            <Box 
                display={{ base: "block", md: "none" }} 
                onClick={() => setShow(!show)}
            >
                <Icon 
                    as={HiOutlineMenuAlt3} 
                    w="6" 
                    h="6" 
                    color="whiteAlpha.800"
                />
            </Box>

            <Box 
                display={{ base: show ? "block" : "none", md: "flex" }} 
                width={{ base: "full", md: "auto" }} 
                mt={{ base: '4', md: '0' }}
            >
                <Link 
                    as={RouterLink} 
                    to='/cart' 
                    fontSize="sm" 
                    letterSpacing="wide" 
                    mt={{ base: "4", md: "0" }} 
                    color="gray" 
                    fontWeight="bold" 
                    textTransform="uppercase" 
                    display="flex" 
                    alignItems="center" 
                    _hover={{ color: "white" }}
                >
                    <Icon as={HiShoppingBag} mr="1" h="4" w="4" />
                    cart
                </Link>

                {userInfo ? (
  <Menu>
    <Button as={Button}   bg="gray.800"  
  color="white"   Icon={IoChevronDown} _hover={{ textDecor: "none", opacity: "0.7" }}>
      {userInfo.name}
    </Button>
    <MenuList>
      <MenuItem as={RouterLink} to="/profile">
        Profile
      </MenuItem>
      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    </MenuList>
  </Menu>
) : (
  <Link
    as={RouterLink}
    to="/login"
    fontSize="sm"
    letterSpacing="wide"
    mt={{ base: "4", md: "0" }}
    ml={{ md: "4" }}
    color="gray"
    fontWeight="bold"
    textTransform="uppercase"
    display="flex"
    alignItems="center"
    _hover={{ color: "white" }}
  >
    <Icon as={HiUser} mr="1" h="4" w="4" />
    Login
  </Link>
)}



       {/* admim menu */}
                    

{

userInfo &&userInfo.isAdmin &&(

<Menu>
   <MenuButton textTransform="uppercase" ml="3"  color="white" fontSize="sm" fontweight="semibold" as={Button} _hover={{textDecor:"none",opacity:"0.7"}}>
 manage <Icon as={IoChevronDown}></Icon>


   </MenuButton>
    <MenuList>
      <MenuItem as={RouterLink} to="/admin/userlist">
        All users
      </MenuItem>
      <MenuItem as={RouterLink} to="/admin/productlist">
        All products
      </MenuItem>
      <MenuItem as={RouterLink} to="/admin/orderlist">
        All orders
      </MenuItem>
      <MenuItem onClick={logoutHandler}>Logout</MenuItem>
    </MenuList>
  </Menu>

)


}


                  
            </Box>
        </Flex>
    );
};

export default Header;