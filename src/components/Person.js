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

export default class Person extends Component {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal: true,
      sex: global.data.user.sex,
      name: global.data.user.name,
      showPicker : false
    }
  }

  togglePicker() {
    this.setState({
      showPicker: !this.state.showPicker
    }, () => {
      if (!this.state.showPicker) {
        Fetch(global.url + '/API/user/editUserInfo', 'post', {
          sex: this.state.sex
        }, (responseData) => {
          if (responseData.success) {
            global.data.user.sex = this.state.sex;
            this.show();
          }
        },
        (err) => {
          alert(err);
        });
      }
    });
  }

  changeSex(value) {
    this.setState({ sex: value });
    if (Platform.OS == 'android') {
      Fetch(global.url + '/API/user/editUserInfo', 'post', {
        sex: value
      }, (responseData) => {
        if (responseData.success) {
          global.data.user.sex = value;
          this.show();
        }
      },
      (err) => {
        alert(err);
      });
    }
  }

  callBack() {
    this.setState({
      name: global.data.user.name,
    });
  }

  show(){
    this.refs.toast.show('修改成功!');
  }
  
  render() {
    const { navigate } = this.props.navigation;
    let picker;

    if (Platform.OS == 'android') {
      picker = 
      <View style={styles.set}>
        <Text style={styles.text}>性别</Text>
        <Picker
          style={styles.Picker}
          selectedValue={this.state.sex}
          itemStyle={styles.itempicker}
          onValueChange={(value) => this.changeSex(value)}>
          <Picker.Item label='男' value={0} />
          <Picker.Item label='女' value={1} />
        </Picker>
        <Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
      </View>
    } else {
      picker = 
      <View>
        <TouchableOpacity style={styles.set} onPress={()=>this.togglePicker()}>
          <Text style={styles.text}>性别</Text>
          <Text style={styles.warn}>{!this.state.sex?'男':'女'}</Text>
          <Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
        </TouchableOpacity>
        <Picker
          style={this.state.showPicker?styles.Picker2:styles.hidden}
          selectedValue={this.state.sex}
          itemStyle={styles.itempicker}
          onValueChange={(value) => this.changeSex(value)}>
          <Picker.Item label='男' value={0} />
          <Picker.Item label='女' value={1} />
        </Picker>
      </View>
    }
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="个人信息"></Header1>
        <View style={styles.margin}>
          <TouchableOpacity style={styles.set} onPress={() => {navigate('Name',{callBack: ()=>this.callBack()})}}>
            <Text style={styles.text}>昵称</Text><Text style={styles.warn}>{this.state.name}</Text><Image style={styles.dir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>  
          {picker}
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
  hidden: {
    display: 'none',
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
  Picker2: {
    fontSize: pxToDp(20),
    color: '#a9a9a9',
    height: pxToDp(182),
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
