import { USER_DETAILS, LOGGING_IN_USER, USER_LOGIN_ERROR  } from './types';

const initialState = {}

export function userReducer(state=initialState, action){
    switch(action.type){
        case LOGGING_IN_USER: return {
            ...state,
            loading: action.loading,
            errorMessage: action.errorMessage,
            payload: action.payload,
        }
        case USER_DETAILS: return {
            ...state,
            loading: action.loading,
            errorMessage: action.errorMessage,
            payload: action.payload,
        }
        case USER_LOGIN_ERROR: return {
            ...state,
            loading: action.loading,
            errorMessage: action.errorMessage,
            payload: action.payload,
        }
        default: return state
    }
}