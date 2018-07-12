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
  BackHandler,
  ToastAndroid,
  Alert
} from 'react-native';
import pxToDp from '../js/pxToDp';
import types from '../actions/shopingCart';
import store from '../store/index';
import Fetch from '../js/fetch';
import Home from './Home';
import Community from './Community';
import Vip from './Vip';
import My from './My';
import TabNavigator from 'react-native-tab-navigator';
import CookieManager from 'react-native-cookies';
import SplashScreen from 'react-native-splash-screen';

global.url = "http://sxj.xcf178.com";
// global.url = "http://xsq.ngrok.sws168.com";

global.data = {
  user: {
    vip: 0,
    name: '未登录',
  }
}

let firstClick = 0;

export default class Index extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    if (!!params && !!params.selectedTab) {
      this.state = {
        selectedTab: params.selectedTab,
        user: {
          name: '',
          phone: '',
          integral: 0,
          vip: 0
        },
        stateNum: {}
      }
    } else {
      this.state = {
        selectedTab: 'home',
        user: {
          name: '',
          phone: '',
          integral: 0,
          vip: 0
        },
        stateNum: {}
      }
    }

    this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
      this.loadData();
    });

    // this.loadData();
  }
  static navigationOptions = {
    header:null
  };

  loadData() {
    Fetch(global.url + '/api/home/GetInitData', 'get', '', (responseData) => {
      SplashScreen.hide();
      global.data.user = responseData.user;
      if (responseData.goodCategorys[0]) {
        global.data.vipPrice = responseData.goodCategorys[0].config.vipPrice;
      }
      if (global.data.user.name == '' && global.data.user.name.trim() == '') {
        global.data.user.name = global.data.user.phone;
      }
      this.setState({
        user: global.data.user,
      });
      store.dispatch({
        type: types.getShopingNum.GETNUM,
        num: responseData.cartNum
      });
    },
    (err) => {
      SplashScreen.hide();
      Alert.alert('提示',err);
    });

    Fetch(global.url + '/API/user/getStateNum', 'get', '', (responseData) => {
      if (responseData.success) {
        this.setState({
          stateNum: responseData.data
        })
      }
    });
  }

  componentDidMount() {
    this._willBlurSubscription = this.props.navigation.addListener('willBlur', payload =>
      BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressAndroid)
    );
  }

  componentWillUnmount() {
    this._didFocusSubscription && this._didFocusSubscription.remove();
    this._willBlurSubscription && this._willBlurSubscription.remove();
  }

  onBackButtonPressAndroid = () => {
    let timestamp = (new Date()).valueOf();
    if (timestamp - firstClick > 2000) {
        firstClick = timestamp;
        ToastAndroid.show('再按一次退出', ToastAndroid.SHORT);
        return true;
    } else {
      BackHandler.exitApp();
    }
  }

  toMy() {
    CookieManager.get(global.url).then(cookie => {
      if (!!cookie.userId) {
        this.setState({
          selectedTab: 'my'
        });
      } else {
        this.props.navigation.navigate('SignIn');
      }
    })
  }

  toVip() {
    CookieManager.get(global.url).then(cookie => {
      if (!!cookie.userId) {
        this.setState({
          selectedTab: 'vip'
        });
      } else {
        this.props.navigation.navigate('SignIn');
      }
    })
  }

  render() {
    return (
        <TabNavigator tabBarStyle={{backgroundColor:'white',height: pxToDp(114),alignItems: 'center'}}>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'home'}
              title="有机蔬菜"
              titleStyle={{color:'#999'}}
              selectedTitleStyle={{color:'#2abd89'}}
              renderIcon={() => <Image style={styles.menuImg1} source={require('../images/menu1-1.png')} />}
              renderSelectedIcon={() => <Image style={styles.menuImg1} source={require('../images/menu1-2.png')} />}
              onPress={() => this.setState({ selectedTab: 'home' })}>
            <Home navigation={this.props.navigation} />
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'payment'}
              title="正弘新社群"
              titleStyle={{color:'#999'}}
              selectedTitleStyle={{color:'#2abd89'}}
              renderIcon={() => <Image style={styles.menuImg2} source={require('../images/menu2-1.png')} />}
              renderSelectedIcon={() => <Image style={styles.menuImg2} source={require('../images/menu2-2.png')} />}
              onPress={() => this.setState({ selectedTab: 'payment' })}>
              <Community navigation={this.props.navigation} />
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'vip'}
              title="vIP会员"
              selectedTitleStyle={{color:'#2abd89'}}
              titleStyle={{color:'#999'}}
              renderIcon={() => <Image style={styles.menuImg3} source={require('../images/menu3-1.png')} />}
              renderSelectedIcon={() => <Image style={styles.menuImg3} source={require('../images/menu3-2.png')} />}
              onPress={() => this.toVip()}>
              <Vip navigation={this.props.navigation} user={this.state.user}/>
          </TabNavigator.Item>
          <TabNavigator.Item
              selected={this.state.selectedTab === 'my'}
              title="我的"
              selectedTitleStyle={{color:'#2abd89'}}
              titleStyle={{color:'#999'}}
              renderIcon={() => <Image style={styles.menuImg4} source={require('../images/menu4-1.png')} />}
              renderSelectedIcon={() => <Image style={styles.menuImg4} source={require('../images/menu4-2.png')} />}
              onPress={() => this.toMy()}>
              <My navigation={this.props.navigation} user={this.state.user} stateNum={this.state.stateNum}/>
          </TabNavigator.Item>
        </TabNavigator>
    );
  }
}


const styles = StyleSheet.create({
  menuImg1: {
    marginTop:pxToDp(10),
    width:pxToDp(50),
    height:pxToDp(50)
  },
  menuImg2: {
    marginTop:pxToDp(10),
    width:pxToDp(46),
    height:pxToDp(46)
  },
  menuImg3: {
    marginTop:pxToDp(10),
    width:pxToDp(50),
    height:pxToDp(50)
  },
  menuImg4: {
    marginTop:pxToDp(10),
    width:pxToDp(44),
    height:pxToDp(48)
  },
});
