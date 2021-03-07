import { STOCKS_LOADING, FETCH_STOCKS, STOCKS_LOADING_ERROR } from './types';
import axios from 'axios';
import {base_url} from '../../config'


export function getStocks(source='USD', order='desc', pageNumber=1){
    return async function(dispatch){
        try{
            dispatch({ 
                type: STOCKS_LOADING,
                loading: true,
                errorMessage: '',
                payload: {},
            })
            
            const res = await axios.get(`${base_url}/api/stocks?type=${source}&sortOrder=${order}&page=${pageNumber}`, {withCredentials: true});

            dispatch({
                type: FETCH_STOCKS,
                loading: false,
                errorMessage: '',
                payload: res.data.message,
            })
        }catch(err){
            console.log('err', err)
            dispatch({ 
                type: STOCKS_LOADING_ERROR,
                loading: false,
                errorMessage: err.response.data.message,
                payload: {},
            })
        }
    }
}