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

export default class Vip extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.contenier}>  
          <Header name="VIP会员"></Header>
          <ScrollView contentContainerStyle={this.props.user.vip > 0 ? styles.scroll : styles.hidden}>
            <View style={styles.vipInfo}>      
              <ImageBackground style={styles.vipBackground} source={require('../images/vipBackground.png')} resizeMode='cover'>
                <View style={styles.vipImages}>
                  <Image style={styles.vipHeadportait} source={require('../images/vip.png')}></Image>      
                </View>
                <View style={styles.vipNameAndCard}>
                  <View style={styles.vipName}><Text style={styles.vipNameText1}>会员：</Text><Text style={styles.vipNameText1}>{this.props.user.name}</Text></View>
                  <View style={styles.vipCard}><Text style={styles.vipCardText1}>卡号：</Text><Text style={styles.vipCardText1}>{this.props.user.vipNumber}</Text></View>
                </View>
              </ImageBackground>
              <View style={true ? styles.hidden : styles.codeWrap}>
                <View style={styles.code}><Image style={styles.codeImg} source={require('../images/QRcode.png')}></Image></View>
                <View style={styles.codeTextWrap}><Text style={styles.codeText}>门店付款码</Text></View>      
              </View>
              <View style={true ? styles.hidden : styles.money}>
                <View style={styles.balance}>
                  <View ><Text style={styles.Num}>¥000</Text></View> 
                  <View><Text style={styles.NumText}>余额</Text></View>        
                </View> 
                <View style={styles.totalConsumption}>
                  <View><Text style={styles.Num}>¥10000</Text></View> 
                  <View><Text style={styles.NumText}>年度消费</Text></View>        
                </View>     
              </View>
              <View style={styles.warnTitle}>
                <Image style={styles.warnImg1} source={require('../images/bubbleLeft1.png')}></Image>
                <Text style={styles.warnText}>vip会员权益</Text>
                <Image style={styles.warnImg2} source={require('../images/bubbleRight1.png')}></Image>
              </View>          
              <View style={styles.warnContent}>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ VIP会员可以优先获得商城内各种新品资讯和活动咨询;</Text></View>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ VIP会员充值即可获得积分;积分能够在会员消费时抵扣现金(不包括VIP充值);</Text></View>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ VIP累计积分只能在同一会员账号内累计,不同账号的积分不能合并;</Text></View>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ VIP充值金额不提现,不找零,不退款,不转让;</Text></View>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ 最终解释权归食鲜机所有</Text></View>
              </View>
            </View>     
          </ScrollView>
          <ScrollView contentContainerStyle={this.props.user.vip > 0 ? styles.hidden : styles.scroll}>
            <View style={styles.vipInfo}>      
              <ImageBackground style={styles.vipBackground} source={require('../images/vipBackground.png')} resizeMode='cover'>
                <View style={styles.vipImages}>
                  <Image style={styles.vipHeadportait} source={require('../images/noVip.png')}></Image>      
                </View>
                <View style={styles.vipNameAndCard}>
                  <View style={styles.vipName}><Text style={styles.vipNameText1}>开通vip会员</Text></View>
                  <View style={styles.vipCard}><Text style={styles.vipNameText1}>一次性充值1000元;尊享VIP超级权益</Text></View>      
                </View>         
              </ImageBackground>
              <View style={styles.vipFuns}>
                <View style={styles.vipFunItem}>
                  <View style={styles.vipFunItemImgWrap}><Image style={styles.vipFunItemImg} source={require('../images/v-1.png')}></Image></View>
                  <View><Text style={styles.vipFunItemText}>专享图标</Text></View>
                </View>
                <View style={styles.vipFunItem}>
                  <View style={styles.vipFunItemImgWrap}><Image style={styles.vipFunItemImg} source={require('../images/v-2.png')}></Image></View>
                  <View><Text style={styles.vipFunItemText}>专享积分</Text></View>
                </View>
                <View style={styles.vipFunItem}>
                  <View style={styles.vipFunItemImgWrap}><Image style={styles.vipFunItemImg} source={require('../images/v-3.png')}></Image></View>
                  <View><Text style={styles.vipFunItemText}>专享返利</Text></View>
                </View>
                <View style={styles.vipFunItem}>
                  <View style={styles.vipFunItemImgWrap}><Image style={styles.vipFunItemImg} source={require('../images/v-4.png')}></Image></View>
                  <View><Text style={styles.vipFunItemText}>专享客服</Text></View>
                </View>
              </View>
              <TouchableOpacity style={styles.openVipBtn} onPress={() => {navigate('PayToVip')}}>
                <Text style={styles.openVipBtnText}>开通VIP会员</Text>
              </TouchableOpacity>        
            </View>
            <View style={styles.warn}>
              <View style={styles.warnTitle}><Image style={styles.warnImg1} source={require('../images/bubbleLeft1.png')}></Image><Text style={styles.warnText}>vip会员权益</Text><Image style={styles.warnImg2} source={require('../images/bubbleRight1.png')}></Image></View>          
              <View style={styles.warnContent}>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ VIP会员可以优先获得商城内各种新品资讯和活动咨询;</Text></View>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ VIP会员充值即可获得积分;积分能够在会员消费时抵扣现金(不包括VIP充值);</Text></View>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ VIP累计积分只能在同一会员账号内累计,不同账号的积分不能合并;</Text></View>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ VIP充值金额不提现,不找零,不退款,不转让;</Text></View>
                <View style={styles.warnContentLine}><Text style={styles.warnContentText}>◆ 最终解释权归食鲜机所有</Text></View>
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
    marginTop: pxToDp(34),
    paddingBottom: pxToDp(114),
  },  
  vipInfo: {
    marginLeft: pxToDp(34),
    marginRight: pxToDp(34),
    backgroundColor: 'white',
    borderRadius: pxToDp(17)
  },
  vipBackground: {
    flexDirection: 'row',   
    width: '100%',  
    height: pxToDp(188),
    alignItems: 'center'
  },
  vipImages: {
    position: 'relative',
    width: pxToDp(150),  
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  vipHeadportait: {
    width: pxToDp(110),
    height: pxToDp(110),
    borderRadius: pxToDp(55),
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
  vipCardText1: {
    fontSize: pxToDp(28)
  },
  vipTimeText: {
    fontSize: pxToDp(28),
    color: 'white'
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
    borderRadius: pxToDp(17),
    marginTop: pxToDp(16),
    marginLeft: pxToDp(34),
    marginRight: pxToDp(34),
    paddingTop: pxToDp(28),
    paddingBottom: pxToDp(28),
    backgroundColor: 'white',
  },
  warnTitle: {
    marginTop: pxToDp(30),
    marginBottom: pxToDp(20),
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
    fontSize: pxToDp(32),
  },
  warnImg2: {
    width: pxToDp(61),
    height: pxToDp(25)  
  },
  warnContent: {
    paddingBottom: pxToDp(50),
    alignItems:'center'      
  },
  warnContentLine: {
    paddingBottom: pxToDp(10)
  },
  warnContentText: {
    width: pxToDp(620),
    lineHeight: pxToDp(44),
    fontSize: pxToDp(28),
    color: '#909090'
  },
  vipFuns:{
    flexDirection: 'row',
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(40),
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
    marginBottom: pxToDp(32),
    flex: 1,
    height: pxToDp(86),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff0036',
    borderRadius: pxToDp(43)
  },
  openVipBtnText: {
    color: 'white',
    fontSize: pxToDp(32)
  }
});
