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
import Fonter from './Fonter'
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
export default class ModifyPassword extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true
    }
  }
  
  render() {
    return (
      <View style={styles.contenier}>
        <Header1 name="修改密码"></Header1>
        <View style={styles.margin}>
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.name}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({name:text})}
              secureTextEntry={true}
              placeholder={'当前密码'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View> 
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.name}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({name:text})}
              secureTextEntry={true}
              placeholder={'新密码（6-20字符，包含字母、数字）'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View> 
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.name}
              underlineColorAndroid={'transparent'}
              secureTextEntry={true}
              onChangeText={(text) => this.setState({name:text})}
              placeholder={'确认新密码'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
        </View>
        <View style={styles.fonter}> 
         <Fonter  name='修改' ></Fonter> 
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
    marginTop: pxToDp(14),
  },
  passwordWrap:{
    height: pxToDp(109),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#f1f1f1',
    backgroundColor:'white'
  },
  fonter:{
    margin: pxToDp(34),
  }
});
