/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Alert,
  ImageBackground,
  WebView,
  ScrollView
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class ShopDetail extends Component {
  constructor(props) {
    super(props);
    this.imgBg = require('../images/b-tang.png');
    if (props.navigation.state.params.type == 1) {
      this.imgBg = require('../images/b-kangyang.png');
    } else if (props.navigation.state.params.type == 2) {
      this.imgBg = require('../images/b-gongxiang.png');
    }

    this.desc = '';

    this.state={
      tel: '',
      contents: [],
      address: '',
      image: '',
      desc: '',
      WebViewHeight: 0
    }
    this.loadData();
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
        <div>
        ${res.data.desc}
        </div>
        <script>
          window.onload=function(){ window.location.hash = '#' + document.body.clientHeight;document.title = document.body.clientHeight;}
        </script>
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
        const height = document.body.scrollHeight;
        window.postMessage(height);
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

  render() {
    return (
      <View style={styles.contenier} >
        <Header1 navigation={this.props.navigation} name="店铺详情页"></Header1>
        <ScrollView style={{flex: 1}}>
          <ImageBackground style={styles.shopImgContainer} source={this.imgBg}>
            <Image style = {styles.shopImg} source = {{uri: this.state.image}} />
          </ImageBackground>
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
            source={{html: this.state.desc}}
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
  Item:{
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
  webContainer: {
    height: '100%',
    marginTop: pxToDp(15),
    backgroundColor: 'white',
  }
});
