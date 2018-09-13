/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Header1 from './Header1.js'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class AccountSecurity extends Component {
  constructor(props) {
    super(props);
    let phoneNumber = global.data.user.phone
    this.state={
      phone: phoneNumber.slice(0,3) + '****' + phoneNumber.slice(7),
    }
  }

  callBack() {
    let phoneNumber = global.data.user.phone
    this.setState({
      phone: phoneNumber.slice(0, 3) + '****' + phoneNumber.slice(7),
    });
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="账户安全"></Header1>
        <View style={styles.margin}>
          <TouchableOpacity style={styles.set} onPress={() => {navigate('ModifyPhoneNum')}}>
            <Text style={styles.text}>修改手机号码</Text><Text style={styles.warn}>{this.state.phone}</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>  
          <TouchableOpacity style={styles.set} onPress={() => { navigate('ModifyPassword', {callBack: () => this.callBack()})}}>
            <Text style={styles.text}>修改登录密码</Text><Text style={styles.warn}>修改</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.set} onPress={() => { navigate('ModifyPayPassword', {callBack: () => this.callBack()})}}>
            <Text style={styles.text}>修改支付密码</Text><Text style={styles.warn}>修改</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>
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
  margin:{
    marginTop: pxToDp(14)
  },
  set:{
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: pxToDp(34),
    height: pxToDp(107),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee',
    backgroundColor: "white",
  },
  text:{
    fontSize: pxToDp(32),
    color: '#2b2b2b'
  },
  warn: {
    position: 'absolute',
    right: pxToDp(58),
    fontSize: pxToDp(28),
    color: '#a9a9a9'
  },
  Img:{
    width: pxToDp(30),
    height: pxToDp(30)
  },
  dir: {
    position: 'absolute',
    right: pxToDp(26),
    width: pxToDp(12),
    height: pxToDp(20)
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
  }
});
