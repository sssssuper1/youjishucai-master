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
  View,
  TextInput,
  Alert
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class TransferInput extends Component {
  constructor(props) {
    super(props);

    this.state={
      phone: ''
    }
  }

  submit() {
    if (!this.state.phone) return;

    Fetch(global.url + '/api/Balance/GetUserInfo?phone=' + this.state.phone, 'get', null, (res) => {
      if (res.result) {
        this.props.navigation.navigate('TransferConfirm', { userInfo: res.data });
      } else {
        Alert.alert('提示', res.errMsg);
      }
    }, (err) => {
      Alert.alert('提示', err);
    });
  }

  render() {
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name={'余额转账'}></Header1>
        <TextInput
          maxLength={11}
          style={styles.phoneNumber}
          keyboardType={'numeric'}
          underlineColorAndroid={'transparent'}
          returnKeyType={'done'}
          onChangeText={(text) => this.setState({phone:text}) }
          placeholder={'请输入ID/手机号'}
          placeholderTextColor={'#a6a6a6'}
        />
        <View style={styles.fonter}>
          <Fonter name="转账至该用户" onPress={this.submit.bind(this)}></Fonter>
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
  phoneNumber:{
    marginTop: pxToDp(15),
    height: pxToDp(106),
    backgroundColor:'white',
    paddingLeft: pxToDp(34),
    fontSize: pxToDp(32)
  },
  fonter: {
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34)
  },
  toast:{
    backgroundColor: '#626262'
  },
});