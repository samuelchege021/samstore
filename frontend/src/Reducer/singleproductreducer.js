import { Product_List_Fail, Product_List_Request, Product_List_Sucess } from "../constant/productconstant";
import { Product_Details_Reset } from "../constant/siingleproduct";

const initialState = {
    product: null, // Single product should be an object or null, not an array
    loading: false,

};

export const Singleproductreducer = (state = initialState, action) => {
    switch (action.type) {
        case Product_List_Request:
            return { ...state, loading: true, error: null };

        case Product_List_Sucess:
            return { loading: false, product: action.payload, error: null };

        case Product_List_Fail:
            return { loading: false, error: action.payload, product: null }
            


            case Product_Details_Reset:
                return {}
        default:
            return state;
    }
};
