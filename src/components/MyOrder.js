/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import Fetch from '../js/fetch';
import Header1 from './Header1.js';
import PopupDialog from 'react-native-popup-dialog';
import store from '../store/index';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList
} from 'react-native';
import pxToDp from '../js/pxToDp';
import wxPay from '../js/wxPay';
import alipay from '../js/aliPay';

export default class MyOrder extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.orderId = params.orderId;

    this.state = {
      state: 0,
      payNum: 0,
      integral: store.getState().integral,
      order: {
        details: [],
      },
      warning: '确认要取消订单吗？'
    }

    this.loadData();
  }

  loadData() {
    Fetch(global.url + '/API/order/getOrderDetail?type=0&orderId=' + this.orderId, 'get', '', (responseData) => {
      if (responseData.success) {
        this.setState({
          state: responseData.data.order.orderState,
          order: responseData.data.order
        });
      }
    },
    (err) => {
      Alert.alert('提示',err);
    });
  }

  // 取消订单
  cancelOrder() {
    this.popupClose();

    Fetch(global.url + '/API/order/Cancel', 'post', {
      orderId: this.orderId
    },
    (responseData) => {
      if (responseData.success) {
        this.loadData();
      }
    },
    (err) => {
      Alert.alert('提示',err);
    });
  }

  confirmOrder() {
    this.popupClose();
    Fetch(global.url + '/API/order/ConfirmReceipt', 'post', {
      orderId: this.orderId
    },
    (responseData) => {
      if (responseData.success) {
        this.loadData();
      } else {
        Alert.alert('提示', responseData.message);
      }
    },
    (err) => {
      Alert.alert('提示', err);
    });
  }

  popupShow() {
    this.popupDialog.show();
  }

  popupClose() {
    this.popupDialog.dismiss();
  }

  pay(orderNo) {
    if (this.state.payNum == 0) {
      let params = {
        orderNo: orderNo,
        payType: 'wx'
      }
      wxPay(params, this.props.navigation, '/API/Order/GeneratePayParams', 0);
    } else if(this.state.payNum == 1) {
      let params = {
        orderNo: orderNo,
        payType: 'ali'
      }
      alipay(params, this.props.navigation, '/API/Order/GeneratePayParams', 0);
    } else {
      let params = {
        orderNo: orderNo,
        payType: 'integral'
      }
      Fetch(global.url + '/API/Order/GeneratePayParams', 'post', params, (res) => {
        if (res.success) {
          this.props.navigation.replace('PaySuccess', {
            payAmount: res.data.totalAmount,
            orderType: 0
          })
        } else {
          Alert.alert('提示', '支付失败!');
        }
      }, (err) => {
        Alert.alert('提示', err);
      })
    }
  }

  changePaymentMethod(payNum) {
    this.setState({
      payNum: payNum
    });
  }

  //list渲染
  _renderRow1(item, index) {
    return (
      <View style={styles.list} key={index}>
        <View style={styles.good}>
          <Image style={styles.goodImg} source={{uri: item.goodImg}}></Image>
        </View>
        <View style={styles.goodDetail}>
          <View style={styles.goodNameWrap}><Text style={styles.goodName}>{item.goodName}</Text></View>
          <View style={styles.goodSpecWrap}><Text style={styles.goodSpec}>{item.goodspecifications}</Text></View>
          <View style={styles.goodPresentPriceWrap}>
            <Text style={styles.goodSymble}>￥</Text><Text style={styles.goodPresentPrice}>{item.price}</Text><Text style={styles.company}>/袋</Text>
            <View style={styles.goodsNum}>
              <Text style={styles.num}>X{item.count}</Text>
            </View>
          </View>
        </View>
      </View>  
    );
  }
  render() {
    const { navigate } = this.props.navigation;
    const { state, order } = this.state;
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="我的订单"></Header1>
        <ScrollView>
          <View style={styles.orderResult}>
            <View style={styles.order}>
              <Text style={styles.orderText}>订单号:</Text>
              <Text style={styles.orderNum}>{order.orderNum}</Text>
              <Text style={styles.state}>{order.state}</Text>
            </View>
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
                  <Text style={styles.userName}>收货人：{order.receiver}</Text>
                  <Text style={styles.userTel}>{order.receiverMobile}</Text>
                </View>
                <View style={styles.address}>
                  <Text style={styles.addressText}>{order.receiverAddress}</Text>
                </View>
              </View>
            </View>
            <View style={styles.addressInfo1}>
              <View style={styles.Left}><Image style={styles.addressImg} source={require('../images/Remarks.png')}/></View>
              <View style={styles.user}>
                <View style={styles.userNameAndTel}>
                  <Text style={styles.userName}>备注：</Text>
                </View>
                <View style={styles.address}>
                  <Text style={styles.addressText}>{order.remark ? order.remark : '无'}</Text>
                </View>
              </View>
            </View>
          </View>
          <FlatList 
            contentContainerStyle={styles.goods1}
            data={this.state.order.details}
            renderItem={({ item, index }) =>this._renderRow1(item, index)}
          />
          <View style={styles.goods}>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>商品件数</Text><Text style={styles.totalNum}>共{order.productCount}件</Text></View>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>商品金额</Text><Text style={styles.price}>¥{order.orderAmount}</Text></View>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>配送费</Text><Text style={styles.price}>+ ¥{order.expressMoney}</Text></View>
            <View style={styles.goodsInfo1}><Text style={styles.goodsInfoTitle}>下单时间</Text><Text style={styles.price}>{order.orderDate}</Text></View>
            <View style={styles.hidden}><Text style={styles.goodsInfoTitle}>vip积分</Text><Text style={styles.price}>- ¥{order.integralPayAmount}</Text></View>
            <View style={styles.hidden}><Text style={styles.goodsInfoTitle}>在线支付</Text><Text style={styles.price}>{order.cashPayAmount}</Text></View>
            <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle2}>实付金额</Text><Text style={[styles.price,styles.price1]}>¥{order.cashPayAmount}</Text></View>
          </View>
          <View style={state === 0 ? styles.paymentMethod : styles.hidden}>
            <TouchableOpacity style={styles.payment} onPress={()=>this.changePaymentMethod(0)}>
              <Image style={styles.payment1Img} source={require('../images/wechat.png')}></Image>
              <Text>微信支付</Text>
              <Image style={styles.isSelect} source={this.state.payNum === 0 ? require('../images/select.png') : require('../images/unchecked.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.payment} onPress={()=>this.changePaymentMethod(1)}>
              <Image style={styles.payment2Img} source={require('../images/alipay.png')}></Image>
              <Text>支付宝</Text>
              <Image style={styles.isSelect} source={this.state.payNum === 1 ? require('../images/select.png') : require('../images/unchecked.png')}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.integral >= order.cashPayAmount ? styles.payment : styles.hidden} onPress={()=>this.changePaymentMethod(2)}>
              <Image style={styles.payment2Img} source={require('../images/integral.png')}></Image>
              <Text>积分支付</Text>
              <Image style={styles.isSelect} source={this.state.payNum === 2 ? require('../images/select.png') : require('../images/unchecked.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={styles.btns}>
            <TouchableOpacity style={state < 1 ? styles.cacelOrder : styles.hidden} onPress={()=>this.popupShow()}>
              <Text allowFontScaling={false}>取消订单</Text>
            </TouchableOpacity>
            <TouchableOpacity style={state===0?styles.goPay:styles.hidden} onPress={() => this.pay(order.orderNum)}>
              <Text allowFontScaling={false} style={styles.goPayText}>去付款</Text>
            </TouchableOpacity>
            <TouchableOpacity style={state===2?styles.goPay:styles.hidden} onPress={() => this.confirmOrder()}>
              <Text allowFontScaling={false} style={styles.goPayText}>确认收货</Text>
            </TouchableOpacity>
            <TouchableOpacity style={state >= 1 ? styles.cacelOrder : styles.hidden} onPress={()=>navigate('ServiceCenter')}>
              <Text allowFontScaling={false}>联系客服</Text>
            </TouchableOpacity>      
          </View>
        </ScrollView>
        <PopupDialog
          width={pxToDp(600)} 
          height={pxToDp(400)} 
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
          <View style={styles.bullet}>
            <View style={styles.bulletTitle}><Text style={styles.bulletTitleText}>提示</Text></View>  
            <View style={styles.bulletContent}>
              <Text style={styles.bulletContentText}>{this.state.warning}</Text>
            </View>
            <View style={styles.buttonContent}>
              <TouchableOpacity style={styles.button} onPress={this.popupClose.bind(this)}>
                <Text style={styles.buttonCancle}>返回</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonCut]} onPress={this.cancelOrder.bind(this)}>
                <Text style={styles.buttonConfirm}>取消订单</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PopupDialog>
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
  order: {
    position: 'relative',
    height: pxToDp(79),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee',
    backgroundColor: 'white',
  },
  orderText: {
    color: '#a2a2a2'
  },
  orderNum: {
    marginLeft: pxToDp(12),
    color: '#2b2b2b'
  },
  state: {
    position: 'absolute',
    right: 0,
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
    paddingRight: pxToDp(26),
    backgroundColor: 'white',
  },
  addressInfo:{
    flexDirection: 'row',
    height: pxToDp(150),
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
    flex: 1,
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
    fontSize: pxToDp(28),
    color: '#1d1d20'
  },
  userTel:{
    position: 'absolute', 
    right: 0,
    fontSize: pxToDp(28),
    color: '#1d1d20'
  },
  address:{
    marginTop: pxToDp(20),
    width: '100%',
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
    borderBottomColor: '#eeeeee',
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
    fontSize: pxToDp(28),
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
    justifyContent: 'space-between',
    height: pxToDp(70),
  },
  goodsInfo1: {
    position: 'relative',
    marginLeft: pxToDp(26),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: pxToDp(70),
    paddingBottom: pxToDp(20),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee',
  },
  goodsInfoTitle: {
    fontSize: pxToDp(28),
    color: '#a2a2a2',
  },
  goodsInfoTitle2: {
    fontSize: pxToDp(28),
    color: '#000000',
  },
  totalNum: {
    position: 'absolute',
    right: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#a2a2a2'
  },
  price: {
    paddingRight: pxToDp(26),
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
    marginRight: pxToDp(28),
    borderWidth: pxToDp(2),
    borderColor: '#d8d8d8',
    borderRadius: pxToDp(30),
    justifyContent: 'center',
    alignItems: 'center'
  },
  goPay: {
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
  },
  bullet: {
    alignItems: 'center',
    padding: 0
  },
  bulletTitle: {
    marginTop: pxToDp(55),
    marginBottom: pxToDp(25),
    width: pxToDp(480),
    height: pxToDp(50),
  },
  bulletTitleText: {
    fontSize: pxToDp(40),
    color: "#333335",
  },
  bulletContent: {
    width: pxToDp(480),
    height: pxToDp(150),
  },
  bulletContentText: {
    fontSize: pxToDp(33),
    color: '#99979a'
  },
  buttonContent: {
    height: pxToDp(100),
    width: '100%',
    flexDirection: 'row',
    borderTopWidth: pxToDp(1),
    borderTopColor: '#d9ddde',
  },
  button: {
    width: '50%',
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonCut: {
    borderLeftWidth: pxToDp(1),
    borderLeftColor: '#d9ddde',
  },
  buttonConfirm: {
    color: "#2abd89",
    fontSize: pxToDp(33),
  },
  buttonCancle: {
    color: "#000000",
    fontSize: pxToDp(33),
  },
  paymentMethod: {
    marginTop: pxToDp(15),
    backgroundColor: 'white'
  },
  payment: {
    position: 'relative',
    marginLeft: pxToDp(26),
    marginRight: pxToDp(26),
    height: pxToDp(87),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee'
  },
  payment1Img: {
    marginRight: pxToDp(20),
    width: pxToDp(52),
    height: pxToDp(45)
  },
  payment2Img: {
    marginRight: pxToDp(20),
    width: pxToDp(50),
    height: pxToDp(50)
  },
  isSelect: {
    position: 'absolute',
    right: 0,
    width: pxToDp(40),
    height: pxToDp(40)
  },
});
