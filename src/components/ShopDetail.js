/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Fetch from '../js/fetch';
import Header1 from './Header1.js';
import store from '../store/index';
import CookieManager from 'react-native-cookies';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  WebView,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class ShopDetail extends Component {
  constructor(props) {
    super(props);

    switch (props.navigation.state.params.type) {
      case 0:
      case '牛享吧':
        this.imgBg = require('../images/b-niu.png');
        break;
      case 1:
      case '康养中心':
        this.imgBg = require('../images/b-kangyang.png');
        break;
      case 2:
      case '共享商家':
        this.imgBg = require('../images/b-gongxiang.png');
        break;
      default:
        this.imgBg = require('../images/b-gongxiang.png');
        break;
    }

    this.desc = '';

    this.state={
      tel: '',
      contents: [],
      address: '',
      image: '',
      desc: '',
      WebViewHeight: 0,
      isLogin: false,
      integral: store.getState().integral
    }
    this.loadData();

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        integral: store.getState().integral
      });
    });
  }

  componentDidMount() {
    CookieManager.get(global.url).then(cookie => {
      if (!!cookie.userId) {
        this.setState({
          isLogin: true
        });
      }
    })
  }

  loadData() {
    Fetch(global.url + '/api/store/GetById?id=' + this.props.navigation.state.params.id, 'get', null, (res) => {
      if (res.result) {
        let contents = [];
        if (res.data.openInfo != null) {
          contents = res.data.openInfo.replace('\\r\\n','\r\n').split('\r\n');
        }
        
        this.desc = res.data.desc;
        let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <style>
              img {width: 100% !important; height: 100% !important}
            </style>
        </head>
        <body style="padding: 0; margin: 0">
        <script>
          var height = 0;
          window.location.hash = '#' + document.body.clientHeight;
          function changeHeight() {
            if (document.body.scrollHeight != height) {
              height = document.body.scrollHeight;
              window.postMessage(height);
            }
          }
          var flag =  setInterval(changeHeight, 500);
        </script>
        <div>
        ${res.data.desc}
        </div>
        </body>
        </html>
        `;
        this.setState({
          tel: res.data.tel,
          contents: contents,
          address: res.data.address,
          image: res.data.image,
          desc: html
        });
      } else {
        Alert.alert('提示', res.errMsg);
      }
    }, (err) => {
      Alert.alert('提示', err);
    })
  }

  webViewLoaded = () => {
    this.refs.webview.injectJavaScript(`
        (function() {
          height = document.body.scrollHeight;
          window.postMessage(height);
          clearInterval(flag)
        }())
    `);
  }

  handleMessage(e) {
    if (this.desc != '') {
      this.setState({
        WebViewHeight: e.nativeEvent.data
      });
    }
  }

  _renderContent(list) {
    return list.map((item, index)=> <View key={index}><Text style={styles.workTime}>{item}</Text></View>)
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { navigate, state } = this.props.navigation;
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name="店铺详情页"></Header1>
        <ScrollView style={{flex: 1}}>
          <ImageBackground style={styles.shopImgContainer} source={this.imgBg}>
            <Image style = {styles.shopImg} source = {{uri: this.state.image}} />
          </ImageBackground>
          <View style={styles.margin}>
            <View style={styles.Item}>
              <Image style={styles.itemImg} source={require('../images/shopPay.png')} />
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>买单</Text>
                <Text style={styles.integral}>可用积分: {this.state.integral}</Text>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity style={this.state.isLogin ? styles.payButton : styles.hidden} onPress={() => navigate('ShopPay', {id: state.params.id})}>
                  <Text style={styles.payText}>买单</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={styles.margin}>
            <View style={styles.Item}>
              <Image style={styles.itemImg} source={require('../images/serverPhone.png')}></Image>
              <Text style={styles.title}>客服电话</Text>
              <Text style={styles.phone}>{this.state.tel}</Text>
            </View>
            <View style={styles.Item}>
              <Image style={styles.itemImg} source={require('../images/serverTime.png')}></Image>
              <Text style={styles.title}>工作时间</Text>
              <View>
                {this._renderContent(this.state.contents)}
              </View>
            </View>
            <View style={styles.Item}>
              <Image style={styles.itemImg} source={require('../images/getAddress.png')}></Image>
              <Text style={styles.title}>联系地址</Text>
              <Text style={styles.address}>{this.state.address}</Text>
            </View>
          </View>
          <WebView
            ref={'webview'}
            source={{html: this.state.desc, baseUrl: ''}}
            style={{height: Number(this.state.WebViewHeight), marginTop: pxToDp(15), backgroundColor: 'white',}}
            onLoadEnd={this.webViewLoaded}
            onMessage={(e)=>this.handleMessage(e)}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={true}
            scalesPageToFit={true}>
          </WebView>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%',
  },
  hidden: {
    display: 'none'
  },
  shopImgContainer: {
    width: '100%',
    height: pxToDp(384)
  },
  shopImg: {
    flex: 1
  },
  margin: {
    marginTop: pxToDp(15),
    backgroundColor: 'white',
  },
  Item: {
    flexDirection: 'row',
    marginLeft: pxToDp(34),
    marginRight: pxToDp(34),
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(30),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee'
  },
  itemImg: {
    marginRight: pxToDp(28),
    width: pxToDp(30),
    height: pxToDp(30)
  },
  title:{
    marginRight: pxToDp(24),
    fontSize: pxToDp(32),
    lineHeight: pxToDp(34),
    color: '#2b2b2b'
  },
  integral: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(48),
    color: '#a9a9a9'
  },
  phone: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(34),
    color:'#2bbd89'
  },
  workTime: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(34),
    color: '#a9a9a9',
  },
  address: {
    flex: 1,
    fontSize: pxToDp(28),
    lineHeight: pxToDp(34),
    color: '#a9a9a9',
    flexWrap: 'wrap'
  },
  buttonContainer: {
    justifyContent: 'center'
  },
  payButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(64),
    width: pxToDp(168),
    borderRadius: pxToDp(32),
    backgroundColor: '#2abd89'
  },
  payText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
  webContainer: {
    height: '100%',
    marginTop: pxToDp(15),
    backgroundColor: 'white',
  }
});
