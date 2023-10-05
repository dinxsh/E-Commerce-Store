import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_REQUEST,
    CLEAR_ERRORS 
} from '../constants/productConstans.jsx'

import axios from 'axios'

const actionProduct = (keyword="", currentPage=1, price=[0,25000], category ,rating=0) => async (dispatch) => {
    try {
        dispatch({
            type:All_PRODUCT_REQUEST
        });

        let link  = `http://192.168.1.10:5000/products?keyword=${keyword}&page=${currentPage}&price[$gte]=${price[0]}&price[$lte]=${price[1]}&ratings[$gte]=${rating}`

        
        if(category){
            link = `http://192.168.1.10:5000/products?keyword=${keyword}&page=${currentPage}&price[$gte]=${price[0]}&price[$lte]=${price[1]}&category=${category}&ratings[$gte]=${rating}`
        }
        const {data} = await axios.get(link); 
        
        dispatch({
            type:All_PRODUCT_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({
            type:All_PRODUCT_FAIL,
            payload: error.response
        })
    }
}
export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({
            type:PRODUCT_DETAILS_REQUEST
        });
        const {data} = await axios.get(`http://192.168.1.10:5000/product/${id}`)

        dispatch({
            type:PRODUCT_DETAILS_SUCCESS,
            payload:data
        })
    } catch (error) {
        dispatch({ 
            type:PRODUCT_DETAILS_FAIL, 
            payload: error.response.data.message
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({type:CLEAR_ERRORS});
}

export default actionProduct;

