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
export default class PayToVip extends Component<Props> {
  constructor(props) {
    super(props);
    //左边菜单
    var type1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //右边菜单  
    let type2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged:(s1,s2)=>r1 !== r2,
    });
    this.state={
      phone:'',
      code:'',
      password: '',
      payNum: 0,
      isInput: false,
      codeText: '获取验证码',
      timer:null
    }
  }
  getCode(){
    clearInterval(this.state.timer)
    let num=60
    this.setState({isInput:true})
    this.state.timer=setInterval(()=>{
      num--;
      let codeText=`重新获取(${num})`
      this.setState({codeText:codeText})
      if(num<=0){
        clearInterval(this.state.timer)
        this.setState({isInput:false,codeText: '获取验证码'})
      }
    },1000)
    
  }
  render() {
    const{codeText,isInput} = this.state
    return (
      <View style={styles.contenier}>  
        <Header1 name="vip会员购买付费"></Header1>
          <View style={styles.user}>
            <View style={styles.PickerWrap}>  
              <Text style={styles.PickerTitle}>手机号：</Text>
              <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.detailAddress}
                maxLength={11}
                placeholder={''}
                onChangeText={(text) => this.setState({phone:text})}
                value={this.state.phone}
              />
              <TouchableOpacity style={isInput?styles.getCode1:styles.getCode} onPress={this.getCode.bind(this)} disabled={isInput}>
                <Text style={isInput?styles.getCodeText1:styles.getCodeText}>{codeText}</Text>
              </TouchableOpacity>   
            </View>
            <View style={styles.PickerWrap}>  
              <Text style={styles.PickerTitle}>验证码：</Text>
              <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.detailAddress}
                placeholder={''}
                onChangeText={(text) => this.setState({code:text})}
                value={this.state.code}
              /> 
            </View>
            <View style={styles.PickerWrap}>  
              <Text style={styles.PickerTitle}>登录密码：</Text>
              <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.detailAddress}
                placeholder={''}
                secureTextEntry={true} 
                onChangeText={(text) => this.setState({password:text})}
                value={this.state.password}
              /> 
            </View>
          </View>
          <View style={styles.vipInfo}>
            <View style={styles.vipItems}>
              <Text style={styles.vipText}>开通服务：</Text><Text style={styles.vipText1}>VIP会员</Text>
            </View>
            <View style={styles.vipItems}>
              <Text style={styles.vipText}>付款模式：</Text><Text style={styles.vipText1}>按年付费</Text>
            </View>
            <View style={styles.vipItems}>
              <Text style={styles.vipText}>应付金额：</Text><Text style={styles.vipText2}>￥2000.00</Text>
            </View>
          </View>
          <View style={styles.paymentMethod}>
            <TouchableOpacity style={styles.payment}><Image style={styles.payment1Img} source={require('../images/wechat.png')}></Image><Text>微信支付</Text><Image style={styles.isSelect} source={this.state.payNum===0?require('../images/select.png'):require('../images/unchecked.png')}></Image></TouchableOpacity>
            <TouchableOpacity style={styles.payment}><Image style={styles.payment2Img} source={require('../images/alipay.png')}></Image><Text>支付宝</Text><Image style={styles.isSelect} source={this.state.payNum===1?require('../images/select.png'):require('../images/unchecked.png')}></Image></TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.save}>
            <Text style={styles.saveText}>立即支付</Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
  },
  header:{
    height: pxToDp(96),
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: pxToDp(36),
    color: '#020202'
  },
  user:{
    marginTop: pxToDp(14),
  },
  pickers:{
    marginTop: pxToDp(14),
  },
  Picker: {
    flex: 1,
    fontSize: pxToDp(28),
    color: '#a9a9a9',
    height: pxToDp(82),
    backgroundColor:'white'
  },
  itempicker: {
    flex: 1,
    backgroundColor:'white'
  },
  PickerWrap:{
    paddingLeft: pxToDp(26),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#daddde',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
    textAlign: 'center'
  },
  PickerTitle:{
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  detailAddress:{
    flex: 1
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
  getCode:{
    marginRight: pxToDp(26),
    width: pxToDp(166),
    height: pxToDp(62),
    borderWidth: pxToDp(1),
    borderColor: '#2abd89',
    borderRadius: pxToDp(10),
    alignItems: 'center',
    justifyContent: 'center'
  },
  getCode1:{
    marginRight: pxToDp(26),
    width: pxToDp(166),
    height: pxToDp(62),
    borderWidth: pxToDp(1),
    borderColor: '#333',
    borderRadius: pxToDp(10),
    alignItems: 'center',
    justifyContent: 'center'
  },
  getCodeText:{
    fontSize: pxToDp(24),
    color: '#2abd89'
  },
  getCodeText1:{
    fontSize: pxToDp(24),
  },
  vipInfo:{
    marginTop: pxToDp(15),
    backgroundColor: 'white',
  },
  vipItems:{
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#f1f1f1',
    height: pxToDp(88),
    flexDirection: 'row',
    alignItems: 'center'
  },
  vipText:{
    marginLeft: pxToDp(26),
    marginRight: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  vipText1:{
    fontSize: pxToDp(28),
    color:"#a9a9a9"
  },
  vipText2:{
    fontSize: pxToDp(32),
    color:"#ff0036"
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
});
