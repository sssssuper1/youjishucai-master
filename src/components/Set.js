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
import CookieManager from 'react-native-cookies';
import { StackActions, NavigationActions } from 'react-navigation';
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

export default class Set extends Component {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true
    }
  }

  logout() {
    global.storage.remove({
      key: 'Cookie'
    });

    CookieManager.clearAll();

    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: 'SignIn' })],
    });
    this.props.navigation.dispatch(resetAction);
  }
  
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="设置"></Header1>
        <View style={styles.margin}>
          <TouchableOpacity style={styles.set} onPress={() => {navigate('Person')}}>
            <Image style={styles.Img} source={require('../images/person.png')}></Image><Text style={styles.text}>个人信息</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>  
          <TouchableOpacity style={styles.set} onPress={() => {navigate('AccountSecurity')}}>
            <Image style={styles.Img} source={require('../images/save.png')}></Image><Text style={styles.text}>账户安全</Text><Text style={styles.warn}>更换手机号/改密码</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>  
        </View> 
        <TouchableOpacity style={[styles.set,styles.margin]}>
          <Image style={styles.Img} source={require('../images/about.png')}></Image><Text style={styles.text}>关于我们</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.save} onPress={this.logout.bind(this)}>
          <Text style={styles.saveText}>退出当前账户</Text>
        </TouchableOpacity>
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
    borderBottomColor: '#f1f1f1',
    backgroundColor: "white",
  },
  text:{
    marginLeft: pxToDp(28),
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
