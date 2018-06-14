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

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true,
      name: '',
      message: '该用户名已被占用，另取一个名字吧~'
    }
  }

  changeName() {
    if (this.state.name == '') {
      this.refs.toast.show('请输入昵称!');
      return;
    }
    
    Fetch(global.url + '/API/user/editUserInfo', 'post', {
      name: this.state.name
    }, (responseData) => {
      if (responseData.success) {
        global.data.user.name = this.state.name;
        this.show();
        // this.props.navigation.state.params.callBack();
        // this.props.navigation.goBack();
      } else {
        this.popupDialog.show();
      }
    },
    (err) => {
      Alert.alert('提示',err);
    });
  }

  show(){
    this.refs.toast.show('昵称修改成功!');
  }

  popupClose() {
    this.popupDialog.dismiss();
  }

  render() {
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name="修改昵称" ></Header1>
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
            <TouchableOpacity onPress={this.changeName.bind(this)}  style={styles.btn}><Text style={styles.btnText}>确定</Text></TouchableOpacity>
          </View>
        </View> 
        <Toast ref="toast" style={styles.toast} position="top" positionValue={290} />
        <PopupDialog
          width={pxToDp(600)} 
          height={pxToDp(385)} 
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
          <View style={styles.bullet}>
            <View style={styles.bulletTitle}><Text style={styles.bulletTitleText}>提示</Text></View>  
            <View style={styles.bulletContent}><Text style={styles.bulletContentText}>{this.state.message}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.popupClose.bind(this)}>
              <Text style={styles.buttonText}>确定</Text>
            </TouchableOpacity>
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
  margin:{
    marginTop: pxToDp(14),
  },
  name: {
    height: pxToDp(109),
    paddingLeft: pxToDp(34),
    backgroundColor: 'white',
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
  bullet: {
    alignItems: 'center',
    padding: 0
  },
  bulletTitle: {
    marginTop: pxToDp(55),
    marginBottom: pxToDp(25),
    width: pxToDp(480)
  },
  bulletTitleText: {
    fontSize: pxToDp(40),
    color: "#333335",
  },
  bulletContent: {
    width: pxToDp(480)
  },
  bulletContentText: {
    fontSize: pxToDp(33),
    color: '#99979a'
  },
  button: {
    marginTop: pxToDp(50),
    marginBottom: pxToDp(50),
    width: '100%',
    height: pxToDp(100),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#d9ddde',
    backgroundColor: "white",
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: "#2abd89",
    fontSize: pxToDp(33),
  }
});
