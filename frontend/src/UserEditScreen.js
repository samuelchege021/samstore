import { USERupdate,singledetailuserbyidd } from "./action/useraction";


import { Formcontainer } from "./Formcontainer";


import { Loader } from "./components/Loader";


import { Message } from "./components/Message";

import { USER_UPDATE_RESET } from "./constant/userconstant";
import { useDispatch,useSelector } from "react-redux";
import { Link as RouterLink,  useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button, Flex, FormControl, FormLabel, Heading, Link, Spacer } from "@chakra-ui/react";



const UserEditScreen=()=>{

const dispatch=useDispatch()

const navigate=useNavigate()

const {id:userId}=useParams()


const [name,setname]=useState("")

const [email,setemail]=useState("")
const [isAdmin,setisAdmin]=useState(false)



const  singledetailuserbyid = useSelector((state) => state.singledetailuserbyid);
const { loading, error, user } = singledetailuserbyid;


const userupdate=useSelector((state)=>state.userupdate)

const {success,loading:userloading,error:updateerror}=userupdate


const submithandler=(e)=>{

e.preventDefault()
dispatch(USERupdate({_id:userId,name,email,isAdmin}))

}
useEffect(() => {
    if (success) {
      console.log("mu use", success);
      dispatch({ type: USER_UPDATE_RESET });
      navigate("/admin/userlist");
    } else {
      if (!user || !user.name ||user._id!==userId) {
      dispatch(singledetailuserbyidd(userId))
      } else {
        setname(user.name);
        setemail(user.email);
        setisAdmin(user.isAdmin);
      }
    }
  }, [dispatch, navigate, userId, user,success]);
  

return(
<>


<Link as={RouterLink} to="/admin/userlist">Go back</Link>

<Flex m="full" alignItems="center" justifyContent="center" py="5">

<Formcontainer>
<Heading as="h1" mb="8" fontSize="3xl">
Edit user


</Heading>

{/* 
{userloading && <Loader/>} */}
{updateerror && <Message type='error'>{updateerror}</Message>}

{loading ?(

    <Loader/>
)  :error?(

    <Message>{error}</Message>
) :(

<form onSubmit={submithandler}> 
<FormControl>
<FormLabel>
    Name
</FormLabel>
<input
type="text"
placeholder="enter full name"
value={name}
onChange={(e)=>setname(e.target.value)}

/>




</FormControl>

<Spacer h="4"/>






<FormControl>
<FormLabel>
    email  Adress
</FormLabel>
<input
type="text"
placeholder="enter email"
value={email}
onChange={(e)=>setemail(e.target.value)}

/>




</FormControl>

<Spacer h="4"/>


<FormControl>
<FormLabel>
    Is Admin
</FormLabel>
<input
  type="text"
  value={isAdmin}
  onChange={(e) => setisAdmin(e.target.value)}
/>
</FormControl>


<Spacer h="4"/>
<Button type="submit" isLoading={loading} colorScheme="teal" mt="4">update</Button>
</form>



)

}

</Formcontainer>





</Flex>


</>
)


}




export default UserEditScreen