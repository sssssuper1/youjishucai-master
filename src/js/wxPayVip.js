import {Alert} from 'react-native';
import Fetch from './fetch';
import * as WeChat from 'react-native-wechat';

function wxPayVip(uri, navigation, params, orderType = 1, errorback = () => {}) {
  WeChat.registerApp('wx4e425ddae999f00b');

  Fetch(global.url + uri, 'post', params, async (responseData) => {
    if (!responseData.result) {
      Alert.alert('提示', responseData.errMsg);
      errorback();
      return
    }

    WeChat.pay({
      partnerId: responseData.data.wxOrderModel.Partnerid, // 商家向财付通申请的商家id
      prepayId: responseData.data.wxOrderModel.Prepayid, // 预支付订单
      nonceStr: responseData.data.wxOrderModel.NonceStr, // 随机串，防重发
      timeStamp: responseData.data.wxOrderModel.TimeStamp, // 时间戳，防重发
      package: responseData.data.wxOrderModel.Package, // 商家根据财付通文档填写的数据和签名
      sign: responseData.data.wxOrderModel.Sign // 商家根据微信开放平台文档对数据做的签名
    }).then((result)=>{
      navigation.replace('PaySuccess', {
        payAmount: responseData.data.money,
        orderType: orderType
      });
    }).catch((errCode) => {
      navigation.replace('PayFun', {
        payAmount: responseData.data.money,
        orderNo: responseData.data.orderNum,
        orderType: orderType,
        payNum: 0
      });
    });
  }, (error) => {
    Alert.alert('提示',JSON.stringify(error))
  })
}

export default wxPayVip;