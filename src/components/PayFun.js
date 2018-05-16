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
import Header1 from './Header1'
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
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  alert(deviceHeightDp-uiElementHeight)  
  return deviceHeightDp-uiElementHeight;
}

type Props = {};
export default class PayFun extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      payNum:0,
      message: 'XZCXZCxzcxzcsdfdsafds',
      showAlert: false,
    }
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  }
  showBullet = () => {
    this.setState({
      isBullet: true
    });
  }
  hideBullet = () => {
    this.setState({
      isBullet: false
    });
  }
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  }
  render() {
    const {userAddresses,state,showAlert,message} = this.state
    return (
      <View style={styles.contenier}>
        <Header1 name="请选择支付方式"></Header1>
        <View style={styles.state}>
          <View style={styles.stateImgWrap}>
            <Image style={styles.stateImg} source={require('../images/payFail.png')}></Image> 
          </View>
          <View style={styles.stateShow}><Text style={styles.stateShowText}>付款失败</Text></View>  
        </View>
        <View style={styles.goods}>
          <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>订单金额</Text><Text style={styles.totalNum}>¥148.00</Text></View>
          <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>订单号</Text><Text style={styles.price}>211547346896</Text></View>
        </View>
        <View style={styles.paymentMethod}>
          <TouchableOpacity style={styles.payment}><Image style={styles.payment1Img} source={require('../images/wechat.png')}></Image><Text>微信支付</Text><Image style={styles.isSelect} source={this.state.payNum===0?require('../images/select.png'):require('../images/unchecked.png')}></Image></TouchableOpacity>
          <TouchableOpacity style={styles.payment}><Image style={styles.payment2Img} source={require('../images/alipay.png')}></Image><Text>支付宝</Text><Image style={styles.isSelect} source={this.state.payNum===1?require('../images/select.png'):require('../images/unchecked.png')}></Image></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.save} onPress={()=>{
          this.showAlert()
        }}>
          <Text style={styles.saveText}>立即支付</Text>
        </TouchableOpacity>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="提示"
          message={message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={true}
          showConfirmButton={true}
          confirmText="确定"
          cancelText="取消"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
          onCancelPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
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
    borderBottomColor: '#f1f1f1'
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
  },
  goodsInfo1: {
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#f1f1f1',
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
    height: pxToDp(100),
    backgroundColor: '#2abd89'
  },
  saveText:{
    fontSize: pxToDp(32),
    color: 'white'
  },
});
