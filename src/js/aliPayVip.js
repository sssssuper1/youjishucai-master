import { Alert } from "react-native";
import Fetch from "./fetch";
import Alipay from "react-native-yunpeng-alipay";

export default function aliPayVip(params, navigation, url, orderType = 1, errorBack = () => { }) {
  Fetch(global.url + url, 'post', params, (responseData) => {
    if (!responseData.success) {
      Alert.alert('提示', responseData.errMsg);
      errorBack();
      return
    }

    if (responseData.data.totalAmount == 0) {
      navigation.replace('PaySuccess', {
        payAmount: 0
      })
      return
    }

    Alipay.pay(responseData.data.body).then((result) => {
      navigation.replace('PaySuccess', {
        payAmount: responseData.data.totalAmount,
        orderType: orderType
      })
    }).catch((error) => {
      navigation.replace('PayFun', {
        payAmount: responseData.data.totalAmount,
        orderNo: responseData.data.orderNum,
        orderType: orderType,
        payNum: 1
      })
    })
  }, (error) => {
    Alert.alert('提示', JSON.stringify(error));
  })
}