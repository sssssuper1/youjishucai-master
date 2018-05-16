import { createStore } from 'redux'
import reducer from '../reducers/shopingCart'
const initialState = {count: 0}

// Create a store, passing our reducer function and our initial state
const store = createStore(reducer, initialState)
module.exports = store