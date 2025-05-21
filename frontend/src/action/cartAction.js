import axios from 'axios'
import { cart_add_item,CART_PAYMENT_METHOD,cart_remove_item,CART_SAVE_SHIPPING_ADDRESS } from "../constant/cartconstant";




export const cartaddAction=(id,qty)=>async(dispatch,getstate)=>{


const {data}=await axios.get(`/api/products/${id}`)



dispatch({

type:cart_add_item,
payload:{
product:data._id,
name:data.name,
price:data.price,
image:data.image,
countInstock:data.countInstock,
qty,


},

});


localStorage.setItem('cartitems',JSON.stringify(getstate().cart.cartitems))



}


export const cart_remove=(id)=>(dispatch,getstate)=>{


dispatch({type:cart_remove_item,payload:id})



localStorage.setItem('cartitems',JSON.stringify(getstate().cart.cartitems))





}



export const ShippingAddress = (data) => async (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });

  localStorage.setItem("shippingAddress", JSON.stringify(data));
};







export const paymentmethod = (data) => async (dispatch) => {
    dispatch({ type: CART_PAYMENT_METHOD, payload: data });
  
    localStorage.setItem("paymentMethod", JSON.stringify(data));
  };
  