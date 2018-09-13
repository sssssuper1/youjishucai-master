import types from '../actions/integral';

export default integralReducer = (state = 0, action) => {
  switch (action.type) {
    case types.ADDINTEGRAL:
      return state + action.num
    case types.REDUCEINTEGRAL:
      return state - action.num
    case types.SETINTEGRAL:
      return action.num
    default:
      return state
  }
}