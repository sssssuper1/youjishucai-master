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
export default class SignIn extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true,
      isHidden: true,
      disabled: true,
      phone:'',
      password: ''
    }
    
  }
  isHidden(){
    let isHidden=!this.state.isHidden;
    this.setState({isHidden:isHidden})
  }
  phoneInput(text){
    let disabled=true
    if(text.length>0&&this.state.password.length>0){
      disabled = false
    }
    this.setState({disabled:disabled,phone:text})
  }
  passwordInput(text){
    let disabled=true
    if(this.state.phone.length>0&&text.length>0){
      disabled = false
    }
    this.setState({disabled:disabled,password:text}) 
  }
  render() {
    return (
      <View style={styles.contenier} >
        <Header1 name="登录"></Header1>
        <View style={styles.content}>
          <View style={styles.Item}><
            Text>账户</Text>
            <TextInput
              maxLength={11}
              style={styles.account}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) =>this.phoneInput(text) }
              placeholder={'手机号'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
          <View style={styles.Item}><
            Text>密码</Text>
            <TextInput
              maxLength={11}
              style={styles.account}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.passwordInput(text)}
              secureTextEntry={this.state.isHidden}
              placeholder={'请输入登录密码'}
              placeholderTextColor={'#a6a6a6'}
            />
            <TouchableOpacity onPress={()=>{
              this.isHidden()
            }} style={styles.btnPasswrd}><Image style={this.state.isHidden?styles.hidenPassword:styles.opacity} source={require('../images/hiddenPassword.png')}></Image><Image style={this.state.isHidden?styles.opacity:styles.showPassword}  source={require('../images/showPassword.png')}></Image></TouchableOpacity>
          </View>
          <TouchableOpacity disabled={this.state.disabled}  style={this.state.disabled?styles.signIn:styles.signIn1}><Text style={{color:"white"}}>登录</Text></TouchableOpacity>
          <View style={styles.otherBtn}><TouchableOpacity style={[styles.btn,styles.register]}><Text style={styles.registerText}>快速注册</Text></TouchableOpacity><TouchableOpacity style={[styles.btn,styles.forgotPassword]}><Text>忘记密码?</Text></TouchableOpacity></View> 
          </View>   
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white'
  },
  opacity:{
    display: 'none'
  },
  content: {
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34),
    marginTop: pxToDp(14),
    backgroundColor: 'white'
  },
  Item: {
    position: 'relative',
    flexDirection: 'row',
    height: pxToDp(104),
    alignItems: 'center',
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#f1f1f1'
  },
  account: {
    flex:1,
    height:"100%",
  },
  btnPasswrd:{
    width: pxToDp(80),
    height: "100%",
    justifyContent: 'center',
    alignItems:"center"
  },
  hidenPassword: {
    width: pxToDp(42),
    height: pxToDp(24)
  },
  showPassword: {
    width: pxToDp(44),
    height: pxToDp(28)
  },
  signIn: {
    marginTop: pxToDp(34),
    height: pxToDp(84),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#d0d0d0'
  },
  signIn1:{
    marginTop: pxToDp(34),
    height: pxToDp(84),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#2abd89'
  },
  otherBtn: {
    flexDirection: 'row',
    height: pxToDp(98),
    alignItems: 'center',
  },
  btn: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  registerText: {
   fontSize: pxToDp(28),
   color: '#2abd89'
  },
  forgotPassword: {
    position: 'absolute',
    right:0
  }
});
