/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Header1 from './Header1.js'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class PaySuccess extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    if (!!params) {
      this.amount = params.payAmount;
    }
  }

  seeResult() {
    const { state, replace, navigate } = this.props.navigation;

    switch (state.params.orderType) {
      case 0:
        replace('AllOrder');
        break;
      case 1:
      case 2:
        navigate('Home', { selectedTab: 'my' });
        break;
      default:
        navigate('Home');
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
          <View style={styles.stateShow}><Text style={styles.stateShowText}>订单支付成功!</Text></View>
          <View style={styles.ButtonContainer }>
            <TouchableOpacity style={styles.stateButton} onPress={this.seeResult.bind(this)}>
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
