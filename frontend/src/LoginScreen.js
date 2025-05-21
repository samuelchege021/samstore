

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"; // Added useSelector
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom"; // Changed useParams to useSearchParams
import { Message } from "./components/Message";
import { login } from "./action/useraction";
import { Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { Formcontainer } from "./Formcontainer";

const Loginscreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
const [searchParams] = useSearchParams();
const redirect = searchParams.get("redirect") || "/";
    // Changed from useParams to useSearchParams for query parameters

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    // Added useSelector to actually get the state
    const userLogin = useSelector((state) => state.userLogin);
    const { loading, error, userInfo } = userLogin;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
            console.log("User Info:", userInfo)
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault(); // Fixed typo: prevenDefault -> preventDefault
        dispatch(login(email, password)); // Fixed syntax
    };

    return (
        <Flex w="full" alignItems="center" justifyContent="center">
            <Formcontainer>
                <Heading as="h1" mb="8" fontSize="3xl">
                    Login
                </Heading>

                {error && <Message type="error">{error}</Message>}

                <form onSubmit={submitHandler}>
                    <FormControl id="email" mb="4">
                        <FormLabel>Email Address</FormLabel>
                        <Input 
                            type="email" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                        />
                    </FormControl>

                    <FormControl id="password" mb="4">
                        <FormLabel>Password</FormLabel>
                        <Input 
                            type="password" // Fixed typo: passowrd -> password
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </FormControl>

                    <Button 
                        type="submit" 
                        colorScheme="teal" 
                        mt="4" 
                        isLoading={loading}
                    >
                        Login
                    </Button>

                    <Flex pt="4">
                        <Text fontWeight="semibold">
                            New customer?{" "}
                            <RouterLink to='/register'>
                                Click here to register
                            </RouterLink>
                        </Text>
                    </Flex>
                </form>
            </Formcontainer>
        </Flex>
    );
};


export default Loginscreen