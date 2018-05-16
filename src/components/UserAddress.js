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
export default class UserAddress extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      userAddresses:[{key: 'a'}, {key: 'b'}],
    }
  }
  _renderItem = ({item}) => {
      return (
        <View style={styles.addressInfo}>
          <View style={styles.Left}><Image style={styles.addressImg} source={require('../images/orderAddress.png')}/></View>
          <View style={styles.user}>
            <View style={styles.userNameAndTel}>
              <Text style={styles.userName}>张三丰</Text>
              <Text style={styles.userTel}>1802013458967</Text>
            </View>
            <View style={styles.address}>
              <Text style={styles.addressText}>江苏省南京市鼓楼区中央门街道389号凤凰国际大厦
              11楼01</Text>
            </View>
          </View>
        </View>
      )
    };
  render() {
    const {userAddresses} = this.state
    return (
      <View style={styles.contenier}>
        <Header1 name="选择收货地址"></Header1>
        <FlatList
          data={userAddresses}
          contentContainerStyle={styles.addressInfoWrap}
          renderItem={this._renderItem}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>编辑收货地址</Text>
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
  addressInfoWrap:{
    
  },
  addressInfo:{
    marginTop: pxToDp(15),
    backgroundColor: 'white',
    flexDirection: 'row',
    height: pxToDp(200)
  },
  Left: {
    width: pxToDp(82),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addressImg:{
    width: pxToDp(26),
    height: pxToDp(30),
  },
  user:{
    alignItems:'center',
    justifyContent: 'center'
  },
  userNameAndTel:{
    width: '100%',
    flexDirection: 'row',
  },
  userName:{
    marginRight: pxToDp(46),
    fontSize: pxToDp(32),
    color: '#1d1d20'
  },
  userTel:{
    fontSize: pxToDp(32),
    color: '#1d1d20'
  },
  address:{
    width: pxToDp(614),
    flexWrap: 'wrap',
  },
  addressText:{
    fontSize: pxToDp(28),
    color: '#a7a7a7'
  },
  btn:{
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center',
    borderTopWidth: pxToDp(1),
    borderTopColor: '#daddde',
    backgroundColor: 'white'
  },
  btnText:{
    fontSize: pxToDp(32),
    color: '#2abd89'
  }
});
