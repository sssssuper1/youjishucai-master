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
import Toast from 'react-native-easy-toast';
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

export default class ModifyPassword extends Component {
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
      this.refs.toast.show('请输入当前密码!');
      return;
    }

    if (this.state.newPassword == '') {
      this.refs.toast.show('请输入新密码!');
      return;
    }

    if (this.state.newPassword !== this.state.confirmPassword) {
      this.refs.toast.show('两次输入密码不一致!');
      return;
    }
  }
  
  render() {
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="修改密码"></Header1>
        <View style={styles.margin}>
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.textWrap}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({ nowPassword: text })}
              value={this.state.nowPassword}
              secureTextEntry={true}
              placeholder={'当前密码'}
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
              maxLength={20}
              placeholder={'新密码（6-20字符，包含字母、数字）'}
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
        <Toast ref="toast" style={styles.toast} position="bottom" positionValue={pxToDp(300)} />
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
    borderBottomColor: '#f1f1f1',
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
