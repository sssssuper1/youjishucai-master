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
  KeyboardAvoidingView
} from 'react-native';
import md5 from 'js-md5';
import pxToDp from '../js/pxToDp';

export default class Register1 extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.state={
      modelVistibal:true,
      name: '',
      code: '',
      password: '',
      confirmPassword: '',
      payPassword: '',
      confirmPayPassword: '',
      referee: '',
      phoneNumber: params.phoneNumber,
      isInput: false,
      codeText: '获取验证码',
      message: '注册尚未完成，是否退出注册操作~',
      disabled: false
    }
  }
  popupShow() {
    this.popupDialog.show();
  }
  popupClose() {
    this.popupDialog.dismiss();
  }
  getCode() {
    clearInterval(this.timer)
    let params = {
      mobileNo: this.state.phoneNumber
    };
    Fetch(global.url + '/api/User/GetSMScode', 'post', params, (res) => {
      if (res.result) {
        this.setIntervalCode();
      } else {
        this.refs.toast.show(res.errMsg);
      }
    }, (err) => {
      this.refs.toast.show(err);
    })
  }
  setIntervalCode() {
    let num=60
    this.setState({ isInput: true });
    this.timer=setInterval(()=>{
      num--;
      let codeText=`重新获取(${num})`
      this.setState({codeText:codeText})
      if(num<=0){
        clearInterval(this.timer)
        this.setState({isInput:false,codeText: '获取验证码'})
      }
    },1000)
  }
  componentWillMount() {
    this.setIntervalCode();
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

    if (this.state.payPassword == '') {
      this.refs.toast.show('请输入支付密码!');
      return;
    }

    if (this.state.referee == '') {
      this.refs.toast.show('请输入推荐人手机号!');
      return;
    }

    if (this.state.password.length < 6) {
      this.refs.toast.show('请确认密码长度在6位及以上!');
      return;
    }

    if (this.state.payPassword.length !== 6) {
      this.refs.toast.show('请确认支付密码为6位数字!');
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

    if (!digit.exec(this.state.payPassword)) {
      this.refs.toast.show('请确认支付密码为6位数字!');
      return;
    }

    if (this.state.confirmPayPassword !== this.state.payPassword) {
      this.refs.toast.show('两次输入支付密码不一致!');
      return;
    }

    let params = {
      mobileNo: this.state.phoneNumber,
      smsCode: this.state.code,
      password: this.state.password,
      payPwd: md5(this.state.payPassword),
      referrerPhone: this.state.referee
    }

    this.setState({
      disabled: true
    })

    Fetch(global.url + '/api/User/Register', 'post', params, (res) => {
      this.setState({
        disabled: false
      })
      if (res.result) {
        this.props.navigation.replace('Home');
      } else {
        this.refs.toast.show(res.errMsg);
      }
    }, (err) => {
      this.setState({
        disabled: false
      })
      this.refs.toast.show(err);
    });
  }
  render() {
    const { codeText, isInput } = this.state;
    const { navigate, goBack } = this.props.navigation;

    const scrollView = 
      <ScrollView keyboardShouldPersistTaps={'handled'}>
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
        <View style={[styles.PickerWrap, styles.margin]}>
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            maxLength={6}
            secureTextEntry={true}
            placeholder={'输入支付密码（6位数字）'}
            onChangeText={(text) => this.setState({payPassword:text})}
            value={this.state.payPassword}
          />
        </View>
        <View style={styles.PickerWrap}>  
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            maxLength={6}
            secureTextEntry={true}
            placeholder={'再次输入支付密码'}
            onChangeText={(text) => this.setState({confirmPayPassword:text})}
            value={this.state.confirmPayPassword}
          />
        </View>
        <View style={[styles.PickerWrap,styles.margin]}>  
          <TextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            maxLength={11}
            returnKeyType={'done'}
            placeholder={'邀请人手机号'}
            onChangeText={(text) => this.setState({referee:text})}
            value={this.state.referee}
          />
        </View>
        <View style={styles.fonter}>
          <Fonter name="提交" onPress={this.submit.bind(this)} disabled={this.state.disabled}></Fonter>
        </View>
      </ScrollView>
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name="注册" popupShow={this.popupShow.bind(this)}></Header1>
        {Platform.OS == 'android' ? scrollView :
          <KeyboardAvoidingView behavior={'position'}>
            {scrollView}
          </KeyboardAvoidingView>}
        <Toast ref="toast" style={styles.toast} position="top" positionValue={pxToDp(400)} />
        <PopupDialog
          width={pxToDp(600)} 
          height={pxToDp(400)} 
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
          <View style={styles.bullet}>
            <View style={styles.bulletTitle}><Text style={styles.bulletTitleText}>提示</Text></View>  
            <View style={styles.bulletContent}><Text style={styles.bulletContentText}>{this.state.message}</Text>
            </View>
            <View style={styles.buttonContent}>
              <TouchableOpacity style={styles.button} onPress={this.popupClose.bind(this)}>
                <Text style={styles.buttonCancle}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonCut]} onPress={() => goBack()}>
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
  bullet: {
    alignItems: 'center',
    padding: 0
  },
  bulletTitle: {
    marginTop: pxToDp(55),
    marginBottom: pxToDp(25),
    width: pxToDp(480),
    height: pxToDp(50)
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
  },
  toast:{
    backgroundColor: '#626262'
  },
});
