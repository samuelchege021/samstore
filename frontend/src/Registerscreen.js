import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink, useNavigate, useSearchParams } from "react-router-dom";
import { Message } from "./components/Message";
import { register } from "./action/useraction"; // Import register action
import { Button, Flex, FormControl, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import { Formcontainer } from "./Formcontainer";

const RegisterScreen = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const redirect = searchParams.get('redirect') || '/';

    // State for form inputs
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState(null); // For password mismatch error

    // Get user register state from Redux
    const userRegister = useSelector((state) => state.userRegister);
    const { loading, error, userInfo } = userRegister;

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [userInfo, navigate, redirect]);

    const submitHandler = (e) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage("Passwords do not match"); // Set error message if passwords don't match
        } else {
            dispatch(register(name, email, password)); // Dispatch register action
        }
    };

    return (
        <Flex w="full" alignItems="center" justifyContent="center">
            <Formcontainer>
                <Heading as="h1" mb="8" fontSize="3xl">
                    Register
                </Heading>

                {/* Show error messages */}
                {message && <Message type="error">{message}</Message>}
                {error && <Message type="error">{error}</Message>}

                <form onSubmit={submitHandler}>
                    <FormControl id="name" mb="4">
                        <FormLabel>Name</FormLabel>
                        <Input 
                            type="text" 
                            value={name} 
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name"
                        />
                    </FormControl>

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
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                        />
                    </FormControl>

                    <FormControl id="confirmPassword" mb="4">
                        <FormLabel>Confirm Password</FormLabel>
                        <Input 
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm password"
                        />
                    </FormControl>

                    <Button 
                        type="submit" 
                        colorScheme="teal" 
                        mt="4" 
                        isLoading={loading}
                    >
                        Register
                    </Button>

                    <Flex pt="4">
                        <Text fontWeight="semibold">
                            Already have an account?{" "}
                            <RouterLink to={`/login?redirect=${redirect}`}>
                                Click here to login
                            </RouterLink>
                        </Text>
                    </Flex>
                </form>
            </Formcontainer>
        </Flex>
    );
};

export default RegisterScreen;
