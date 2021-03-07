import { USER_DETAILS, LOGGING_IN_USER, USER_LOGIN_ERROR  } from './types';
import { base_url } from '../../config';
import axios, {  } from 'axios';
import Cookies from 'js-cookie';


export function logUser(type, payload){
    return async function(dispatch){
        try{
            dispatch({
                type: LOGGING_IN_USER,
                loading: true,
                errorMessage: '',
                payload: [],
            })

            const {data} = await axios.post(`${base_url}/api/user/${type}`, payload);
            Cookies.set('authentication', data.authentication)
            
            dispatch({
                type: USER_DETAILS,
                loading: false,
                errorMessage: '',
                payload: data,
            })
        }catch(err){
            dispatch({
                type: USER_LOGIN_ERROR,
                loading: false,
                errorMessage: err.response.data.message,
                payload: [],
            })
        }
    }
} 