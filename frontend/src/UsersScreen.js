import {
  Box, Button, Flex, Heading, Icon, Table, Td, Th, Thead, Tr, Tbody,
} from '@chakra-ui/react';
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USERDELETE, getusers } from "./action/useraction";
import { Loader } from "./components/Loader";
import { Message } from './components/Message';
import {
  IoCheckmarkCircleSharp,
  IoCloseCircleSharp,
  IoPencilSharp,
  IoTrashBin,
  IoTrashBinSharp
} from "react-icons/io5";
import { Link as RouterLink, useNavigate } from 'react-router-dom';

const UsersScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userList = useSelector((state) => state.userList);
  const { loading, error, users } = userList || {};

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userDelete = useSelector((state) => state.userdelete);
  const { success: successDelete, error: errorDelete, loading: loadingDelete } = userDelete;

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(getusers());
    } else {
      navigate('/login');
    }
  }, [dispatch, navigate, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure ?")) {
      dispatch(USERDELETE(id));
    }
  };

  return (
    <>
      <Heading as="h1" fontSize="3xl" mb="5">
        Users
      </Heading>

      {loadingDelete && <Loader />}
      {errorDelete && <Message type="error">{errorDelete}</Message>}
      {successDelete && <Message type="success">User deleted successfully</Message>}

      {loading ? (
        <Loader />
      ) : error ? (
        <Message type="error">{error}</Message>
      ) : (
        <Box bgColor="white" rounded="lg" px="5" py="5">
          <Table variant="striped" colorScheme='gray' size="sm">
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Admin</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users && users.length > 0 ? (
                users.map((user) => (
                  <Tr key={user._id}>
                    <Td>{user._id}</Td>
                    <Td>{user.name}</Td>
                    <Td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </Td>
                    <Td>
                      {user.isAdmin?(<Icon as={IoCheckmarkCircleSharp} color="green.600" w="8" h="8">


              


</Icon>):(


<Icon as={IoCloseCircleSharp} color="green.600" w="8" h="8">


              


</Icon>





)}
                      
                    </Td>
                    <Td>
                      <Flex justifyContent="flex-end" alignItems="center">
                        <Button
                          as={RouterLink}
                          to={`/admin/user/${user._id}/edit`}
                          colorScheme='teal'
                          mr="4"
                        >
                          <Icon as={IoPencilSharp} color="white" />
                        </Button>
                        <Button
                          colorScheme='red'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <Icon as={IoTrashBinSharp} color="white" size="sm"/>
                        </Button>
                      </Flex>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="5" textAlign="center">No users found.</Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default UsersScreen;
