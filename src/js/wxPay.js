import {Alert, DeviceEventEmitter} from 'react-native';
import Fetch from './fetch';
import * as WeChat from 'react-native-wechat';
function wxPay(params, navigate, uri) {
  WeChat.registerApp('wx552eb71ba49e52ad');

  Fetch(global.url + uri, 'post', params, async (responseData) => {
    if (!responseData.success) {
      return
    }
    if (responseData.data.wxAmount == 0) {
      navigate('PaySuccess', {
        payAmount: responseData.data.wxAmount,
        totalCardPayment: responseData.data.totalCardPayment
      })
      return
    }
    DeviceEventEmitter.emit('num', 0);
    const result = await WeChat.pay({
      partnerId: responseData.data.wxOrderModel.Partnerid, // 商家向财付通申请的商家id
      prepayId: responseData.data.wxOrderModel.Prepayid, // 预支付订单
      nonceStr: responseData.data.wxOrderModel.NonceStr, // 随机串，防重发
      timeStamp: responseData.data.wxOrderModel.TimeStamp, // 时间戳，防重发
      package: responseData.data.wxOrderModel.Package, // 商家根据财付通文档填写的数据和签名
      sign: responseData.data.wxOrderModel.Sign // 商家根据微信开放平台文档对数据做的签名
    });

    if (result.errCode == 0) {
      navigate('PaySuccess', {
        payAmount: responseData.data.wxAmount,
        totalCardPayment: responseData.data.totalCardPayment
      })
    } else if (result.errCode == -1) {
      Alert.alert('提示','签名错误、未注册APPID、项目设置APPID不正确、注册的APPID与设置的不匹配、其他异常等。')
    } else if (result.errCode == -2) {
      Alert.alert('提示','用户取消')
    } else {
      Alert.alert('提示','未知错误')
      console.error(result)
    }
  }, (error) => {
    Alert.alert('提示',JSON.stringify(error))
  })
}

export default wxPay;