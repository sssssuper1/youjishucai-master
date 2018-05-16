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
import Header1 from './Header1'
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
  FlatList,
  Picker
} from 'react-native';
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  alert(deviceHeightDp-uiElementHeight)  
  return deviceHeightDp-uiElementHeight;
}

type Props = {};
export default class MyOrder extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      userAddresses:[{key: 'a'}, {key: 'b'}],
      state: 0,
      dataSource: [{ isSelect: true, name: '有机青菜', img: '', spec: '500g袋装', originalPrice: '58.90', presentPrice: '49.00', num: 2 }, { isSelect: false, name: '有机花菜', spec: '500g袋装', originalPrice: '12.90', presentPrice: '10.00', num: 1 }],
    }
  }
  //list渲染
  _renderRow1(item, index) {
    return (
      <View style={styles.list}>
        <View style={styles.good}>
          <Image style={styles.goodImg} source={require('../images/kangyangzhongxin.png')}></Image>
        </View>
        <View style={styles.goodDetail}>
          <View style={styles.goodNameWrap}><Text style={styles.goodName}>{item.name}</Text></View>
          <View style={styles.goodSpecWrap}><Text style={styles.goodSpec}>{item.spec}</Text></View>
          <View style={styles.goodOriginalPriceWrap}><Text   style={styles.goodOriginalPrice}>￥{item.originalPrice}</Text></View>
          <View style={styles.goodPresentPriceWrap}>
            <Text style={styles.goodSymble}>￥</Text><Text style={styles.goodPresentPrice}>{item.presentPrice}</Text><Text style={styles.company}>/袋</Text>
            <View style={styles.goodsNum}>
              <Text style={styles.num}>X{item.num}</Text>
            </View>
          </View>
        </View>
      </View>  
    );
  }
  render() {
    const {userAddresses,state} = this.state
    return (
      <View style={styles.contenier}>
        <Header1 name="我的订单"></Header1>
        <ScrollView>
          <View style={styles.orderResult}>
            <View style={styles.orderNumWrap}><Text style={styles.orderNum}>订单号：</Text><Text style={styles.orderContent}>17989340533</Text><Text style={styles.result}>待付款</Text></View>
            <View style={styles.schedule}>
              <View style={styles.scheduleName}>
                <Text>下单</Text>
                <Text>付款</Text>
                <Text>发货</Text>
                <Text>完成</Text>
              </View>
              <View style={styles.drawing}>
                <Image style={styles.placeOrder} source={require('../images/myOrder.png')}></Image>
                <Image style={styles.stateOrder} source={state>=1?require('../images/myOrderStatusGreen.png'):require('../images/myOrderStatusGray.png')}></Image>
                <Image style={styles.stateOrder} source={state>=2?require('../images/myOrderStatusGreen.png'):require('../images/myOrderStatusGray.png')}></Image>
                <Image style={styles.stateOrder} source={state>=3?require('../images/myOrderStatusGreen.png'):require('../images/myOrderStatusGray.png')}></Image>
              </View>
            </View>
          </View>
          <View style={styles.addressWrap}>
            <View style={styles.addressInfo}>
              <View style={styles.Left}><Image style={styles.addressImg} source={require('../images/orderAddress.png')}/></View>
              <View style={styles.user}>
                <View style={styles.userNameAndTel}>
                  <Text style={styles.userName}>收货人：张三丰</Text>
                  <Text style={styles.userTel}>1802013458967</Text>
                </View>
                <View style={styles.address}>
                  <Text style={styles.addressText}>江苏省南京市鼓楼区中央门街道389号凤凰国际大厦
                  11楼01
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.addressInfo1}>
              <View style={styles.Left}><Image style={styles.addressImg} source={require('../images/orderAddress.png')}/></View>
              <View style={styles.user}>
                <View style={styles.userNameAndTel}>
                  <Text style={styles.userName}>备注：</Text>
                </View>
                <View style={styles.address}>
                  <Text style={styles.addressText}>发顺丰快递</Text>
                </View>
              </View>
            </View>
          </View>
          <FlatList 
            contentContainerStyle={styles.goods1}
            data={this.state.dataSource}
            renderItem={({ item, index }) =>this._renderRow1(item, index)}
          />
          <View style={styles.goods}>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>商品件数</Text><Text style={styles.totalNum}>共三件</Text></View>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>商品金额</Text><Text style={styles.price}>¥148.00</Text></View>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>配送费</Text><Text style={styles.price}>+ ¥148.00</Text></View>
            <View style={[styles.goodsInfo,styles.goodsInfo1]}><Text style={styles.goodsInfoTitle}>下单时间</Text><Text style={styles.price}>2017-11-27 14:56:21</Text></View>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>vip会员卡优惠</Text><Text style={styles.price}>+ ¥148.00</Text></View>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>微信支付</Text><Text style={styles.price}>2017-11-27 14:56:21</Text></View>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>实付金额</Text><Text style={[styles.price,styles.price1]}>¥138.00</Text></View>
          </View>
          <View style={styles.btns}>
            <TouchableOpacity style={state===0?styles.cacelOrder:styles.hidden}>
              <Text>取消订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={state===0?styles.goPay:styles.hidden}>
              <Text style={styles.goPayText}>去付款</Text>
            </TouchableOpacity>
            <TouchableOpacity style={state>=1?styles.cacelOrder:styles.hidden}>
              <Text >联系客服</Text>
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
  hidden:{
    display:'none'
  },
  orderResult: {
    marginTop: pxToDp(15),
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26),
    backgroundColor: 'white',
  },
  orderNumWrap: {
    flexDirection: 'row',
    position: 'relative',
    height: pxToDp(90),
    alignItems: 'center',
  },
  orderNum:{
    fontSize:pxToDp(28),
    color: '#a7a7a7'
  },
  orderContent: {
    fontSize: pxToDp(28)
  },
  result: {
    position: 'absolute',
    right: 0,
    fontSize: pxToDp(28),
    color: '#ffae00',
  },
  schedule:{
    borderTopWidth: pxToDp(1),
    borderTopColor: '#f1f1f1',
    height: pxToDp(152),
    justifyContent: 'center'
  },
  scheduleName:{
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  drawing: {
    marginTop: pxToDp(18),
    paddingLeft: pxToDp(10),
    paddingRight: pxToDp(10),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  placeOrder:{
    marginRight: pxToDp(10),
    width: pxToDp(39),
    height: pxToDp(39),
  },
  stateOrder: {
    marginRight: pxToDp(12),
    flex:1,
    height: pxToDp(20),
  },
  addressWrap:{
    marginTop: pxToDp(15),
    paddingLeft: pxToDp(26),
    backgroundColor: 'white',
  },
  addressInfo:{
    flexDirection: 'row',
    height: pxToDp(200),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#f1f1f1'
  },
  addressInfo1:{
    flexDirection: 'row',
    height: pxToDp(150),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#f1f1f1'
  },
  Left: {
    width: pxToDp(45),
    height: '100%',
    justifyContent: 'center'
  },
  addressImg:{
    width: pxToDp(26),
    height: pxToDp(30),
  },
  user:{
    alignItems:'center',
    justifyContent: 'center'
  },
  userNameAndTel:{
    position: 'relative',
    width: '100%',
    flexDirection: 'row',
  },
  userName:{
    marginRight: pxToDp(46),
    fontSize: pxToDp(32),
    color: '#1d1d20'
  },
  userTel:{
    position: 'absolute', 
    right: 0,
    fontSize: pxToDp(32),
    color: '#1d1d20'
  },
  address:{
    width: pxToDp(614),
    flexWrap: 'wrap',
  },
  addressText:{
    fontSize: pxToDp(28),
    color: '#a7a7a7'
  },
  goods1:{
    marginTop: pxToDp(15),
    backgroundColor: 'white',
  },
  list: {
    paddingLeft: pxToDp(26),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#f1f1f1',
    height: pxToDp(240)
  },
  unchecked: {
    width: pxToDp(80),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uncheckedImg: {
    width: pxToDp(38),
    height: pxToDp(38)
  },
  good: {
    marginRight: pxToDp(22)
  },
  goodImg: {
    width: pxToDp(168),
    height: pxToDp(168)
  },
  goodDetail: {
    flex: 1,
  },
  goodNameWrap: {
    width: '100%',
    height: pxToDp(60)
  },
  goodName: {
    fontSize: pxToDp(24),
    color: '#2a2a2a'
  },
  goodSpecWrap: {
    fontSize: pxToDp(24),
    color: '#a7a7a7'
  },
  goodSpec: {
    fontSize: pxToDp(24),
    color: '#a7a7a7'
  },
  goodOriginalPriceWrap: {
  },
  goodOriginalPrice: {
    fontSize: pxToDp(24),
    textDecorationLine: 'line-through',
    color: '#d0d0d0'
  },
  goodPresentPriceWrap: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  goodSymble: {
    fontSize: pxToDp(24),
    color: '#ff0036'
  },
  goodPresentPrice: {
    fontSize: pxToDp(28),
    color: '#ff0036'
  },
  company: {
    marginLeft: pxToDp(10),
    fontSize: pxToDp(24),
    color: '#a7a7a7'
  },
  goodsNum: {
    position: 'absolute',
    right: pxToDp(26),
    flexDirection: 'row'
  },
  goodsReduceWrap: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderWidth: pxToDp(1),
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopLeftRadius: 2,
    borderBottomLeftRadius:2,
  },
  numWrap: {
    width: pxToDp(74),
    height: pxToDp(50),
    borderTopWidth: pxToDp(1),
    borderBottomWidth: pxToDp(1),
    borderTopColor: '#ccc',
    borderBottomColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center'
  },
  num: {
    fontSize: pxToDp(28),
    color: '#2a2a2a'
  },
  goodsAddWrap: {
    width: pxToDp(50),
    height: pxToDp(50),
    borderWidth: pxToDp(1),
    borderColor: '#ccc',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 2,
    borderBottomRightRadius:2,
  },
  goods: {
    marginTop: pxToDp(15),
    backgroundColor: 'white'
  },
  goodsInfo: {
    position: 'relative',
    marginLeft: pxToDp(26),
    flexDirection: 'row',
    alignItems: 'center',
    height: pxToDp(90),
  },
  goodsInfo1: {
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#f1f1f1',
  },
  goodsInfoTitle: {
    fontSize: pxToDp(28),
    color: '#a2a2a2',
  },
  totalNum: {
    position: 'absolute',
    right: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#a2a2a2'
  },
  price: {
    position: 'absolute',
    right: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#a2a2a2'
  },
  result: {
    flexDirection: 'row',
    position: 'relative',
    height: pxToDp(100),
    alignItems: 'center',
    backgroundColor: 'white'
  },
  resultTitle: {
    marginLeft: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#a2a2a2'
  },
  resultPrice: {
    fontSize: pxToDp(32),
    color: '#a2a2a2'
  },
  price1: {
    color: '#ff0036'
  },
  btns: {
    marginTop: pxToDp(15),
    height: pxToDp(100),
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  cacelOrder: {
    width: pxToDp(164),
    height: pxToDp(64),
    borderWidth: pxToDp(2),
    borderColor: '#d8d8d8',
    borderRadius: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  goPay: {
    marginLeft: pxToDp(28),
    marginRight: pxToDp(28),
    width: pxToDp(164),
    height: pxToDp(64),
    backgroundColor: '#2abd89',
    borderRadius: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  goPayText: {
    color: 'white'
  }
});
