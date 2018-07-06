/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class ServiceCenter extends Component {
  constructor(props) {
    super(props);
    this.state={
      tel: '',
      content0: '',
      content1: '',
      address: ''
    }
    this.loadData();
  }

  loadData() {
    Fetch(global.url + '/api/home/CustomerServiceInfo', 'get', null, (res) => {
      if (res.result) {
        let contents = res.data.hoursOfService.split('\r\n');
        contents.push('');
        this.setState({
          tel: res.data.tel,
          content0: contents[0],
          content1: contents[1],
          address: res.data.address
        })
      } else {
        Alert.alert('提示', res.errMsg);
      }
    }, (err) => {
      Alert.alert('提示', '网络错误!');
    })
  }
  show(){
    this.refs.toast.show('hello world!');
  }
  render() {
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name="客服中心"></Header1>
        <View style={styles.margin}>
          <View style={styles.Item}>
            <Image style={styles.itemImg} source={require('../images/serverPhone.png')}></Image>
            <Text style={styles.title}>客服电话</Text>
            <Text style={styles.phone}>{this.state.tel}</Text>
          </View>
          <View style={styles.Item}>
            <Image style={styles.itemImg} source={require('../images/serverTime.png')}></Image>
            <Text style={styles.title}>工作时间</Text>
            <View>
              <View><Text style={styles.workTime}>{this.state.content0}</Text></View>
              <View><Text style={styles.workTime}>{this.state.content1}</Text></View>
            </View>
          </View>
          <View style={styles.Item}>
            <Image style={styles.itemImg} source={require('../images/getAddress.png')}></Image>
            <Text style={styles.title}>联系地址</Text>
            <Text style={styles.address}>{this.state.address}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%',
  },
  margin: {
    marginTop: pxToDp(15),
    backgroundColor: 'white',
  },
  Item:{
    flexDirection: 'row',
    marginLeft: pxToDp(34),
    marginRight: pxToDp(34),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(30),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee'
  },
  itemImg: {
    marginRight: pxToDp(28),
    width: pxToDp(30),
    height: pxToDp(30)
  },
  title:{
    marginRight: pxToDp(24),
    fontSize: pxToDp(32),
    lineHeight: pxToDp(34),
    color: '#2b2b2b'
  },
  phone: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(34),
    color:'#2bbd89'
  },
  workTime: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(34),
    color: '#a9a9a9',
  },
  address: {
    flex: 1,
    fontSize: pxToDp(28),
    lineHeight: pxToDp(34),
    color: '#a9a9a9',
    flexWrap: 'wrap'
  }
});
