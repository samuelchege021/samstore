

import { USER_LOGIN_FAIL,USER_LOGIN_SUCCESS,USER_LOGIN_REQUEST,USER_LOGOUT,USER_REGISTER_FAIL,
    
    USER_REGISTER_SUCCESS, USER_REGISTER_REQUEST,USER_DETAILS_FAIL,USER_DETAILS_REQUEST,USER_DETAILS_SUCESS,USER_UPDATEPROFILE_FAIL,USER_UPDATEPROFILE_REQUEST,
    USER_UPDATEPROFILE_SUCESS,USER_UPDATEPROFILE_RESET, USER_DETAILS_Reset, USER_LIST_RESET



}from "../constant/userconstant";




import { singleUSER_DETAILS_REQUEST,singleUSER_DETAILS_SUCESS,singleUSER_DETAILS_FAIL,singleUSER_DETAILS_Reset } from "../constant/userconstant";


import { USER_DELETE_REQUEST,USER_DELETE_SUCESS,USER_DELETE_FAIL } from "../constant/userconstant";
import { USER_LIST_REQUEST,USER_LIST_SUCESS,USER_LIST_FAIL } from "../constant/userconstant";

import { USER_UPDATE_REQUEST,USER_UPDATE_SUCESS,USER_UPDATE_FAIL,USER_UPDATE_RESET } from "../constant/userconstant";
export const userloginreducer=(state={},action)=>{

switch(action.type){

case USER_LOGIN_REQUEST:

return  {loading:true}


case USER_LOGIN_SUCCESS:

return {loading:false,userInfo:action.payload}


case USER_LOGIN_FAIL:
    return {loading:false,error:action.payload}



  case USER_LOGOUT:
  return {}  ;
    default :
   return  state





}





};








export const UserRegister=(State={user:{}},action)=>{

switch(action){


    case USER_REGISTER_REQUEST:

    return  {loading:true}
    
    
    case USER_REGISTER_SUCCESS:
    
    return {loading:false,userInfo:action.payload}
    
    
    case USER_REGISTER_FAIL:
        return {loading:false,error:action.payload}
    
       
  

        default:
            return State


}





};





export const userdetails=(state={user:{}},action)=>{

switch(action){


    
    case USER_DETAILS_REQUEST:

    return  {...state,loading:true}
    
    
    case USER_DETAILS_SUCESS:
    
    return {loading:false,user:action.payload}
    
    
    case USER_DETAILS_FAIL:
        return {loading:false,error:action.payload}

        case USER_DETAILS_Reset:
          return {user:{}}
      

        default:
            return state
    

}
}
;



export const updateprofile = (state = { user: {} }, action) => {
    switch (action.type) {
      case USER_UPDATEPROFILE_REQUEST:
        return { ...state, loading: true };
  
      case USER_UPDATEPROFILE_SUCESS:
        return { loading: false, user: action.payload, success: true };
  
      case USER_UPDATEPROFILE_FAIL:
        return { loading: false, error: action.payload };
  
      case USER_UPDATEPROFILE_RESET:
        return { user: {} };
  
      default:
        return state;
    }
  };
  



  
  export const getuserlist=(state={users:[]},action)=>{

    switch(action.type){
    
    
    
      case USER_LIST_REQUEST:
    
    
      return {...state,loading:true}
    
    
      case USER_LIST_SUCESS:
    
      return {loading:false,users:action.payload}
    
    case USER_LIST_FAIL:
    
    return {loading:false,error:action.payload}
    


    case USER_LIST_RESET:
       return {users:[]}
    
    default:
      return state
    }
    
    
      

    }





    
  
  export const userdeleteReducer=(state={},action)=>{

    switch(action.type){
    
    
    
      case USER_DELETE_REQUEST:
    
    
      return {loading:true}
    
    
      case USER_DELETE_SUCESS:
    
      return {loading:false,success:true}
    
    case USER_DELETE_FAIL:
    
    return {loading:false,error:action.payload}
    
    
    default:
      return state
    }
    
    
      
    }




    
    
  
  export const userupdateReducer=(state={user:{}},action)=>{

    switch(action.type){
    
    
    
      case USER_UPDATE_REQUEST:
    
    
      return {loading:true}
    
    
      case USER_UPDATE_SUCESS:
    
      return {loading:false,success:true,user:action.payload}
    
    case USER_UPDATE_FAIL:
    
    return {loading:false,error:action.payload}


    case USER_UPDATE_RESET:
    
    return {user:{}}
    
    
    default:
      return state
    }
    
    
      
    }








    export const singleDetailuserbyid=(state={user:{}},action)=>{



switch(action.type){



case singleUSER_DETAILS_REQUEST:

return {loading:true}


case singleUSER_DETAILS_SUCESS:
  return {loading:false,user:action.payload}



  case singleUSER_DETAILS_FAIL:



  return {loading:false,error:action.payload}




  case singleUSER_DETAILS_Reset:
    return {user:{}}

  default :

  return state
  
  
}


    }