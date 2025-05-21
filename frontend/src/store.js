// import {  combineReducers, applyMiddleware,legacy_createStore as createStore} from 'redux';
// import {thunk} from 'redux-thunk'
// import { composeWithDevTools } from '@redux-devtools/extension';
// import { Product_list_reducer } from './Reducer/Productreducer';
// import {Singleproductreducer}  from './Reducer/singleproductreducer'
//  import { cartReducer } from './Reducer/cartReducer';
//  import { userloginreducer } from './Reducer/userReducer';

// const reducer = combineReducers({
//     productlist: Product_list_reducer,
//     singleproductlist: Singleproductreducer ,
//     cart:cartReducer,
//     userlogin:userloginreducer

// });

// const cartitemsfromstorage=localStorage.getItem('cartitems')?JSON.parse(localStorage.getItem('cartitems')):[];

// addEventListener
// const userinfofromstorage=localStorage.getItem("userInfo")?JSON.parse(localStorage.getItem('userInfo')):null;



// const initialState = {
// cart:{cartitems:cartitemsfromstorage},
// userlogin:{userInfo:userinfofromstorage}

// };
// const middlewares = [thunk];


// // const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));

// const store = createStore(
//     reducer,
//     initialState,
//     composeWithDevTools(applyMiddleware(...middlewares))
//   );
  

// export default store


import { combineReducers, applyMiddleware, legacy_createStore as createStore } from 'redux';
import {thunk} from 'redux-thunk'; // Remove unnecessary brackets
import { composeWithDevTools } from '@redux-devtools/extension';
import { Product_list_reducer } from './Reducer/Productreducer';
import { Singleproductreducer } from './Reducer/singleproductreducer';
import { cartReducer } from './Reducer/cartReducer';
import { singleDetailuserbyid, userloginreducer } from './Reducer/userReducer';
import  {UserRegister}    from './Reducer/userReducer'
import { userdetails } from './Reducer/userReducer';
import { updateprofile } from './Reducer/userReducer';
import { ordercreatereducer, orderpay } from './Reducer/orderReducer';
import { orderdetails } from './Reducer/orderReducer';
import { orderprofile } from './Reducer/orderReducer';
import { getuserlist } from './Reducer/userReducer';
import { userdeleteReducer } from './Reducer/userReducer';
import { productdeletereducer } from './Reducer/Productreducer';
import { userupdateReducer } from './Reducer/userReducer';
import { productcreatereducer } from './Reducer/Productreducer';
import { productupdatereducer } from './Reducer/Productreducer';
import { productDetailsReducer } from './Reducer/Productreducer';
import { ordermylistreducer } from './Reducer/orderReducer';
import { productReview } from './Reducer/Productreducer';
import { orderDeliverReducer } from './Reducer/orderReducer';
const reducer = combineReducers({
    productlist: Product_list_reducer,
    singleproductlist: Singleproductreducer,
    cart: cartReducer,
    userLogin: userloginreducer,
    userRegister:UserRegister,
    userDetails:userdetails,
    updateprofile:updateprofile,
    ordercreate: ordercreatereducer,
    orderDetails:orderdetails,
    orderPay:orderpay,
    orderProfile:orderprofile,
    userList:getuserlist,
    userdelete:userdeleteReducer,
    userupdate:userupdateReducer,
    productdelete:productdeletereducer,
    productcreate:productcreatereducer,
    productupdate:productupdatereducer,
    productdetails:productDetailsReducer,
    orderlist:ordermylistreducer,
    orderDeliver:orderDeliverReducer,
    productreview:productReview,
    singledetailuserbyid:singleDetailuserbyid



});


// Retrieve cart items from local storage
const cartitemsfromstorage = localStorage.getItem('cartitems') 
    ? JSON.parse(localStorage.getItem('cartitems')) 
    : [];

// Retrieve user info from local storage
const userinfofromstorage = localStorage.getItem("userInfo") 
    ? JSON.parse(localStorage.getItem('userInfo')) 
    : null;



    const shippingAddressfromstorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) 
    : {};

    const paymentMethodfromstorage = localStorage.getItem('paymentMethod') 
    ? JSON.parse(localStorage.getItem('paymentMethod'))  // Correct key
    : "paypal";

// Initial state
const initialState = {
    cart: { cartitems: cartitemsfromstorage,shippingAddress:shippingAddressfromstorage,paymentMethod:paymentMethodfromstorage },
    userLogin: { userInfo: userinfofromstorage }
};

// Middleware
const middlewares = [thunk];

// Create store
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
