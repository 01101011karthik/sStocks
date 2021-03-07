import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { stocksReducer } from './stocks/reducers';
import { userReducer } from './user/reducers';

const rootReducers = combineReducers({
    stocks: stocksReducer,
    user: userReducer
})


const store = createStore(rootReducers, applyMiddleware(thunk))

export default store;