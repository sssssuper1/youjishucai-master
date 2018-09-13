/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
import Fonter from './Fonter'
import Toast, {DURATION} from 'react-native-easy-toast';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class NewPassword extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.state={
      modelVistibal: true,
      code: '',
      password: '',
      confirmPassword: '',
      isInput: false,
      codeText: '获取验证码',
      phoneNumber: params.phoneNumber,
    }
    
  }
  getCode() {
    clearInterval(this.state.timer)
    let num=60
    let params = {
      mobileNo: this.state.phoneNumber,
      type: '忘记密码'
    };
    Fetch(global.url + '/api/User/GetSMScode', 'post', params, (res) => {
      if (res.result) {
        this.setState({ isInput: true });
        this.state.timer=setInterval(()=>{
          num--;
          let codeText=`重新获取(${num})`
          this.setState({codeText:codeText})
          if(num<=0){
            clearInterval(this.state.timer)
            this.setState({isInput:false,codeText: '获取验证码'})
          }
        },1000)
      } else {
        this.refs.toast.show(res.errMsg);
      }
    }, (err) => {
      this.refs.toast.show(err);
    })
  }
  componentWillMount() {
    this.getCode();
  }
  submit() {
    if (this.state.code == '') {
      this.refs.toast.show('请输入验证码!');
      return;
    }

    if (this.state.password == '') {
      this.refs.toast.show('请输入密码!');
      return;
    }

    if (this.state.password.length < 6) {
      this.refs.toast.show('请确认密码长度在6位及以上!');
      return;
    }

    let digit = /^[0-9]{1,20}$/;
    let alpha = /^[a-zA-Z]{1,20}$/;

    if (digit.exec(this.state.password) || alpha.exec(this.state.password)) {
      this.refs.toast.show('请确认密码包含字母和数字!');
      return;
    }

    if (this.state.confirmPassword !== this.state.password) {
      this.refs.toast.show('两次输入密码不一致!');
      return;
    }

    let params = {
      mobileNo: this.state.phoneNumber,
      smsCode: this.state.code,
      password: this.state.password
    }

    Fetch(global.url + '/api/User/ForgotPassword', 'post', params, (res) => {
      if (res.result) { 
        this.props.navigation.replace('SignIn');
      } else {
        this.refs.toast.show(res.errMsg);
      }
    }, (err) => {
      this.refs.toast.show(err);
    })
  }
  render() {
    const { codeText, isInput } = this.state;
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name="修改密码"></Header1>
        <View style={styles.phone}><Image style={styles.phoneImg} source={require('../images/phone.png')}></Image><Text style={styles.warn}>验证码短信已发送至:</Text><Text style={styles.phoneNumber}>{this.state.phoneNumber}</Text></View>
        <View style={styles.PickerWrap}>  
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            placeholder={'请输入验证码'}
            onChangeText={(text) => this.setState({code:text})}
            value={this.state.code}
          />
          <TouchableOpacity style={isInput?styles.getCode1:styles.getCode} onPress={this.getCode.bind(this)} disabled={isInput}>
            <Text allowFontScaling={false} style={isInput?styles.getCodeText1:styles.getCodeText}>{codeText}</Text>
          </TouchableOpacity>   
        </View>
        <View style={styles.PickerWrap}>  
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            maxLength={20}
            secureTextEntry={true}
            placeholder={'输入密码（6-20字符，包含字母、数字）'}
            onChangeText={(text) => this.setState({password:text})}
            value={this.state.password}
          />
        </View>
        <View style={styles.PickerWrap}>  
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            maxLength={20}
            secureTextEntry={true}
            placeholder={'再次输入密码'}
            onChangeText={(text) => this.setState({confirmPassword:text})}
            value={this.state.confirmPassword}
          />
        </View>
        <View style={styles.fonter}>
          <Fonter name="提交" onPress={this.submit.bind(this)}></Fonter>
        </View>
        <Toast ref="toast" style={styles.toast} position="top" positionValue={pxToDp(400)} />
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
    paddingLeft: pxToDp(34),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#daddde',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
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
    flex: 1,
    height: pxToDp(109),
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
  toast:{
    backgroundColor: '#626262'
  },
});
