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

export default class Register extends Component {
  constructor(props) {
    super(props);
    
    const { params } = this.props.navigation.state;
    let name = '';
    let link = '';
    if (params.linkType == 1) {
      name = '注册';
      link = 'Register1';
    } else if (params.linkType == 2) {
      name = '忘记密码';
      link = 'NewPassword';
    }

    this.state={
      modelVistibal:true,
      name: name,
      link: link,
      phone: ''
    }
  }

  submit() {
    if (this.state.phone == '') {
      this.refs.toast.show('请输入手机号码');
      return;
    }

    let params = {
      mobileNo: this.state.phone
    };

    Fetch(global.url + '/api/User/GetSMScode', 'post', params, (res) => {
      if (res.result) {
        this.props.navigation.navigate(this.state.link, { phoneNumber: this.state.phone });
      } else {
        this.refs.toast.show(res.errMsg);
      }
    }, (err) => {
      this.refs.toast.show(err);
    })
  }

  render() {
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name={this.state.name}></Header1>
        <TextInput
          maxLength={11}
          style={styles.phoneNumber}
          underlineColorAndroid={'transparent'}
          onChangeText={(text) => this.setState({phone:text}) }
          placeholder={'请输入手机号'}
          placeholderTextColor={'#a6a6a6'}
        />
        <View style={styles.fonter}>
          <Fonter name="发送验证码" onPress={this.submit.bind(this)}></Fonter>
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
  phoneNumber:{
    marginTop: pxToDp(15),
    height: pxToDp(106),
    backgroundColor:'white',
    paddingLeft: pxToDp(34)
  },
  fonter: {
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34)
  },
  toast:{
    backgroundColor: '#626262'
  },
});