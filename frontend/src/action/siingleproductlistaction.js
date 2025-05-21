// import { Product_List_Request, Product_List_Sucess, Product_List_Fail } from "../constant/siingleproduct.js";
// import axios from 'axios';

// export const singlelistproduct = (id) => async (dispatch) => {
//   try {
//     dispatch({ type: Product_List_Request });
//     // console.log("Fetching product with ID:", id); // Debugging

//     const { data } = await axios.get(`/api/products/${id}`);

//     // console.log("API Response Data:", data); // Debugging

//     dispatch({ type: Product_List_Sucess, payload: data });
//   } catch (error) {
//     console.log("API Error:", error); // Debugging
//     dispatch({
//       type: Product_List_Fail,
//       payload: error.response?.data?.message || error.message,
//     });
//   }
// };


import { Product_List_Request, Product_List_Sucess, Product_List_Fail } from "../constant/siingleproduct.js";
import axios from 'axios';

export const singlelistproduct = (_id) => async (dispatch) => {
  try {
    // // Validate the ID before proceeding
    // if (!id || typeof id !== 'string' || !/^[0-9a-fA-F]{24}$/.test(id)) {
    //   throw new Error("Invalid product ID provided");
    // }

    dispatch({ type: Product_List_Request });
    // console.log("Fetching product with ID:", id); // Keep this for debugging

    const { data } = await axios.get(`/api/products/${_id}`);

    console.log("API Response Data:", data); // Debugging

    dispatch({ type: Product_List_Sucess, payload: data });
  } catch (error) {
    console.log("API Error:", error); // Debugging
    dispatch({
      type: Product_List_Fail,
      payload: error.response?.data?.message || error.message,
    });
  }
};