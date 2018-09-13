import types from '../actions/shopingCart'

export default cartReducer = (state = 0, action) => { 
  switch (action.type) {
    case types.addShopingNum.ADDNUM:
      return state + action.num
    case types.reduceShopingNum.REDUCENUM:
      return state - action.num
    case types.setShopingNum.SETNUM:
      return action.num
    default:
      return state
  }
}