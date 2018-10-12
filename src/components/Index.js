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
  Alert,
  Linking,
  NetInfo,
  TouchableOpacity
} from 'react-native';
import pxToDp from '../js/pxToDp';
import cartTypes from '../actions/shopingCart';
import integralTypes from '../actions/integral';
import balanceTypes from '../actions/balance';
import store from '../store/index';
import Fetch from '../js/fetch';
import Home from './Home';
import Community from './Community';
import Vip from './Vip';
import My from './My';
import TabNavigator from 'react-native-tab-navigator';
import CookieManager from 'react-native-cookies';
import SplashScreen from 'react-native-splash-screen';
import PopupDialog from 'react-native-popup-dialog';

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

    this.state = {
      selectedTab: !!params && !!params.selectedTab ? params.selectedTab : 'home',
      user: {
        id: '',
        name: '',
        phone: '',
        integral: 0,
        balance: 0,
        vip: 0,
        agent: '',
        productAgentLevelName: '',
        UID: '',
        hasStore: false
      },
      isConnected: true,
      announce: '',
      stateNum: {}
    }

    this.goToDownload = '';

    // 获取通知
    this.getNotify();

    this._didFocusSubscription = props.navigation.addListener('didFocus', payload => {
      BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressAndroid);
      if (Platform.OS == 'android') {
        NetInfo.isConnected.fetch().then((isConnected) => {
          if (isConnected) {
            this.loadData();
          } else {
            this.setState({
              isConnected: false
            })
          }
        })
      } else {
        NetInfo.getConnectionInfo().then((connectionInfo) => {
          if (connectionInfo.type == 'none') {
            this.setState({
              isConnected: false
            })
          } else {
            this.loadData();
          }
        })
      }
      

      // this.setTab();
    });
  }
  static navigationOptions = {
    header:null
  };

  loadData() {
    Fetch(global.url + '/api/home/GetInitData', 'get', '', (responseData) => {
      if (responseData.user == null) {
        this.setState({
          isConnected: true
        });
        return
      }

      global.data.user = responseData.user;

      if (responseData.goodCategorys[0]) {
        global.data.vipPrice = responseData.user.vipPrice;
      }
      if (global.data.user.name == '' && global.data.user.name.trim() == '') {
        global.data.user.name = global.data.user.phone;
      }

      this.setState({
        user: global.data.user,
        isConnected: true
      });
      store.dispatch({
        type: cartTypes.setShopingNum.SETNUM,
        num: responseData.cartNum
      });
      store.dispatch({
        type: integralTypes.SETINTEGRAL,
        num: responseData.user.integral
      });
      store.dispatch({
        type: balanceTypes.SETBALANCE,
        num: responseData.user.balance
      });
    },
    (err) => {
      // SplashScreen.hide();
      // Alert.alert('提示',err);
    });

    Fetch(global.url + '/API/user/getStateNum', 'get', '', (responseData) => {
      if (responseData.success) {
        this.setState({
          stateNum: responseData.data
        })
      }
    });
  }

  getNotify() {
    Fetch(global.url + '/api/Home/GetNotify', 'get', null, (res) => {
      if (res.result) {
        if (res.data.notify.force) {
          this.setState({
            announce: res.data.notify.text
          }, () => {
            this.goToDownload = res.data.notify.url;
            this.popupDialog.show();
          });
        } else {
          global.storage.load({
            key: 'notify'
          }).then(ret => {
            if (!ret || !ret.text || ret.text != res.data.notify.text) {
              this.setState({
                announce: res.data.notify.text
              }, () => {
                this.popupDialog.show();
                global.storage.save({
                  key: 'notify',
                  data: {
                    text: res.data.notify.text
                  }
                });
              });
            }
          }).catch(err => {
            this.setState({
              announce: res.data.notify.text
            }, () => {
              this.popupDialog.show();
              global.storage.save({
                key: 'notify',
                data: {
                  text: res.data.notify.text
                }
              });
            });
          });
        }
      }
    }, (err) => { 
    })
  }

  onButtonPress() {
    this.popupDialog.dismiss();

    if (this.goToDownload != undefined && this.goToDownload != '') {
      Linking.openURL(this.goToDownload).catch(err => Alert.alert('提示', err));
    }
  }

  componentDidMount() {
    SplashScreen.hide();
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
        this.loadData();
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

  setTab() {
    const { params } = this.props.navigation.state;
    if (!!params && !!params.selectedTab && this.state.selectedTab !== params.selectedTab) {
      this.setState({
        selectedTab: params.selectedTab
      })
    }
  }

  render() {
    const noSignal =
      <View style={styles.stateBlank}>
        <View style={styles.stateImgWrap}>
          <Image style={styles.stateImg} source={require('../images/noSignal.png')}></Image>
        </View>
        <View style={styles.stateShow}><Text style={styles.stateShowText}>网络错误</Text></View>
        <View style={styles.ButtonContainer }>
          <TouchableOpacity style={styles.stateButton} onPress={this.loadData.bind(this)}>
            <Text>点击刷新</Text>
          </TouchableOpacity>
        </View>
      </View>;
    const tabNav =
      <TabNavigator tabBarStyle={{ backgroundColor: 'white', height: pxToDp(114), alignItems: 'center' }}>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'home'}
          title="有机蔬菜"
          titleStyle={{ color: '#999' }}
          selectedTitleStyle={{ color: '#2abd89' }}
          renderIcon={() => <Image style={styles.menuImg1} source={require('../images/menu1-1.png')} />}
          renderSelectedIcon={() => <Image style={styles.menuImg1} source={require('../images/menu1-2.png')} />}
          onPress={() => this.setState({ selectedTab: 'home' })}>
          <Home navigation={this.props.navigation} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'payment'}
          title="正弘新社群"
          titleStyle={{ color: '#999' }}
          selectedTitleStyle={{ color: '#2abd89' }}
          renderIcon={() => <Image style={styles.menuImg2} source={require('../images/menu2-1.png')} />}
          renderSelectedIcon={() => <Image style={styles.menuImg2} source={require('../images/menu2-2.png')} />}
          onPress={() => this.setState({ selectedTab: 'payment' })}>
          <Community navigation={this.props.navigation} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'vip'}
          title="VIP会员"
          selectedTitleStyle={{ color: '#2abd89' }}
          titleStyle={{ color: '#999' }}
          renderIcon={() => <Image style={styles.menuImg3} source={require('../images/menu3-1.png')} />}
          renderSelectedIcon={() => <Image style={styles.menuImg3} source={require('../images/menu3-2.png')} />}
          onPress={() => this.toVip()}>
          <Vip navigation={this.props.navigation} user={this.state.user} />
        </TabNavigator.Item>
        <TabNavigator.Item
          selected={this.state.selectedTab === 'my'}
          title="我的"
          selectedTitleStyle={{ color: '#2abd89' }}
          titleStyle={{ color: '#999' }}
          renderIcon={() => <Image style={styles.menuImg4} source={require('../images/menu4-1.png')} />}
          renderSelectedIcon={() => <Image style={styles.menuImg4} source={require('../images/menu4-2.png')} />}
          onPress={() => this.toMy()}>
          <My navigation={this.props.navigation} user={this.state.user} stateNum={this.state.stateNum} />
        </TabNavigator.Item>
      </TabNavigator>;
    return (
      <View style={styles.container}>
        {this.state.isConnected ? tabNav : noSignal}
        <PopupDialog
          width={pxToDp(600)} 
          height={pxToDp(620)} 
          containerStyle={{zIndex: 1000}}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
          <View style={styles.bullet}>
            <View style={styles.bulletTitle}><Text style={styles.bulletTitleText}>消息通知</Text></View>  
            <View style={styles.bulletContent}>
              <Text style={styles.bulletContentText}>{this.state.announce}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this)}>
              <Text style={styles.buttonText}>知道了</Text>
            </TouchableOpacity>
          </View>
        </PopupDialog>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
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
  bullet: {
    height: pxToDp(620),
    alignItems: 'center'
  },
  bulletImage: {
    width: "100%",
    height: pxToDp(120)
  },
  bulletTitle: {
    marginTop: pxToDp(64),
    marginBottom: pxToDp(10),
    alignItems: "center"
  },
  bulletTitleText: {
    fontSize: pxToDp(40),
    color: "#333335"
  },
  bulletContent: {
    marginTop: pxToDp(20),
    width: pxToDp(500)
  },
  bulletContentText: {
    fontSize: pxToDp(30),
    lineHeight: pxToDp(50),
    color: '#99979a'
  },
  button: {
    position: 'absolute',
    bottom: pxToDp(60),
    width: pxToDp(334),
    height: pxToDp(84),
    borderRadius: pxToDp(44),
    backgroundColor: "#2abd89",
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: "white"
  },
  stateBlank: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  stateImgWrap: {
    marginTop: pxToDp(60)
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
