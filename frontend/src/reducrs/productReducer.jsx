import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    CLEAR_ERRORS 
} from '../constants/productConstans.jsx'

 const productReducer = (state={products: []},action)=>{
    switch (action.type) {
        case All_PRODUCT_REQUEST :
            return {
                loading:true,
                product:[]
            }
        case All_PRODUCT_SUCCESS:
            return {
                loading:false,
                product:action.payload.products
            }
        case All_PRODUCT_FAIL:
            return {
                loading:false,
                product:action.payload
            }
        case CLEAR_ERRORS:
            return{
                state,
                error:null
            }
        default: 
            return state;
    }
};

export default productReducer