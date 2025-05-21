


import { USER_DETAILS_Reset, USER_LIST_RESET, USER_LOGOUT, singleUSER_DETAILS_FAIL, singleUSER_DETAILS_REQUEST, singleUSER_DETAILS_SUCESS,  } from "../constant/userconstant";
import axios from "axios";
import { 
  USER_LOGIN_FAIL, 
  USER_LOGIN_SUCCESS, 
  USER_LOGIN_REQUEST,USER_REGISTER_REQUEST,USER_REGISTER_SUCCESS,USER_REGISTER_FAIL ,USER_DETAILS_REQUEST,USER_DETAILS_FAIL,USER_DETAILS_SUCESS,

USER_UPDATEPROFILE_REQUEST,USER_UPDATEPROFILE_SUCESS,USER_UPDATEPROFILE_FAIL
} from "../constant/userconstant";
import { USER_LIST_REQUEST,USER_LIST_SUCESS,USER_LIST_FAIL } from "../constant/userconstant";
import { ORDER_PROFILEORDER_RESET } from "../constant/orderconstant";


import { USER_UPDATE_REQUEST,USER_UPDATE_SUCESS,USER_UPDATE_FAIL} from "../constant/userconstant";

import { USER_DELETE_REQUEST,USER_DELETE_SUCESS,USER_DELETE_FAIL } from "../constant/userconstant";
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post("/api/users/login", { email, password }, config); // Fixed this line

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Save user data to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));

  } catch (error) {
    dispatch({ 
      type: USER_LOGIN_FAIL, 
      payload: error.response?.data?.message || error.message 
    });
  }
};



export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo"); // Remove user from local storage

  dispatch({ type: USER_LOGOUT }); 
  dispatch({ type: USER_DETAILS_Reset }); // Fix this line
  dispatch({ type: ORDER_PROFILEORDER_RESET }); // Reset orders if 
  dispatch({type:USER_LIST_RESET})

  // Redirect to login page after logout (optional)
  document.location.href = "/login";
};




export const register = (name, email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_REGISTER_REQUEST }); // Fix: Dispatch correct request action

    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const { data } = await axios.post(
      "/api/users/",
      { name, email, password }, // Fix: Include 'name' in request body
      config // Fix: Pass 'config' as a separate argument
    );

    dispatch({ type: USER_REGISTER_SUCCESS, payload: data });

    // Auto-login the user after registration
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    // Save user info to localStorage
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({ 
      type: USER_REGISTER_FAIL, 
      payload: error.response?.data?.message || error.message 
    });
  }
};




export const getuserdetails=()=>async(dispatch,getState)=>{

try {
  

  dispatch({type:USER_DETAILS_REQUEST})
  // TWO LEVEL DESTRUCTURING
const{userLogin:{userInfo}}=getState()


const config = {
  headers: {
    Authorization: `Bearer ${userInfo.token}` // Fix: Space after Bearer
  }
};

const {data}=await axios.get('/api/users/profile',config)

dispatch({type:USER_DETAILS_SUCESS,payload:data})

} catch (error) {
  
dispatch({ 
  type: USER_DETAILS_FAIL, 
  payload: error.response?.data?.message || error.message 
})
}


}



export const userupdateprofile = (userData) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATEPROFILE_REQUEST });

    const { userLogin: { userInfo } } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`
      }
    };

    const { data } = await axios.put('/api/users/profile', userData, config);

    dispatch({ type: USER_UPDATEPROFILE_SUCESS, payload: data });

  } catch (error) {
    dispatch({ 
      type: USER_UPDATEPROFILE_FAIL, 
      payload: error.response?.data?.message || error.message 
    });
  }
};







export const getusers=()=>async(dispatch,getState)=>{

try {
  
dispatch({type:USER_LIST_REQUEST});

const {userLogin:{userInfo}}=getState()
const config={
  headers:{
    Authorization:`Bearer ${userInfo.token}`
  }
}
  const {data}=await axios.get('/api/users',config)

  dispatch({type:USER_LIST_SUCESS,payload:data})

} catch (error) {
  dispatch({ 
    type: USER_LIST_FAIL, 
    payload: error.response?.data?.message || error.message
}
  )

}




}







export const USERDELETE=(id)=>async(dispatch,getState)=>{

  try {
    
  dispatch({type:USER_DELETE_REQUEST});
  
  const {userLogin:{userInfo}}=getState()
  const config={
    headers:{
      Authorization:`Bearer ${userInfo.token}`
    }
  }
    await axios.delete(`/api/users/${id}`,config)
  
    dispatch({type:USER_DELETE_SUCESS})
  
  } catch (error) {
    dispatch({ 
      type: USER_DELETE_FAIL, 
      payload: error.response?.data?.message || error.message
  }
    )
  
  }
  
  
  
  
  }



  

export const USERupdate=(user)=>async(dispatch,getState)=>{

  try {
    
  dispatch({type:USER_UPDATE_REQUEST});
  
  const {userLogin:{userInfo}}=getState()
  const config={
    headers:{
      "Content-Type": "application/json",
      Authorization:`Bearer ${userInfo.token}`
    }
  }
   const {data}= await axios.put(`/api/users/${user._id}`,user,config)
  
    dispatch({type:USER_UPDATE_SUCESS,payload:data})
  
  } catch (error) {
    dispatch({ 
      type: USER_UPDATE_FAIL, 
      payload: error.response?.data?.message || error.message
  }
    )
  
  }
  
  
  
  
  }





    



  export const singledetailuserbyidd= (id)=>async(dispatch,getState)=>{


try {
  

  dispatch({type:singleUSER_DETAILS_REQUEST})
      const {userLogin:{userInfo}}=getState()
      
      
      const config={
      
      
       headers:{
      
      
        Authorization:`Bearer ${userInfo.token}`
      
       }
      
       }
      
       const {data}= await axios.get(`/api/users/${id}`,config)
      
      
      dispatch  ({type:singleUSER_DETAILS_SUCESS,payload:data})




} catch (error) {


  dispatch({type:singleUSER_DETAILS_FAIL,payload: error.response?.data?.message || error.message})

}

  





  }
