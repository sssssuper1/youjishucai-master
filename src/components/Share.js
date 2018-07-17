/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
import Toast, { DURATION } from 'react-native-easy-toast';
import { captureRef } from 'react-native-view-shot';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  UIManager,
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
  Modal,
  Button,
  FlatList,
  Picker,
  WebView,
  takeSnapshot
} from 'react-native';
import { wxShareToSession, wxShareToTimeline } from '../js/wxShare';
import pxToDp from '../js/pxToDp';

export default class Share extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.state = {
      uri: '',
      name: params.shareData.name,
      goodImg: params.shareData.goodImg,
      price: params.shareData.price,
      spec: params.shareData.spec,
      preSellPrice: params.shareData.preSellPrice,
    }
  }

  takeToImage(shareType) {
    captureRef(this.refs.shareContents, {
      format: 'png',
      quality: 1,
      result: 'tmpfile'
    }).then((uri) => {
      let data = {
        type: 'imageFile',
        imageUrl: uri
      }
      if (shareType == 1) {
        wxShareToSession(data);
      } else if (shareType == 2) {
        wxShareToTimeline(data);
      }
    },(err) => {
      alert(err);
    })
  }
  
  render() {
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="分享"></Header1>
        <View style={styles.shareContent} ref="shareContents">
          <View style={styles.wrapperWrap}>
            <Image style={styles.goodImg} resizeMode={'contain'} source={{uri: this.state.goodImg}}></Image>
          </View>
          <View style={styles.msgContent}>
            <View>
              <Image style={styles.qrCode} source={{uri: global.url + '/api/user/GetMyRecommendQrCode'}}></Image>
            </View>
            <View style={styles.goodMsg}>
              <View style={styles.goodsName}>
                <Text style={styles.goodsNameText}>{this.state.name}</Text>
              </View>
              <View style={styles.goodsPrice}>
                <Text style={styles.nowPrice}>￥{this.state.price}</Text>
                <Text style={styles.spec}>/{this.state.spec}</Text>
                <Text style={styles.originalPrice}>￥{this.state.preSellPrice}</Text>
              </View>
              <View>
                <Text style={styles.wxText}>微信扫描二维码进入商城</Text>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.shareController}>
          <View style={styles.titleContainer}>
            <Text style={styles.shareLine}>  　　　　　　　　</Text>
            <Text style={styles.shareToTitle}>  商品分享到  </Text>
            <Text style={styles.shareLine}>  　　　　　　　　</Text>
          </View>
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.shareBtn} onPress={() => this.takeToImage(1)}>
              <Image style={styles.btnIcon} source={require('../images/toFriend.png')}/>
              <Text>微信好友</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.shareBtn} onPress={() => this.takeToImage(2)}>
              <Image style={styles.btnIcon} source={require('../images/toCircel.png')}/>
              <Text>朋友圈</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
  },
  shareContent: {
    backgroundColor: 'white',
    borderTopWidth: pxToDp(2),
    borderTopColor: '#eeeeee',
  },
  wrapperWrap: {
    position: 'relative',
    marginLeft: pxToDp(37),
    marginRight: pxToDp(37),
    paddingTop: pxToDp(28),
    paddingBottom: pxToDp(28),
    height: pxToDp(600),
    backgroundColor: 'white',
  },
  goodImg: {
    flex: 1
  },
  msgContent: {
    marginLeft: pxToDp(18),
    marginRight: pxToDp(37),
    flexDirection: 'row',
    height: pxToDp(250),
    alignItems: 'center'
  },
  qrCode: {
    width: pxToDp(227),
    height: pxToDp(227),
  },
  goodMsg: {
    width: pxToDp(460)
  },
  goodsName:{
    justifyContent: 'center',
  },
  goodsNameText: {
    fontSize: pxToDp(32),
    color: '#2b2b2b',
  },
  goodsPrice:{
    height: pxToDp(80),
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: 'white'
  },
  nowPrice:{
    fontSize:pxToDp(32),
    fontWeight: 'bold',
    color:'#ff0036'
  },
  spec: {
    marginLeft: pxToDp(10),
    marginRight: pxToDp(10),
    fontSize: pxToDp(32),
    color: '#a7a7a7'
  },
  wxText: {
    fontSize: pxToDp(32),
    color: '#a7a7a7'
  },
  originalPrice:{
    textDecorationLine: 'line-through',
    color: '#d0d0d0'
  },
  shareController: {
    flex: 1,
    paddingTop: pxToDp(72),
    backgroundColor: 'white'
  },
  titleContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: pxToDp(30)
  },
  shareLine: {
    color: '#d0d0d0',
    textDecorationLine: 'line-through'
  },
  shareToTitle: {
    color: '#d0d0d0',
  },
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: pxToDp(68),
    marginRight: pxToDp(68),
  },
  shareBtn: {
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnIcon: {
    width: pxToDp(88),
    height: pxToDp(88),
    marginBottom: pxToDp(16)
  }
});
