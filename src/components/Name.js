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
export default class Person extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true,
      name: ''
    }
    
  }
  show(){
    this.refs.toast.show('hello world!');
  }
  render() {
    return (
      <View style={styles.contenier} >
        <Header1 name="修改昵称"></Header1>
        <View style={styles.margin}>
          <TextInput
            style={styles.name}
            underlineColorAndroid={'transparent'}
            onChangeText={(text) => this.setState({name:text})}
            placeholder={'请输入昵称'}
            placeholderTextColor={'#a6a6a6'}
          />
          <View style={styles.btnWrap}>
            <View style={styles.warn}><Text style={styles.warnText}>昵称由中文、英文、数字、组成。</Text></View>
            <TouchableOpacity onPress={()=>{this.show()}}  style={styles.btn}><Text style={styles.btnText}>确定</Text></TouchableOpacity>
          </View>
        </View> 
        <Toast ref="toast" style={styles.toast} position="top" positionValue={290}/>
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
    marginTop: pxToDp(14)
  },
  name: {
    backgroundColor: 'white'
  },
  btnWrap: {
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34)
  },
  warn: {
    height: pxToDp(100),
    justifyContent: 'center'
  },
  warnText: {
    fontSize: pxToDp(28),
    color: '#a9a9a9'
  },
  btn: {
    width: '100%',
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2abd89'
  },
  btnText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
  toast:{
    backgroundColor: '#626262'
  },
  // modal:{
  //   width: 
  // }
});
