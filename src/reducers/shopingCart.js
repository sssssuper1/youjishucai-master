import types from '../actions/shopingCart'
const reducer = (state, action) => { 
    if (action.type === types.addShopingNum.ADDNUM) {
        return {count: state.count + 1}
    }
    if (action.type === types.reduceShopingNum.REDUCENUM) {
        return {count: state.count - 1}
    }
    return state
}
module.exports =reducer