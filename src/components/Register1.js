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
import Fonter from './Fonter'
import AwesomeAlert from 'react-native-awesome-alerts';
import Toast, {DURATION} from 'react-native-easy-toast';
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
  Modal,
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
export default class Register1 extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true,
      name: '',
      isInput: false,
      codeText: '获取验证码',
    }
    
  }
  show(){
    this.refs.toast.show('hello world!');
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
      <View style={styles.contenier} >
        <Header1 name="注册"></Header1>
        <View style={styles.phone}><Image style={styles.phoneImg} source={require('../images/phone.jpg')}></Image><Text style={styles.warn}>验证码短信已发送至:</Text><Text style={styles.phoneNumber}>18934354623z</Text></View>
        <View style={styles.PickerWrap}>  
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            maxLength={11}
            placeholder={'请输入验证码'}
            onChangeText={(text) => this.setState({phone:text})}
            value={this.state.phone}
          />
          <TouchableOpacity style={isInput?styles.getCode1:styles.getCode} onPress={this.getCode.bind(this)} disabled={isInput}>
            <Text style={isInput?styles.getCodeText1:styles.getCodeText}>{codeText}</Text>
          </TouchableOpacity>   
        </View>
        <View style={styles.PickerWrap}>  
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            maxLength={11}
            placeholder={'输入密码（6-20字符，包含字母、数字）'}
            onChangeText={(text) => this.setState({phone:text})}
            value={this.state.phone}
          />
        </View>
        <View style={styles.PickerWrap}>  
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            maxLength={11}
            placeholder={'再次输入密码'}
            onChangeText={(text) => this.setState({phone:text})}
            value={this.state.phone}
          />
        </View>
        <View style={[styles.PickerWrap,styles.margin]}>  
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            maxLength={11}
            placeholder={'推荐人手机号（选填）'}
            onChangeText={(text) => this.setState({phone:text})}
            value={this.state.phone}
          />
        </View>
        <View style={styles.fonter}>
          <Fonter name="提交"></Fonter>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
  },
  margin: {
    marginTop:pxToDp(15)
  },
  phoneNumber:{
    marginLeft: pxToDp(18),
    fontSize: pxToDp(28),
    color: '#020202'
  },
  fonter: {
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34)
  },
  phone: {
    height: pxToDp(90),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  phoneImg: {
    marginRight: pxToDp(10), 
    width: pxToDp(25),
    height: pxToDp(35)
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
  warn: {
    fontSize: pxToDp(28),
    color: '#a9a9a9'
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
});
