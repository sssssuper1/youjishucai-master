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

export default class ModifyPhoneNum extends Component {
  constructor(props) {
    super(props);
    this.state={
      phone: '',
      code: '',
      isInput: false,
      codeText: '获取验证码',
      timer:null
    }
  }

  getCode() {
    if (this.state.phone == '') {
      this.refs.toast.show('请输入新手机号!');
      return;
    }

    clearInterval(this.state.timer)
    let num=60
    let params = {
      mobileNo: this.state.phone
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

  submit() {
    if (this.state.phone == '') {
      this.refs.toast.show('请输入新手机号!');
      return;
    }

    if (this.state.code == '') {
      this.refs.toast.show('请输入验证码!');
      return;
    }
  }
  
  render() {
    const { codeText, isInput } = this.state;
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="修改手机"></Header1>
        <View style={styles.margin}>
          <View style={styles.PickerWrap}>  
            <TextInput
              underlineColorAndroid={'transparent'}
              style={styles.detailAddress}
              maxLength={11}
              placeholder={'请输入新手机号'}
              placeholderTextColor={'#a6a6a6'}
              onChangeText={(text) => this.setState({phone:text})}
            />
            <TouchableOpacity style={isInput?styles.getCode1:styles.getCode} onPress={this.getCode.bind(this)} disabled={isInput}>
              <Text style={isInput?styles.getCodeText1:styles.getCodeText}>{codeText}</Text>
            </TouchableOpacity>   
          </View>
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.setCode}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({code:text})}
              placeholder={'请输入验证码'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
        </View>
        <View style={styles.fonter}> 
         <Fonter onPress={this.submit.bind(this)} name='绑定' ></Fonter> 
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
  PickerWrap:{
    paddingLeft: pxToDp(30),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#daddde',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#f1f1f1'
  },
  detailAddress:{
    flex: 1,
    height: pxToDp(109)
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
  setCode:{
    height: pxToDp(109)
  },
  passwordWrap:{
    paddingLeft: pxToDp(30),
    height: pxToDp(109),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#f1f1f1',
    backgroundColor:'white'
  },
  fonter:{
    margin: pxToDp(34),
  },
  toast:{
    backgroundColor: '#626262'
  },
});
