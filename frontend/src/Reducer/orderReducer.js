
import { ORDER_DETAILS_REQUEST, ORDER_PAY_RESET, ORDER_PROFILEORDER_RESET,  ORDER_DELIVER_RESET, ORDER_CREATE_REQUEST, ORDER_CREATE_SUCCESS, ORDER_CREATE_FAIL } from "../constant/orderconstant";
import { ORDER_DETAILS_FAIL,ORDER_DETAILS_SUCCESS } from "../constant/orderconstant";
import { ORDER_PAY_SUCCESS,ORDER_PAY_REQUEST,ORDER_PAY_FAIL } from "../constant/orderconstant";
import { ORDER_MYLIST_REQUEST,ORDER_MYLIST_FAIL ,ORDER_MYLIST_SUCCESS} from "../constant/orderconstant";
import { ORDER_PROFILEORDER_SUCCESS,ORDER_PROFILEORDER_FAIL,ORDER_PROFILEORDER_REQUEST } from "../constant/orderconstant";


import { ORDER_DELIVER_SUCCESS,ORDER_DELIVER_REQUEST,ORDER_DELIVER_FAIL } from "../constant/orderconstant";




export const orderProfileReducer = (state = {orders:[]}, action) => {
  switch (action.type) {
    case ORDER_PROFILEORDER_REQUEST:
      return { ...state, loading: true };

    case ORDER_PROFILEORDER_SUCCESS:
      return { loading: false, orders: action.payload, error: null };

    case ORDER_PROFILEORDER_FAIL:
      return { loading: false, error: action.payload, orders: [] };
      
      
      case ORDER_PROFILEORDER_RESET:
        return {orders:{}}

    default:
      return state;
  }
};


export const ordercreatereducer = (state = {}, action) => {
    switch (action.type) {
        case ORDER_CREATE_REQUEST:
            return { ...state, loading: true, error: null };

        case ORDER_CREATE_SUCCESS:
            return { loading: false, order: action.payload, success: true };

        case ORDER_CREATE_FAIL:
            return { loading: false, error: action.payload };
    
        
        default:
            return state;
    }
};




export const orderdetails = (state={order:{orderItems:[],shippingAddress:{}},loading:true},action) => {
    switch (action.type) {
        case ORDER_DETAILS_REQUEST:
            return { ...state, loading: true, error: null };

        case ORDER_DETAILS_SUCCESS:
            return { loading: false, order: action.payload, success: true };

        case ORDER_DETAILS_FAIL:
            return { loading: false, error: action.payload };


     


        default:
            return state;
    }
};





export const orderpay = (state = {}, action) => {
    switch (action.type) {
      case ORDER_PAY_REQUEST:
        return { loading: true, error: null };
  
      case ORDER_PAY_SUCCESS:
        return { 
          loading: false ,success: true 
          }
          
        
  
      case ORDER_PAY_FAIL:
        return { loading: false, error: action.payload };
  
      case ORDER_PAY_RESET:
        return {};
  
      default:
        return state;
    }
  };
  


  export const orderprofile = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_PROFILEORDER_REQUEST:
        return { ...state, loading: true };
  
      case ORDER_PROFILEORDER_SUCCESS:
        return { loading: false, orders: action.payload };
        
      case ORDER_PROFILEORDER_FAIL:
        return { loading: false, error: action.payload };
  
      case ORDER_PROFILEORDER_RESET:
        return { orders: [] };
  
      default:
        return state;
    }
  };
  


  
  




  export const ordermylistreducer = (state = { orders: [] }, action) => {
    switch (action.type) {
      case ORDER_MYLIST_REQUEST:
        return { ...state, loading: true };
  
      case ORDER_MYLIST_SUCCESS:
        return { loading: false, orders: action.payload };
  
      case ORDER_MYLIST_FAIL:
        return { loading: false, error: action.payload };
  
      
  
      default:
        return state;
    }
  };
  



  


  export const orderDeliverReducer = (state = { }, action) => {
    switch (action.type) {
      case ORDER_DELIVER_REQUEST:
        return { loading: true };
  
      case ORDER_DELIVER_SUCCESS:
        return { loading: false, success:true };
  
      case ORDER_DELIVER_FAIL:
        return { loading: false, error: action.payload };
  
      
        case ORDER_DELIVER_RESET:
          return { loading: false, error: action.payload };
    
  
      default:
        return state;
    }
  };