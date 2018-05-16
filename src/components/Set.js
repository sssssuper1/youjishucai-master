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
export default class Set extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true
    }
  }
  
  render() {
    return (
      <View style={styles.contenier}>
        <Header1 name="设置"></Header1>
        <View style={styles.margin}>
          <TouchableOpacity style={styles.set}>
            <Image style={styles.Img} source={require('../images/person.png')}></Image><Text style={styles.text}>个人信息</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>  
          <TouchableOpacity style={styles.set}>
            <Image style={styles.Img} source={require('../images/save.png')}></Image><Text style={styles.text}>账户安全</Text><Text style={styles.warn}>更换手机号/改密码</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>  
        </View> 
        <TouchableOpacity style={[styles.set,styles.margin]}>
          <Image style={styles.Img} source={require('../images/about.png')}></Image><Text style={styles.text}>关于我们</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
        </TouchableOpacity> 
        <TouchableOpacity style={styles.save}>
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
