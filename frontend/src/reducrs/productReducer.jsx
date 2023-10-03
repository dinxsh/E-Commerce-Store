import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,

    CLEAR_ERRORS 
} from '../constants/productConstans.jsx'

export const productReducer = (state={product: []},action)=>{
    switch (action.type) {
        case All_PRODUCT_REQUEST :
            return {
                loading:true,
                product:[]
            }
        case All_PRODUCT_SUCCESS:
            return {
                loading:false,
                products:action.payload.data,
                productCount:action.payload.productCount,
                resultsPerPage:action.payload.resultsPerPage
            }
        case All_PRODUCT_FAIL:
            return {
                loading:false,
                product:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default: 
            return state;
    }
};
 export const productDetailsReducer = (state={product: {}},action)=>{
    switch (action.type) {
        case PRODUCT_DETAILS_REQUEST :
            return {
                loading:true,
                ...state
            }
        case PRODUCT_DETAILS_SUCCESS:
            return {
                loading:false,
                product:action.payload.data,
            }
        case PRODUCT_DETAILS_FAIL:
            return {
                loading:false,
                product:action.payload,
            }
        case CLEAR_ERRORS:
            return{
                ...state,
                error:null
            }
        default: 
            return state;
    }
};



