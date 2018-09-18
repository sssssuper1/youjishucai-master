/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
import Fonter from './Fonter'
import Toast from 'react-native-easy-toast';
import {
  StyleSheet,
  View,
  TextInput
} from 'react-native';
import md5 from 'js-md5';
import pxToDp from '../js/pxToDp';

export default class ModifyPayPassword extends Component {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal: true,
      nowPassword: '',
      newPassword: '',
      confirmPassword: ''
    }
  }

  submit() {
    if (this.state.nowPassword == '') {
      this.refs.toast.show('请输入当前支付密码!');
      return;
    }

    if (this.state.newPassword == '') {
      this.refs.toast.show('请输入新支付密码!');
      return;
    }

    if (this.state.newPassword.length !== 6) {
      this.refs.toast.show('请确认密码为6位数字!');
      return;
    }

    let digit = /^[0-9]{1,20}$/;

    if (!digit.exec(this.state.newPassword)) {
      this.refs.toast.show('请确认密码为6位数字!');
      return;
    }
    

    if (this.state.newPassword !== this.state.confirmPassword) {
      this.refs.toast.show('两次输入密码不一致!');
      return;
    }

    let params = {
      oldPassword: md5(this.state.nowPassword),
      newPassword: md5(this.state.confirmPassword)
    }

    Fetch(global.url + '/api/user/ResetPayPwd', 'post', params, (res) => {
      if (res.result) {
        this.refs.toast.show('修改成功！', 500, () => {
          this.props.navigation.goBack();
        });
      } else {
        this.refs.toast.show(res.errMsg);
      }
    }, (err) => {
      this.refs.toast.show(err);
    });
  }
  
  render() {
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="修改支付密码"></Header1>
        <View style={styles.margin}>
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.textWrap}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({ nowPassword: text })}
              value={this.state.nowPassword}
              secureTextEntry={true}
              placeholder={'当前支付密码'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View> 
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.textWrap}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({ newPassword: text })}
              value={this.state.newPassword}
              secureTextEntry={true}
              maxLength={6}
              placeholder={'新密码（6位数字）'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View> 
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.textWrap}
              underlineColorAndroid={'transparent'}
              secureTextEntry={true}
              maxLength={20}
              onChangeText={(text) => this.setState({ confirmPassword: text })}
              value={this.state.confirmPassword}
              placeholder={'确认新密码'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
        </View>
        <View style={styles.fonter}> 
         <Fonter onPress={this.submit.bind(this)} name='修改' ></Fonter> 
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
  margin:{
    marginTop: pxToDp(14),
  },
  passwordWrap:{
    height: pxToDp(109),
    borderBottomWidth: pxToDp(1),
    paddingLeft: pxToDp(30),
    borderBottomColor: '#eeeeee',
    backgroundColor:'white'
  },
  textWrap: {
    height: pxToDp(109),
  },
  fonter:{
    margin: pxToDp(34),
  },
  toast:{
    backgroundColor: '#626262'
  },
});
