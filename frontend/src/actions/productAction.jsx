import {
    All_PRODUCT_FAIL,
    All_PRODUCT_REQUEST,
    All_PRODUCT_SUCCESS,
    CLEAR_ERRORS 
} from '../constants/productConstans.jsx'

const actionProduct = () => async (dispatch) => {
    try {
        dispatch({
            type:All_PRODUCT_REQUEST
        
        })
        const {data} = await axios.get('/products')

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

export const clearErrors = () => (dispatch) => {
    dispatchEvent({type:CLEAR_ERRORS});
}

export default actionProduct

