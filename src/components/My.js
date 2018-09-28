import React, { Component } from 'react';
import store from '../store/index';
import getVipPortrait from '../js/getVipPortrait';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  ScrollView
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class My extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: store.getState().count,
    }
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count,
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { navigate } = this.props.navigation;
    const { vip, name, integral, balance, agent, hasStore, UID, levelName } = this.props.user;
    return (
      <View style={styles.contenier}>  
        <ImageBackground style={styles.headerContainer} source={require('../images/myBackground.png')} resizeMode='cover'>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headPointer} onPress={() => {navigate('Partner')}}>
              <Image style={styles.headPointerImg} source={getVipPortrait(vip)}/>
            </TouchableOpacity>
            <View style={styles.nameContainer}>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.userId}>{UID == '' ? '' : `ID: ${UID}`}</Text>
            </View>
            <View style={styles.peerages}>
              <View style={[hasStore ? styles.tag : styles.hidden, styles.darkOrangeBg]}>
                <Text style={styles.tagInfo}>商户</Text>
              </View>
              <View style={[agent != '' ? styles.tag : styles.hidden, styles.orangeBg]}>
                <Text style={styles.tagInfo}>{agent}</Text>
              </View>
              <View style={[levelName != '' ? styles.tag : styles.hidden, styles.orangeRedBg]}>
                <Text style={styles.tagInfo}>{levelName}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.set} onPress={() => {navigate('Set')}}>
              <Image style={styles.setImg} source={require('../images/set.png')}></Image>  
            </TouchableOpacity>  
          </View>
        </ImageBackground>
        <ScrollView>
          <View style={styles.balanceCell}>
            <TouchableOpacity style={styles.balanceBtn} onPress={()=>navigate('Balance')}>
              <Text style={styles.balanceText}>{balance ? balance.toFixed(2) : 0}</Text>
              <Text style={styles.cartName}>余额</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.balanceBtn} onPress={()=>{navigate('IntegralRecord')}}>
              <Text style={styles.balanceText}>{integral ? integral.toFixed(2) : 0}</Text>
              <Text style={styles.cartName}>积分</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cartInfo}>
            <TouchableOpacity style={styles.cartBtn} onPress={() => {navigate('Cart')}}>
              <View style={[styles.cartImg,styles.cart1Img]}>
                <Image style={styles.cart1Img} source={require('../images/myCart.png')}></Image>
              </View>
              <View style={[this.state.count > 0 ? styles.cart1NumWrap : styles.hidden, this.state.count > 9 ? styles.cartNumWrapLong : styles.cartNumWrapShort]}>
                <Text allowFontScaling={false} style={styles.cart1Num}>{this.state.count}</Text>
              </View>
              <View style={styles.cartNameWrap}>
                <Text style={styles.cartName}>购物车</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartBtn} onPress={() => {navigate('AllOrder', {state: 1})}}>
              <View style={[styles.cartImg,styles.cart2Img]}>
                <Image style={styles.cart2Img} source={require('../images/willPay.png')}></Image>
              </View>
              <View style={[this.props.stateNum.paymentDt > 0 ? styles.cart1NumWrap : styles.hidden, this.props.stateNum.paymentDt > 9 ? styles.cartNumWrapLong : styles.cartNumWrapShort]}>
                <Text allowFontScaling={false} style={styles.cart1Num}>{this.props.stateNum.paymentDt}</Text>
              </View>
              <View style={styles.cartNameWrap}>
                <Text style={styles.cartName}>待付款</Text>
              </View>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.cartBtn} onPress={() => {navigate('AllOrder', {state: 2})}}>
              <View style={[styles.cartImg,styles.cart3Img]}>
                <Image style={styles.cart3Img} source={require('../images/sendGoods.png')}></Image>
              </View>
              <View style={[this.props.stateNum.shipmentDt > 0 ? styles.cart1NumWrap : styles.hidden, this.props.stateNum.shipmentDt > 9 ? styles.cartNumWrapLong : styles.cartNumWrapShort]}>
                <Text allowFontScaling={false} style={styles.cart1Num}>{this.props.stateNum.shipmentDt}</Text>
              </View>
              <View style={styles.cartNameWrap}>
                <Text style={styles.cartName}>待发货</Text>
              </View>
            </TouchableOpacity>  
            <TouchableOpacity style={styles.cartBtn}  onPress={() => {navigate('AllOrder', {state: 3})}}>
              <View style={[styles.cartImg,styles.cart4Img]}>
                <Image style={styles.cart4Img} source={require('../images/getGoods.png')}></Image>
              </View>
              <View style={[this.props.stateNum.goodsReceiptDt > 0 ? styles.cart1NumWrap : styles.hidden, this.props.stateNum.goodsReceiptDt > 9 ? styles.cartNumWrapLong : styles.cartNumWrapShort]}>
                <Text allowFontScaling={false} style={styles.cart1Num}>{this.props.stateNum.goodsReceiptDt}</Text>
              </View>
              <View style={styles.cartNameWrap}>
                <Text style={styles.cartName}>待收货</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.detail}>
            <TouchableOpacity style={styles.detailBtn} onPress={() => {navigate('AllOrder')}}>
              <Image style={styles.detailBtnImg} source={require('../images/order.png')}></Image>
              <Text style={styles.detailBtnText}>商城订单</Text> 
              <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailBtn} onPress={() => {navigate('CommunityOrders')}}>
              <Image style={styles.detailBtnImg} source={require('../images/communityIcon.png')}></Image>
              <Text style={styles.detailBtnText}>社群消费</Text> 
              <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailBtn} onPress={() => {navigate('UserAddress')}}>
              <Image style={styles.detailBtnImg}  source={require('../images/getAddress.png')}></Image>
              <Text style={styles.detailBtnText}>收货地址</Text> 
              <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailBtn} onPress={() => {navigate('Partner')}}>
              <Image style={styles.detailBtnImg}  source={require('../images/myPartner.png')}></Image>
              <Text style={styles.detailBtnText}>我的分享</Text> 
              <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.detailBtn} onPress={() => {navigate('ServiceCenter')}}>
              <Image style={styles.detailBtnImg}  source={require('../images/telephone.png')}></Image>
              <Text style={styles.detailBtnText}>客服中心</Text> 
              <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.detail}>
            <View style={styles.qrCodeContainer}>
              <Image style={styles.qrCode} source={{uri: global.url + '/api/user/GetMyRecommendQrCode?time=' + Date().toString()}}></Image>
              <Text style={styles.qrCodeText}>我的二维码</Text>
            </View>
          </View>
          <View style={styles.hidden}>
            <TouchableOpacity style={styles.detailBtn} onPress={() => {navigate('Message')}}>
              <Image style={styles.detailBtnImg}  source={require('../images/message.png')}></Image>
              <Text style={styles.detailBtnText}>系统信息</Text>
              <View style={styles.detailBtnNew}><Text style={styles.detailBtnNewText}>NEW</Text></View>
              <Image style={styles.detailDir} source={require('../images/rightDir.png')}></Image>
            </TouchableOpacity>  
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
  },
  headerContainer: {
    position: 'relative',
    height: pxToDp(270),
    ...Platform.select({
      ios: {
        height: pxToDp(298),
        paddingTop: pxToDp(28)
      },
      android: {
        height: pxToDp(270),
      }
    })
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
  },
  vip: {
    position: 'absolute',
    width: pxToDp(43),
    height: pxToDp(43),
    right: 0,
    bottom: 0
  },
  nameContainer: {
    flexDirection: 'column'
  },
  peerages: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    width: pxToDp(250),
    height: pxToDp(80)
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    lineHeight: pxToDp(50),
    fontSize: pxToDp(36),
    color: 'white'
  },
  tag: {
    marginLeft: pxToDp(15),
    marginBottom: pxToDp(14),
    height: pxToDp(34),
    paddingHorizontal: pxToDp(17),
    borderRadius: pxToDp(17),
    alignItems: 'center',
    justifyContent: 'center'
  },
  darkOrangeBg: {
    backgroundColor: '#ff711c',
  },
  orangeBg: {
    backgroundColor: '#ff9d00',
  },
  orangeRedBg: {
    backgroundColor: '#ff4545'
  },
  tagInfo: {
    fontSize: pxToDp(22),
    color: '#ffffff'
  },
  balanceCell: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    paddingTop: pxToDp(30),
    paddingBottom: pxToDp(30)
  },
  balanceBtn: {
    flex: 1,
    alignItems: 'center',
    borderRightWidth: pxToDp(2),
    borderRightColor: '#f4f4f4'
  },
  balanceText: {
    color: '#10b57b',
    fontSize: pxToDp(30),
    fontWeight: 'bold',
    lineHeight: pxToDp(50)
  },
  point: {
    lineHeight: pxToDp(50),
    fontSize: pxToDp(30),
    color: '#fdeb63'
  },
  userId: {
    lineHeight: pxToDp(50),
    fontSize: pxToDp(30),
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
    marginTop:pxToDp(12),
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
    backgroundColor: 'white',
    top: pxToDp(15),
    height:pxToDp(30),
    borderWidth: pxToDp(2),
    borderColor: "#15c57f",
    borderRadius: pxToDp(30),
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartNumWrapShort: {
    width: pxToDp(40),
    right: pxToDp(48),
  },
  cartNumWrapLong: {
    width: pxToDp(58),
    right: pxToDp(30),
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
    marginLeft: pxToDp(40),
    marginRight: pxToDp(20),
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
  },
  qrCodeContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: pxToDp(38),
    paddingBottom: pxToDp(38)
  },
  qrCode: {
    width: pxToDp(200),
    height: pxToDp(200),
  },
  qrCodeText: {
    color: '#000000',
    lineHeight: pxToDp(60)
  },
  hidden: {
    display:'none'
  }
});
