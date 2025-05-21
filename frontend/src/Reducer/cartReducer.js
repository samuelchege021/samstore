import { CART_PAYMENT_METHOD } from "../constant/cartconstant";
import { cart_add_item,cart_remove_item ,CART_SAVE_SHIPPING_ADDRESS} from "../constant/cartconstant"


export const cartReducer=(state={cartitems:[]},action)=>{

    switch(action.type){

case cart_add_item:
    const item=action.payload;
    // (product:id)
    const existitem=state.cartitems.find((i)=>i.product===item.product);

if (existitem){

    return {...state,cartitems:state.cartitems.map((i)=>i.product===existitem.product?item:i)}
}

else{

    return {...state,cartitems:[...state.cartitems,item]}
}



case cart_remove_item:
    return {
...state,cartitems:state.cartitems.filter((i)=>i.product!==action.payload)

    };

  
    case CART_SAVE_SHIPPING_ADDRESS:

    return {...state,shippingAddress:action.payload}


    case CART_PAYMENT_METHOD:

    return {...state,paymentMethod:action.payload}




    default:
        return state


    }




}
