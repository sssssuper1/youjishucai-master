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
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  alert(deviceHeightDp-uiElementHeight)  
  return deviceHeightDp-uiElementHeight;
}

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal: true,
      sex: '0',
    }
  }

  changeSex(value) {
    this.setState({ sex: value });
    Fetch(global.url + '/API/user/editUserInfo', 'post', {
      sex: value
    }, (responseData) => {
      if (responseData.success) {
        this.show();
      }
    },
    (err) => {
      alert(err);
    });
  }

  show(){
    this.refs.toast.show('修改成功!');
  }
  
  render() {
      const { navigate } = this.props.navigation;
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="个人信息"></Header1>
        <View style={styles.margin}>
          <TouchableOpacity style={styles.set} onPress={() => {navigate('Name')}}>
            <Text style={styles.text}>昵称</Text><Text style={styles.warn}>张三丰</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>  
          <View style={styles.set}>
            <Text style={styles.text}>性别</Text>
            <Picker
              style={styles.Picker}
              selectedValue={this.state.sex}
              itemStyle={styles.itempicker}
              onValueChange={(value) => this.changeSex(value)}>
              <Picker.Item label='男' value='0' />
              <Picker.Item label='女' value='1' />
            </Picker>
            <Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </View>
          <TouchableOpacity style={styles.set}>
            <Text style={styles.text}>生日</Text><Text style={styles.warn}>1993-05-05</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>
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
  Picker: {
    width: pxToDp(130),
    position: 'absolute',
    right: 0,
    marginLeft: pxToDp(108),
    color: '#a9a9a9',
    height: pxToDp(82),
    alignItems: 'flex-end',
    backgroundColor:'white',
  },
  itempicker: {
    flex: 1,
    backgroundColor: 'white',
  },
  text:{
    marginLeft: pxToDp(28),
    fontSize: pxToDp(32),
    color: '#2b2b2b'
  },
  warn: {
    position: 'absolute',
    right: pxToDp(58),
    fontSize: pxToDp(32),
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
  },
  toast:{
    backgroundColor: '#626262'
  },
});
