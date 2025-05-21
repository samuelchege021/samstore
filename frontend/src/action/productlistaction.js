

import { Product_List_Fail,Product_List_Request,Product_List_Sucess } from "../constant/productconstant";

import { Product_DELETE_Request,Product_DELETE_Sucess,Product_DELETE_Fail } from "../constant/productconstant";

import { Product_CREATE_Fail,Product_CREATE_RESET,Product_CREATE_Sucess,Product_CREATE_Request } from "../constant/productconstant";
import { Product_UPDATE_RESET,Product_UPDATE_Request,Product_UPDATE_Sucess,Product_UPDATE_Fail } from "../constant/productconstant";


import { PRODUCT_REVIEW_SUCCESS,PRODUCT_REVIEW_REQUEST,PRODUCT_REVIEW_FAIL,PRODUCT_REVIEW_RESET } from "../constant/productconstant";
import axios from 'axios'


export const Listproducts=()=>async(dispatch)=>{




try {
    
 dispatch({type:Product_List_Request});


// const { data } = await axios.get('http://localhost:5000/api/products'); // ✅ Full URL


 const { data } = await axios.get('/api/products');

dispatch({type:Product_List_Sucess,payload:data})


} catch (error) {

    dispatch({type:Product_List_Fail,payload:error.response&&error.response.data?error.response.data.message:error.message})
    
}



}





export const deleteproduct = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: Product_DELETE_Request });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      await axios.delete(`/api/products/${id}`, config);
  
      dispatch({ type: Product_DELETE_Sucess });
    } catch (error) {
      dispatch({
        type: Product_DELETE_Fail,
        payload:
          error.response?.data?.message || error.message,
      });
    }
  };




  

export const createproduct = (productdata) => async (dispatch, getState) => {
    try {
      dispatch({ type: Product_CREATE_Request });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
            
          Authorization: `Bearer ${userInfo.token}`,
          "Content-Type":"application/json",
        },
      };
  
     const{data}= await axios.post(`/api/products/`,productdata ,config);
  
      dispatch({ type: Product_CREATE_Sucess,payload:data});
    } catch (error) {
      dispatch({
        type: Product_CREATE_Fail,
        payload:
          error.response?.data?.message || error.message,
      });
    }
  };




  
export const updateproduct = (product)=> async (dispatch, getState) => {
  try {
    dispatch({ type: Product_UPDATE_Request });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
          
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type":"application/json",
      },
    };
    console.log("Updating product with:", product);

   const{data}= await axios.put(`/api/products/${product._id}`,product ,config);

    dispatch({ type: Product_UPDATE_Sucess,payload:data});
  } catch (error) {
    dispatch({
      type: Product_UPDATE_Fail,
      payload:
        error.response?.data?.message || error.message,
    });
  }
};







export const producthandleReview=(productId,review)=>async(dispatch,getState)=>{


try {
  
dispatch({type:PRODUCT_REVIEW_REQUEST})

const {userLogin:{userInfo}}=getState()


const config={

  headers:{

    Authorization:`Bearer ${userInfo.token}`,
    "Content-Type":"application/json"
  },

};


const {data}=await axios.post(`/api/products/${productId}/reviews`,review,config)

dispatch({type:PRODUCT_REVIEW_SUCCESS,payload:data})


} catch (error) {
  


  dispatch({type:PRODUCT_REVIEW_FAIL,payload:error.response.data.message||error.message})
}



}