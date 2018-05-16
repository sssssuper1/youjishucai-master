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
export default class Vip extends Component<Props> {
  constructor(props) {
    super(props);
    //左边菜单
    var type1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //右边菜单  
    let type2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged:(s1,s2)=>r1 !== r2,
    });
    this.state={isVip:false}
  }
  render() {
    const {isVip} = this.state
    return (
      <View style={styles.contenier}>  
          <Header name="VIP会员"></Header>
          <ScrollView contentContainerStyle={isVip?styles.scroll:styles.hidden}>
            <View style={styles.vipInfo}>      
              <ImageBackground style={styles.vipBackground} source={require('../images/vipBackground.png')} resizeMode='cover'>
                <View style={styles.vipImages}>
                  <Image style={styles.vipHeadportait} source={require('../images/vip.png')}></Image>      
                </View>
                <View style={styles.vipNameAndCard}>
                  <View style={styles.vipName}><Text style={styles.vipNameText1}>会员：</Text><Text style={styles.vipNameText1}>张三丰</Text></View>
                  <View style={styles.vipCard}><Text style={styles.vipCardText1}>卡号：</Text><Text style={styles.vipCardText1}>XCF201821</Text></View>      
                </View>        
              </ImageBackground>
              <View style={styles.codeWrap}>
                <View style={styles.code}><Image style={styles.codeImg} source={require('../images/QRcode.png')}></Image></View>
                <View style={styles.codeTextWrap}><Text style={styles.codeText}>门店付款码</Text></View>      
              </View>
              <View style={styles.money}>
                <View style={styles.balance}>
                  <View ><Text style={styles.Num}>¥000</Text></View> 
                  <View><Text style={styles.NumText}>余额</Text></View>        
                </View> 
                <View style={styles.totalConsumption}>
                  <View><Text style={styles.Num}>¥10000</Text></View> 
                  <View><Text style={styles.NumText}>年度消费</Text></View>        
                </View>     
              </View>
            </View>        
            <View style={styles.warn}>
              <View style={styles.warnTitle}><Image style={styles.warnImg1} source={require('../images/bubbleLeft1.png')}></Image><Text style={styles.warnText}>vip会员权益</Text><Image style={styles.warnImg2} source={require('../images/bubbleRight1.png')}></Image></View>          
              <View style={styles.warnContent}>
                <Text style={styles.warnContentText}>
                  •vip会员在app和门店购买活动范围内的商品时，可享受
                  实付金额（不包含运费、用券等促销折扣部分）2%的返
                  利，返利以现金形式返还。
                </Text>             
              </View>          
            </View>        
          </ScrollView>
          <ScrollView contentContainerStyle={styles.scroll}>
            <View style={styles.vipInfo}>      
              <ImageBackground style={styles.vipBackground} source={require('../images/vipBackground.png')} resizeMode='cover'>
                <View style={styles.vipImages}>
                  <Image style={styles.vipHeadportait} source={require('../images/noVip.png')}></Image>      
                </View>
                <View style={styles.vipNameAndCard}>
                  <View style={styles.vipName}><Text style={styles.vipNameText1}>成为vip会员</Text></View>
                  <View style={styles.vipCard}><Text style={styles.vipNameText1}>需要缴纳2000元/年的年费</Text></View>      
                </View>         
              </ImageBackground>
              <View style={styles.vipFuns}>
                <View style={styles.vipFunItem}>
                  <View style={styles.vipFunItemImgWrap}><Image style={styles.vipFunItemImg} source={require('../images/vipFun.png')}></Image></View>
                  <View><Text style={styles.vipFunItemText}>商城9折</Text></View>
                </View>
                <View style={styles.vipFunItem}>
                  <View style={styles.vipFunItemImgWrap}><Image style={styles.vipFunItemImg} source={require('../images/vipFun.png')}></Image></View>
                  <View><Text style={styles.vipFunItemText}>专享客服</Text></View>
                </View>
                <View style={styles.vipFunItem}>
                  <View style={styles.vipFunItemImgWrap}><Image style={styles.vipFunItemImg} source={require('../images/vipFun.png')}></Image></View>
                  <View><Text style={styles.vipFunItemText}>xxxx</Text></View>
                </View>
                <View style={styles.vipFunItem}>
                  <View style={styles.vipFunItemImgWrap}><Image style={styles.vipFunItemImg} source={require('../images/vipFun.png')}></Image></View>
                  <View><Text style={styles.vipFunItemText}>xxxx</Text></View>
                </View>
              </View>
              <TouchableOpacity style={styles.openVipBtn}>
                <Text style={styles.openVipBtnText}>开通VIP会员</Text>
              </TouchableOpacity>        
            </View>
            <View style={styles.warn}>
              <View style={styles.warnTitle}><Image style={styles.warnImg1} source={require('../images/bubbleLeft1.png')}></Image><Text style={styles.warnText}>vip会员权益</Text><Image style={styles.warnImg2} source={require('../images/bubbleRight1.png')}></Image></View>          
              <View style={styles.warnContent}>
                <Text style={styles.warnContentText}>
                •vip会员在app和门店购买活动范围内的商品时，可享受
                实付金额（不包含运费、用券等促销折扣部分）2%的返
                利，返利以现金形式返还。
                </Text>
                <Text style={styles.warnContentText}>
                •vip会员在app和门店购买活动范围内的商品时，可享受
                实付金额（不包含运费、用券等促销折扣部分）2%的返
                利，返利以现金形式返还。
                </Text>              
              </View>          
            </View>         
          </ScrollView>          
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hidden:{
    display: 'none'
  },
  contenier: {
    width: '100%',
    height: '100%'
  },
  scroll: {
    paddingBottom: pxToDp(114),   
  },  
  vipInfo: {
    paddingTop: pxToDp(34),  
    marginLeft: pxToDp(34),
    marginRight: pxToDp(34),
    backgroundColor: 'white',
  },
  vipBackground: {
    flexDirection: 'row',   
    width: '100%',  
    height: pxToDp(188),
    alignItems: 'center'
  },
  vipImages: {
    position: 'relative',
    width: pxToDp(188),  
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  vipHeadportait: {
    width: pxToDp(110),
    height: pxToDp(110),
    borderRadius: 100,
  },
  vip: {
    position: 'absolute',
    right: pxToDp(32),
    bottom: pxToDp(30),
    width: pxToDp(43),
    height: pxToDp(43)
  },
  vipNameAndCard: {
   width: '100%'        
  },
  vipName: {
    flexDirection: 'row'     
  },
  vipCard: {
    flexDirection: 'row'     
  },
  vipNameText1: {
    fontSize: pxToDp(28)      
  },
  vipCartText1: {
    fontSize: pxToDp(28)
  },
  codeWrap: {
    paddingTop: pxToDp(38),  
    alignItems: 'center'      
  },
  codeImg: { 
    width: pxToDp(338),
    height: pxToDp(338)  
  },
  codeText: {
    marginTop: pxToDp(24), 
    marginBottom: pxToDp(38),
    fontSize: pxToDp(24),
    color: '#909090' 
  },
  money: {  
    marginLeft: pxToDp(65),
    marginRight: pxToDp(65),
    paddingBottom: pxToDp(38),
    flexDirection: 'row',
    borderTopWidth: pxToDp(2),
    borderTopColor: '#f4f4f4'
  },
  balance: {
    flex: 1,
    alignItems: 'center',
    height: pxToDp(142)
  },
  totalConsumption: {
    flex: 1,
    alignItems: 'center',
    height: pxToDp(142)
  },
  Num: {
    marginTop: pxToDp(36),  
    fontSize: pxToDp(32),
    color: '#fe0000'  
  },
  NumText: {
    marginTop: pxToDp(20),
    fontSize: pxToDp(24),
    color: '#909090'  
  },
  warn: {
    marginTop: pxToDp(16),
    marginLeft: pxToDp(34),
    marginRight: pxToDp(34),
    paddingTop: pxToDp(28),
    paddingBottom: pxToDp(28),
    backgroundColor: 'white',
  },
  warnTitle: {
    height: pxToDp(56),
    flexDirection: 'row',  
    justifyContent: 'center',
    alignItems: 'center'
  },
  warnImg1: {
    width: pxToDp(40),
    height: pxToDp(25)  
  },
  warnText: {
    marginLeft: pxToDp(23),
    marginRight: pxToDp(23),  
    fontSize: pxToDp(28),
  },
  warnImg2: {
    width: pxToDp(61),
    height: pxToDp(25)  
  },
  warnContent: {
    alignItems:'center'      
  },
  warnContentText: {
    width: pxToDp(620),
    lineHeight: pxToDp(44),
    fontSize: pxToDp(24),
    color: '#909090'
  },
  vipFuns:{
    flexDirection: 'row',
    paddingLeft: pxToDp(8),
    paddingRight: pxToDp(8)
  },
  vipFunItem:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  vipFunItemImg:{
    width: pxToDp(68),
    height: pxToDp(68),
  },
  vipFunItemImgWrap:{
    marginBottom: pxToDp(20)
  },
  vipFunItemText: {
    fontSize: pxToDp(28),
    color: '#818181'
  },
  openVipBtn:{
    marginLeft: pxToDp(32),
    marginRight: pxToDp(32),
    flex: 1,
    height: pxToDp(86),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0036',
    borderRadius: pxToDp(30)
  },
  openVipBtnText: {
    color: 'white',
    fontSize: pxToDp(32)
  }
});
