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
  Picker,
  BackHandler
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class Header1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
    }
  }

  componentWillMount() {
    if (Platform.OS === 'android') { 
      BackHandler.addEventListener('hardwareBackPress', this.doCallBack);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.doCallBack);
    }  
  }

  doCallBack = () => {
    const { state } = this.props.navigation;
    if (this.props.popupShow != undefined) {
      this.props.popupShow();
      return true;
    }

    if (state.params != undefined && state.params.callBack != undefined) {
      state.params.callBack();
    }
  }

  render() {
    const { name } = this.state;
    const { goBack, state, navigate } = this.props.navigation;
    return (
      <View style={styles.container}>  
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerGoBack} onPress={() => {
            if (this.props.popupShow != undefined) {
              this.props.popupShow();
            } else if (this.props.goHome) {
              navigate('Home');
            } else {
              this.doCallBack();
              goBack();
            }
          }}>
            <Image style={styles.headerImg} source={require('../images/orderDir.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.headerText}>{name}</Text>  
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
  },
  header:{
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(96),
    ...Platform.select({
      ios: {
        marginTop: pxToDp(28)
      },
      android: {}
    })
  },
  headerGoBack: {
    position: 'absolute',
    left: pxToDp(16),
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
