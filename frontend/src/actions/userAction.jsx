import { 
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL,
    CLEAR_ERRORS,
    REG_USER_FAIL,
    REG_USER_REQUEST,
    REG_USER_SUCCESS,
} from '../constants/userConstants'

import axios from 'axios'

export const userAction = (email,password)=>async(dispatch)=>{

    const config = {headers:{"Content-Type":"application/json"}}

    try {
    dispatch({
        type:ALL_USER_REQUEST
    })     
    const {data} =  await axios.post('http://192.168.1.10:5000/login', {email,password} ,config)    
    dispatch({
        type:ALL_USER_SUCCESS,
        payload: data
    })

    } catch (error) {
        dispatch({
            type:ALL_USER_FAIL,
            payload: error.response
        })
    }
}

export const clearErrors = () => (dispatch) => {
    dispatch({type:CLEAR_ERRORS});
}


export const registerUser = (myForm) => async(dispatch)=>{
    try {
        dispatch({
            type:REG_USER_REQUEST
        })

        const {data} = await axios.post('http://192.168.1.10:5000/register',
        myForm,
        {headers:{"Content-Type":"multipart/form-data"}}
        )

        dispatch({
            type:REG_USER_SUCCESS,
            payload:data
        })
        
    } catch (error) {
        dispatch({
            type:REG_USER_FAIL
        })
    }
}


//  default {userAction,registerUser}