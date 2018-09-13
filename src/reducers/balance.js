import types from '../actions/balance';

export default balanceReducer = (state = 0, action) => {
  switch (action.type) {
    case types.ADDBALANCE:
      return state + action.num
    case types.REDUCEBALANCE:
      return state - action.num
    case types.SETBALANCE:
      return action.num
    default:
      return state
  }
}