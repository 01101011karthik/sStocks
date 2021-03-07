import { STOCKS_LOADING, FETCH_STOCKS, STOCKS_LOADING_ERROR } from './types';

const initialState = {}

export function stocksReducer(state=initialState, action){
    switch(action.type){
        case STOCKS_LOADING: return {
            ...state,
            loading: action.loading,
            errorMessage: action.errorMessage,
            payload: action.payload,
        }
        case FETCH_STOCKS: return {
            ...state,
            loading: action.loading,
            errorMessage: action.errorMessage,
            payload: action.payload,
        }
        case STOCKS_LOADING_ERROR: return {
            ...state,
            loading: action.loading,
            errorMessage: action.errorMessage,
            payload: action.payload,
        }
        default: return state;
    }
}