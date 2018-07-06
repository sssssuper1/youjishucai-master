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
import Fonter from './Fonter'
import AwesomeAlert from 'react-native-awesome-alerts';
import Toast, {DURATION} from 'react-native-easy-toast';
import SplashScreen from 'react-native-splash-screen';
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

export default class SignIn extends Component {
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

  componentDidMount() {
    SplashScreen.hide();
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

  login() {
    let params = {
      mobileNo: this.state.phone,
      password: this.state.password
    }

    Fetch(global.url + '/api/User/UserLogin', 'post', params, (res) => {
      if (res.result) {
        global.storage.save({
          key: 'Cookie',
          data: {
            userId: 'TestUser'
          }
        });
        this.props.navigation.replace('Home');
      } else {
        this.refs.toast.show(res.errMsg);
      }
    }, (err) => {
      this.refs.toast.show(err);
    })
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="登录"></Header1>
        <View style={styles.content}>
          <View style={styles.Item}>
            <Text>账户</Text>
            <TextInput
              style={styles.account}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) =>this.phoneInput(text) }
              placeholder={'手机号'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
          <View style={styles.Item}>
            <Text>密码</Text>
            <TextInput
              style={styles.account}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.passwordInput(text)}
              secureTextEntry={this.state.isHidden}
              placeholder={'请输入登录密码'}
              placeholderTextColor={'#a6a6a6'}
            />
            <TouchableOpacity onPress={()=>{this.isHidden()}} style={styles.btnPasswrd}>
              <Image style={this.state.isHidden ? styles.hidenPassword : styles.opacity} source={require('../images/hiddenPassword.png')}></Image>
              <Image style={this.state.isHidden ? styles.opacity : styles.showPassword} source={require('../images/showPassword.png')}></Image>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={this.login.bind(this)} disabled={this.state.disabled} style={this.state.disabled?styles.signIn:styles.signIn1}><Text style={{color:"white"}}>登录</Text></TouchableOpacity>
          <View style={styles.otherBtn}>
            <TouchableOpacity style={[styles.btn, styles.register]} onPress={() => {navigate('Register',{linkType: 1})}}>
              <Text style={styles.registerText}>快速注册</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.btn, styles.forgotPassword]} onPress={() => {navigate('Register',{linkType: 2})}}>
              <Text>忘记密码?</Text>
            </TouchableOpacity>
          </View> 
        </View>
        <Toast ref="toast" style={styles.toast} position="top" positionValue={pxToDp(400)} />
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
    borderBottomColor: '#eeeeee'
  },
  account: {
    flex:1,
    height:"100%",
    paddingLeft: pxToDp(20)
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
  },
  toast:{
    backgroundColor: '#626262'
  },
});
