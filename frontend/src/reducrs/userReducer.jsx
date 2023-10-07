import {
    ALL_USER_REQUEST,
    ALL_USER_SUCCESS,
    ALL_USER_FAIL, 
    CLEAR_ERRORS,
    REG_USER_REQUEST,
    REG_USER_SUCCESS,
    REG_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    LOAD_USER_FAIL,
    USER_LOGOUT_SUCCESS,
    USER_LOGOUT_FAIL
} from '../constants/userConstants'


export const UserReducers = ( state ={user: {}}, action ) =>{
    switch(action.type){
        case ALL_USER_REQUEST :
        case LOAD_USER_REQUEST:
        return{
            loading:true,
            isAuthenticated:false,
        }
        case ALL_USER_SUCCESS:
        case LOAD_USER_SUCCESS:
        return{
            ...state,
            loading:false,
            isAuthenticated:true,
            user:action.payload.user
        }
        case USER_LOGOUT_SUCCESS:
            return {
                loading:false,
                isAuthenticated:false,
                user:null
        }
        case ALL_USER_FAIL :
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null
        }

        case LOAD_USER_FAIL:{
            return {
                loading:false,
                isAuthenticated:false,
                error:action.payload,
                user:null,
            }
        }
        case USER_LOGOUT_FAIL:
            return {
                loading:false,
                isAuthenticated:false,
                error:action.payload
            }

        case CLEAR_ERRORS :
            return {
                ...state,
                error:null
            }
        default:{
            return state
        }
    }
    
}

export const RegisterUser = ( state ={user: {}}, action ) =>{
switch (action.type) {
    case REG_USER_REQUEST:
        return {
            loading:true,
            isAuthenticated:false,
        }        
    case REG_USER_SUCCESS:
        return {
            loading:false,
            isAuthenticated:true,
            user:action.payload.user,
        }        
    case REG_USER_FAIL:
        return {
            loading:false,
            isAuthenticated:false,
            user:null
        }        
    case CLEAR_ERRORS:
        return {
            ...state,
            error:null
        }        

    default:
        return state;
}
}


