import types from '../actions/shopingCart'
const reducer = (state, action) => { 
    if (action.type === types.addShopingNum.ADDNUM) {
        return {count: state.count + action.num}
    } else if (action.type === types.reduceShopingNum.REDUCENUM) {
        return {count: state.count - action.num}
    } else if (action.type === types.getShopingNum.GETNUM) {
        return {count: action.num}
    }
    return state
}
module.exports =reducer