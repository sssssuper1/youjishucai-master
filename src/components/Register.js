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
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  alert(deviceHeightDp-uiElementHeight)  
  return deviceHeightDp-uiElementHeight;
}

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
      link: link
    }
  }
  
  show(){
    this.refs.toast.show('hello world!');
  }
  render() {
    const { navigate } = this.props.navigation;
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
            <Fonter name="发送验证码" onPress={() => {navigate(this.state.link,{phoneNumber: this.state.phone})}}></Fonter>
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
  phoneNumber:{
    marginTop: pxToDp(15),
    height: pxToDp(106),
    backgroundColor:'white'
  },
  fonter: {
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34)
  }
});
