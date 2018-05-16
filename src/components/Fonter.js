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
  FlatList
} from 'react-native';
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  return deviceHeightDp-uiElementHeight;
}

type Props = {};
export default class Fonter extends Component<Props> {
  constructor(props) {
    super(props);
    //左边菜单
    var type1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //右边菜单  
    let type2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged:(s1,s2)=>r1 !== r2,
    });
    this.state = {
      name: props.name
    }  
  }
    render() {
        const { name}=this.state
    return (
      <TouchableOpacity  style={styles.btn}><Text style={styles.btnText}>{name}</Text></TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    marginTop:pxToDp(34),
    width: '100%',
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2abd89'
  },
  btnText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
});
