/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Swiper from 'react-native-swiper';
import types from '../actions/shopingCart'
import store from '../store/index'
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
import AwesomeAlert from 'react-native-awesome-alerts';
import PopupDialog from 'react-native-popup-dialog';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ListView,
  ScrollHeight,
  Dimensions,
  PanResponder,
  Animated,
  Easing,
  ImageBackground,
  Alert,
  Button,
  FlatList,
  Picker
} from 'react-native';
import wxPay from '../js/wxPay';
import alipay from '../js/aliPay';
import pxToDp from '../js/pxToDp';

export default class PayFun extends Component {
  constructor(props) {
    super(props);
    this.state={
      payNum: this.props.navigation.state.params.payNum,
      message: '网络错误！',
      showAlert: false,
      warning: '订单支付尚未完成，是否继续完成支付操作~',
      isPaying: false
    }
  }

  popupShow() {
    this.popupDialog.show();
  }

  popupClose() {
    this.popupDialog.dismiss();
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  }

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  }

  changePaymentMethod(payNum) {
    this.setState({
      payNum: payNum
    });
  }

  pay() {
    if (this.props.navigation.state.params.orderType == 0) {
      this.setState({
        isPaying: true
      });
      if (this.state.payNum == 0) {
        let params = {
          orderNo: this.props.navigation.state.params.orderNo,
          payType: 'wx'
        }
        wxPay(params, this.props.navigation, '/API/Order/GeneratePayParams', 0);
      } else {
        let params = {
          orderNo: this.props.navigation.state.params.orderNo,
          payType: 'ali'
        }
        alipay(params, this.props.navigation, '/API/Order/GeneratePayParams', 0);
      }
    } else if (this.props.navigation.state.params.orderType == 1) {
      this.props.navigation.navigate('PayToVip');
    }
  }

  render() {
    const { userAddresses, showAlert, message } = this.state;
    const { goBack, state, navigate } = this.props.navigation;
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="请选择支付方式" goHome={true}></Header1>
        <View style={styles.state}>
          <View style={styles.stateImgWrap}>
            <Image style={styles.stateImg} source={require('../images/payFail.png')}></Image> 
          </View>
          <View style={styles.stateShow}><Text style={styles.stateShowText}>付款失败</Text></View>  
        </View>
        <View style={styles.goods}>
          <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>订单金额</Text><Text style={styles.totalNum}>¥{state.params.payAmount}</Text></View>
          <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>订单号</Text><Text style={styles.price}>{state.params.orderNo}</Text></View>
        </View>
        <View style={styles.paymentMethod}>
          <TouchableOpacity style={styles.payment} onPress={() => this.changePaymentMethod(0)}>
            <Image style={styles.payment1Img} source={require('../images/wechat.png')}></Image>
            <Text>微信支付</Text>
            <Image style={styles.isSelect} source={this.state.payNum === 0 ? require('../images/select.png') : require('../images/unchecked.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.payment} onPress={() => this.changePaymentMethod(1)}>
            <Image style={styles.payment2Img} source={require('../images/alipay.png')}></Image>
            <Text>支付宝</Text>
            <Image style={styles.isSelect} source={this.state.payNum === 1 ? require('../images/select.png') : require('../images/unchecked.png')}></Image>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.save, this.state.isPaying ? styles.saveDisable : styles.saveEnable]} onPress={() => { this.pay() }} disabled={this.state.isPaying}>
          <Text style={styles.saveText}>立即支付</Text>
        </TouchableOpacity>
        <AwesomeAlert
          show={showAlert}
          showProgress={true}
          closeOnHardwareBackPress={false}
          closeOnTouchOutside={false}
          title='Loading..'
          progressSize='small'
          progressColor='gray'
        />
        <PopupDialog
          width={pxToDp(600)} 
          height={pxToDp(385)} 
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
          <View style={styles.bullet}>
            <View style={styles.bulletTitle}><Text style={styles.bulletTitleText}>提示</Text></View>  
            <View style={styles.bulletContent}><Text style={styles.bulletContentText}>{this.state.warning}</Text>
            </View>
            <View style={styles.buttonContent}>
              <TouchableOpacity style={styles.button} onPress={() => {
                if (state.params != undefined && state.params.callBack != undefined) {
                  state.params.callBack();
                }
                navigate('Home');
                }}>
                <Text style={styles.buttonCancle}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonCut]} onPress={this.popupClose.bind(this)}>
                <Text style={styles.buttonConfirm}>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PopupDialog>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
  },
  hidden: {
    display: 'none'
  },
  state: {
    width: '100%',
    height: pxToDp(537),
    alignItems: 'center',
    justifyContent: 'center'
  },
  stateImgWrap: {

  },
  stateImg: {
    width: pxToDp(253),
    height: pxToDp(270)
  },
  stateShow: {
    marginTop:pxToDp(50),
  },
  stateShowText: {
    fontSize: pxToDp(36)
  },
  paymentMethod: {
    marginTop: pxToDp(15),
    backgroundColor: 'white'
  },
  payment: {
    position: 'relative',
    marginLeft: pxToDp(26),
    marginRight: pxToDp(26),
    height: pxToDp(87),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee'
  },
  payment1Img: {
    marginRight: pxToDp(20),
    width: pxToDp(52),
    height: pxToDp(45)
  },
  payment2Img: {
    marginRight: pxToDp(20),
    width: pxToDp(50),
    height: pxToDp(50)
  },
  isSelect: {
    position: 'absolute',
    right: 0,
    width: pxToDp(40),
    height: pxToDp(40)
  },
  goods: {
    marginTop: pxToDp(15),
    backgroundColor: 'white'
  },
  goodsInfo: {
    position: 'relative',
    marginLeft: pxToDp(26),
    flexDirection: 'row',
    alignItems: 'center',
    height: pxToDp(90),
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: pxToDp(1)
  },
  goodsInfo1: {
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee',
  },
  goodsInfoTitle: {
    fontSize: pxToDp(28),
    color: '#a2a2a2',
  },
  totalNum: {
    position: 'absolute',
    right: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#ff0036'
  },
  price: {
    position: 'absolute',
    right: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#a2a2a2'
  },
  result: {
    flexDirection: 'row',
    position: 'relative',
    height: pxToDp(100),
    alignItems: 'center',
    backgroundColor: 'white'
  },
  resultTitle: {
    marginLeft: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#a2a2a2'
  },
  resultPrice: {
    fontSize: pxToDp(32),
    color: '#a2a2a2'
  },
  save:{
    position: "absolute",
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(100)
  },
  saveEnable: {
    backgroundColor: '#2abd89'
  },
  saveDisable: {
    backgroundColor: '#d0d0d0'
  },
  saveText:{
    fontSize: pxToDp(32),
    color: 'white'
  },
  bullet: {
    alignItems: 'center',
    padding: 0
  },
  bulletTitle: {
    marginTop: pxToDp(55),
    marginBottom: pxToDp(25),
    width: pxToDp(480)
  },
  bulletTitleText: {
    fontSize: pxToDp(40),
    color: "#333335",
  },
  bulletContent: {
    width: pxToDp(480),
    height: pxToDp(150)
  },
  bulletContentText: {
    fontSize: pxToDp(33),
    color: '#99979a'
  },
  buttonContent: {
    marginBottom: pxToDp(50),
    height: pxToDp(100),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: "white",
    borderTopWidth: pxToDp(1),
    borderTopColor: '#d9ddde',
  },
  button: {
    width: '50%',
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonCut: {
    borderLeftWidth: pxToDp(1),
    borderLeftColor: '#d9ddde',
  },
  buttonConfirm: {
    color: "#2abd89",
    fontSize: pxToDp(33),
  },
  buttonCancle: {
    color: "#000000",
    fontSize: pxToDp(33),
  }
});
