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
  FlatList,
  Picker
} from 'react-native';
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  return deviceHeightDp-uiElementHeight;
}

export default class Header1 extends Component {
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
      name: props.name,
    }  
  }
    render() {
      const { name } = this.state;
      const { goBack } = this.props.navigation;
    return (
      <View style={styles.contenier}>  
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerGoBack} onPress={() => {goBack()}}>
            <Image style={styles.headerImg} source={require('../images/orderDir.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.headerText}>{name}</Text>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header:{
    position: 'relative',
    height: pxToDp(96),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  headerGoBack: {
    position: 'absolute',
    left: pxToDp(34),
    width: pxToDp(50),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerImg:{
    width: pxToDp(24),
    height: pxToDp(40)
  },
  headerText: {
    fontSize: pxToDp(36),
    color: '#020202'
  }
});
