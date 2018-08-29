import { Alert } from "react-native";
import Fetch from "./fetch";
import store from '../store/index';
import types from '../actions/shopingCart';
import Alipay from "react-native-yunpeng-alipay";

export default function aliPay(params, navigation, url, count) {
    Fetch(global.url + url, 'post', params, (responseData) => {
        if (!responseData.success) {
            return
        }

        if (responseData.data.totalAmount == 0) {
            navigation.replace('PaySuccess', {
              payAmount: 0
            })
            return
        }

        store.dispatch({ type: types.reduceShopingNum.REDUCENUM, num: count });

        Alipay.pay(responseData.data.body).then((result) => {
            navigation.replace('PaySuccess', {
                payAmount: responseData.data.totalAmount,
            })
        }).catch((error) => {
            // Alert.alert('提示', '支付失败')
            navigation.replace('PayFun', {
                payAmount: responseData.data.totalAmount,
                orderNo: responseData.data.orderNum,
                orderType: 0,
                payNum: 1
            })
        })
    }, (error) => {
        Alert.alert('提示', JSON.stringify(error));
    })
}