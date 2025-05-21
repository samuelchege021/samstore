import { Product_List_Request,Product_List_Sucess,Product_List_Fail, PRODUCT_DETAILS_RESET } from "../constant/productconstant"


import { Product_DELETE_Request,Product_DELETE_Sucess,Product_DELETE_Fail } from "../constant/productconstant";


import { Product_CREATE_Request,Product_CREATE_Sucess,Product_CREATE_Fail,Product_CREATE_RESET } from "../constant/productconstant";

import { Product_UPDATE_Request,Product_UPDATE_Fail,Product_UPDATE_RESET,Product_UPDATE_Sucess } from "../constant/productconstant";
import { PRODUCT_DETAILS_REQUEST,PRODUCT_DETAILS_SUCCESS,PRODUCT_DETAILS_FAIL } from "../constant/productconstant";

import { PRODUCT_REVIEW_RESET,PRODUCT_REVIEW_REQUEST,PRODUCT_REVIEW_SUCCESS,PRODUCT_REVIEW_FAIL } from "../constant/productconstant";

const initialState = {
  products: [], // 
  loading: false,
  error: null
};

export const Product_list_reducer = (state = initialState, action) => {
  switch (action.type) {
    case Product_List_Request:
      return { ...state, loading: true };
      
    case Product_List_Sucess:
      return { ...state, loading: false, products: action.payload };

    case Product_List_Fail:
      return { ...state, loading: false, error: action.payload };

    default:
      return state; 
  }
};




export const productdeletereducer=(state={},action)=>{

switch(action){

case Product_DELETE_Request:

return {loading:true}

case Product_DELETE_Sucess:

return {loading:false,success:true}

case Product_DELETE_Fail:
  return{loading:false,error:action.payload}


  default:
    return state
}

}





export const productcreatereducer=(state={},action)=>{

  switch(action.type){
  
  case Product_CREATE_Request:
  
  return {loading:true}
  
  case Product_CREATE_Sucess:
  
  return {loading:false,success:true,product:action.payload}
  
  case Product_CREATE_Fail:
    return{loading:false,error:action.payload}
  
  case Product_CREATE_RESET:
    return{}
    default:
      return state
  }
  
  }



  

export const productupdatereducer=(state={product:{}},action)=>{

  switch(action.type){
  
  case Product_UPDATE_Request:
  
  return {loading:true}
  
  case Product_UPDATE_Sucess:
  
  return {loading:false,success:true,product:action.payload}
  
  case Product_UPDATE_Fail:
    return{loading:false,error:action.payload}
  
  case Product_UPDATE_RESET:
    return{}
    default:
      return state
  }
  
  }
  


export const productDetailsReducer = (state = { product: {}, loading: true }, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true };

    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };

      case PRODUCT_DETAILS_RESET:
        return {};
  
    default:
      return state;
  }
};




export const productReview=(state={},action)=>{

switch(action.type){

case PRODUCT_REVIEW_REQUEST:

return {loading:true}


case PRODUCT_REVIEW_SUCCESS:

return {loading:false,success:true}



case PRODUCT_REVIEW_FAIL:

return {loading:false,error:action.payload}


case PRODUCT_REVIEW_RESET:

return {}




default:

return state


}



}
