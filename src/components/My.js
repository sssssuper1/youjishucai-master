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
import Header from './Header'
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
  FlatList
} from 'react-native';
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  alert(deviceHeightDp-uiElementHeight)  
  return deviceHeightDp-uiElementHeight;
}

type Props = {};
export default class My extends Component<Props> {
  constructor(props) {
    super(props);
    //左边菜单
    var type1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //右边菜单  
    let type2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged:(s1,s2)=>r1 !== r2,
    });
  }
  render() {
    return (
      <View style={styles.contenier}>  
        <ImageBackground style={styles.header} source={require('../images/myBackground.png')} resizeMode='cover'>
          <View style={styles.headPointer}>
            <Image style={styles.headPointerImg} source={require('../images/gongxiangzhijia.png')}></Image>
            <Image style={styles.vip} source={require('../images/vip.png')}></Image>
          </View>
          <View>
            <Text style={styles.name}>张三丰</Text>
          </View>
          <TouchableOpacity style={styles.set}>
            <Image style={styles.setImg} source={require('../images/set.png')}></Image>  
          </TouchableOpacity>  
        </ImageBackground>
        <View style={styles.cartInfo}>
          <TouchableOpacity style={styles.cartBtn}>
            <View style={[styles.cartImg,styles.cart1Img]}>
              <Image style={styles.cart1Img} source={require('../images/myCart.png')}></Image>
            </View>
            <View style={styles.cart1NumWrap}><Text style={styles.cart1Num}>100</Text></View>
            <View style={styles.cartNameWrap}>
              <Text style={styles.cartName}>购物车</Text>
            </View>
          </TouchableOpacity> 
          <TouchableOpacity style={styles.cartBtn}>
            <View style={[styles.cartImg,styles.cart2Img]}>
              <Image style={styles.cart2Img} source={require('../images/willPay.png')}></Image>
            </View>
            <View style={styles.cart1NumWrap}><Text style={styles.cart1Num}>100</Text></View>
            <View style={styles.cartNameWrap}>
              <Text style={styles.cartName}>待付款</Text>
            </View>
          </TouchableOpacity>  
          <TouchableOpacity style={styles.cartBtn}>
            <View style={[styles.cartImg,styles.cart3Img]}>
              <Image style={styles.cart3Img} source={require('../images/sendGoods.png')}></Image>
            </View>
            <View style={styles.cart1NumWrap}><Text style={styles.cart1Num}>100</Text></View>
            <View style={styles.cartNameWrap}>
              <Text style={styles.cartName}>待发货</Text>
            </View>
          </TouchableOpacity>  
          <TouchableOpacity style={styles.cartBtn}>
            <View style={[styles.cartImg,styles.cart4Img]}>
              <Image style={styles.cart4Img} source={require('../images/getGoods.png')}></Image>
            </View>
            <View style={styles.cart1NumWrap}><Text style={styles.cart1Num}>100</Text></View>
            <View style={styles.cartNameWrap}>
              <Text style={styles.cartName}>待收货</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.detail}>
          <TouchableOpacity style={styles.detailBtn}>
            <Image style={styles.detailBtnImg} source={require('../images/order.png')}></Image>
            <Text style={styles.detailBtnText}>全部订单</Text> 
            <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailBtn}>
            <Image style={styles.detailBtnImg}  source={require('../images/getAddress.png')}></Image>
            <Text style={styles.detailBtnText}>收货地址</Text> 
            <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailBtn}>
            <Image style={styles.detailBtnImg}  source={require('../images/phone.png')}></Image>
            <Text style={styles.detailBtnText}>客服中心</Text> 
            <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>
        </View>
        <View style={styles.message}>
          <TouchableOpacity style={styles.detailBtn}>
            <Image style={styles.detailBtnImg}  source={require('../images/message.png')}></Image>
            <Text style={styles.detailBtnText}>系统信息</Text>
            <View style={styles.detailBtnNew}><Text style={styles.detailBtnNewText}>NEW</Text></View>
            <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
          </TouchableOpacity>  
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
  header: {
    position: 'relative',
    flexDirection: 'row',
    height: pxToDp(270),
    alignItems: 'center'
  },
  headPointer: {
    position: 'relative',
    marginLeft: pxToDp(36),
    marginRight: pxToDp(26)
  },
  headPointerImg: {
    width: pxToDp(136),
    height: pxToDp(136),
    borderRadius: 100
  },
  vip: {
    position: 'absolute',
    width: pxToDp(43),
    height: pxToDp(43),
    right: 0,
    bottom: 0
  },
  name: {
    fontSize: pxToDp(36),
    color: 'white'
  },
  set: {
    position: 'absolute',
    right: pxToDp(43),
    top: pxToDp(30)
  },
  setImg: {
    width: pxToDp(48),
    height: pxToDp(46)
  },
  cartInfo: {
    flexDirection: 'row',
    paddingTop: pxToDp(30),
    backgroundColor: 'white'
  },
  cartBtn: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(148),
  },
  cartImg: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cart1Img: {
    width: pxToDp(50),
    height: pxToDp(40)
  },
  cart1NumWrap:{
    position: 'absolute',
    right: pxToDp(30),
    backgroundColor: 'white',
    top: pxToDp(15),
    width: pxToDp(58),
    height:pxToDp(30),
    borderWidth: pxToDp(2),
    borderColor: "#15c57f",
    borderRadius: pxToDp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },  
  cart1Num: {
    fontSize: pxToDp(24),
    color: '#11b57c'
  },
  cart2Img: {
    width: pxToDp(44),
    height: pxToDp(40)
  },
  cart3Img: {
    width: pxToDp(44),
    height: pxToDp(40)
  },
  cart4Img: {
    width: pxToDp(48),
    height: pxToDp(40)
  },
  cartNameWrap: {
    marginTop: pxToDp(16)
  },
  cartName: {
    fontSize: pxToDp(24),
    color: '#818181'
  },
  detail: {
    paddingLeft: pxToDp(12),
    paddingRight: pxToDp(12),
    marginTop: pxToDp(12),
    backgroundColor: 'white'
  },
  detailBtn: {
    position: 'relative',
    flexDirection: 'row',
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#f4f4f4',
    height: pxToDp(108),
    alignItems: 'center'    
  },
  detailBtnImg: {
    marginLeft: pxToDp(64),
    marginRight: pxToDp(44),
    width: pxToDp(30),
    height: pxToDp(30)
  },
  detailBtnText: {
    fontSize: pxToDp(30),
  },
  detailDir: {
    position: 'absolute',
    right: pxToDp(24),
    width: pxToDp(11),
    height: pxToDp(22),
  },
  message: {
    marginTop: pxToDp(14),
    paddingLeft: pxToDp(12),
    paddingRight: pxToDp(12),
    backgroundColor: 'white'
  },
  detailBtnNew: {
    position: 'absolute',
    right: pxToDp(50),
    width: pxToDp(72),
    height: pxToDp(30),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDp(30),
    backgroundColor: '#fd4448',
  },
  detailBtnNewText: {
    fontSize: pxToDp(20),
    color: "white", 
  }
});
