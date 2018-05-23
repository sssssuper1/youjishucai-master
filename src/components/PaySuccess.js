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

export default class PaySuccess extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    if (!!params&&!!params.amount) {
      this.amount = params.amount;
    }
  }

  render() {
    const { navigate } = this.props.navigation;

    return (
      <View style={styles.container}>
        <Header1 navigation={this.props.navigation} name="付款成功"></Header1>
        <View style={styles.stateBlank}>
          <View style={styles.stateImgWrap}>
            <Image style={styles.stateImg} source={require('../images/paySuccess.png')}></Image>
          </View>
          <View style={styles.stateShow}><Text style={styles.stateShowText}>您已成功付款￥{this.amount}</Text></View>
          <View style={styles.ButtonContainer }>
            <TouchableOpacity style={styles.stateButton} onPress={() => navigate('AllOrder')}>
              <Text>查看订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.stateButton} onPress={() => navigate('Home')}>
              <Text>继续逛逛</Text>
            </TouchableOpacity>  
          </View>  

        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  stateBlank: {
    width: '100%',
    height: pxToDp(600),
    alignItems: 'center',
    justifyContent: 'center'
  },
  stateImgWrap: {
    marginTop: pxToDp(60),
  },
  stateImg: {
    width: pxToDp(253),
    height: pxToDp(270)
  },
  stateShow: {
    marginTop:pxToDp(50),
  },
  ButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  stateButton: {
    marginTop: pxToDp(40),
    marginLeft: pxToDp(40),
    marginRight: pxToDp(40),
    width: pxToDp(200),
    paddingTop: pxToDp(8),
    paddingBottom: pxToDp(8),
    borderWidth: pxToDp(1),
    borderColor: '#a9a9a9',
    borderRadius: pxToDp(10),
    alignItems: 'center'
  },
});
