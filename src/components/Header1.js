/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler
} from 'react-native';
import pxToDp from '../js/pxToDp';
import hasFringe from '../js/hasFringe';

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
          <TouchableOpacity style={this.props.share ? styles.headerShare : styles.hidden} onPress={() => navigate('Share', {shareData: this.props.shareData})}>
            <Image style={styles.shareImg} source={require('../images/share.png')}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
  },
  hidden: {
    display: 'none'
  },
  header:{
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(96),
    ...Platform.select({
      ios: {
        marginTop: pxToDp(hasFringe() ? 50 : 28)
      },
      android: {}
    })
  },
  headerGoBack: {
    position: 'absolute',
    left: pxToDp(29),
    width: pxToDp(100),
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'center'
  },
  headerShare: {
    position: 'absolute',
    right: pxToDp(40),
    width: pxToDp(50),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerImg:{
    width: pxToDp(24),
    height: pxToDp(40)
  },
  shareImg: {
    width: pxToDp(39),
    height: pxToDp(45)
  },
  headerText: {
    fontSize: pxToDp(36),
    color: '#020202'
  }
});
