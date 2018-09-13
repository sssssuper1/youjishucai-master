import { createStore, combineReducers } from 'redux';
import cartReducer from '../reducers/shopingCart';
import integralReducer from '../reducers/integarl';
import balanceReducer from '../reducers/balance';

const initialState = { count: 0, integral: 0, balance: 0 };
const rootReducer = combineReducers({
  count: cartReducer,
  integral: integralReducer,
  balance: balanceReducer
});

const store = createStore(rootReducer, initialState)
export default store