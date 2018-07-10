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

export default class UserAddress extends Component {
  constructor(props) {
    super(props);
    this.state={
      userAddresses:[]
    }

    this.loadData();
  }
  loadData() {
    Fetch(global.url + '/API/user/getUserAddressList', 'get', '', (responseData) => {
        if (responseData.success) {
          let detailedAddress = responseData.data[0].detailedAddress.split(' ');

          let data = {
            name: responseData.data[0].consignee,
            phoneNumber: responseData.data[0].consigneePhone,
            province: detailedAddress[0],
            city: detailedAddress[1],
            area: detailedAddress[2].slice(0, detailedAddress[2].indexOf(',')),
            detailAddress: detailedAddress[2].slice(detailedAddress[2].indexOf(',') + 1),
            customerId: responseData.data[0].customerId,
            id: responseData.data[0].id
          };

          this.setState({
            userAddresses: [data]
          });
        }
      }
    );
  }

  callBack() {
    this.loadData();
  }

  _renderItem = ({item}) => {
      return (
        <View style={styles.addressInfo}>
          <View style={styles.Left}><Image style={styles.addressImg} source={require('../images/orderAddress.png')}/></View>
          <View style={styles.user}>
            <View style={styles.userNameAndTel}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userTel}>{item.phoneNumber}</Text>
            </View>
            <View style={styles.address}>
              <Text style={styles.addressText}>{item.province}{item.city}{item.area}{item.detailAddress}</Text>
            </View>
          </View>
        </View>
      )
    };
  render() {
    const { userAddresses } = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="选择收货地址"></Header1>
        <FlatList
          data={userAddresses}
          contentContainerStyle={styles.addressInfoWrap}
          renderItem={this._renderItem}
        />
        <TouchableOpacity style={styles.btn} onPress={() => {navigate('EditAddress', { userAddress: this.state.userAddresses[0], callBack: () => this.callBack()})}}>
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
