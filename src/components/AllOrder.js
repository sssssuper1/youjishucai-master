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
import Header1 from './Header1.js'
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

export default class AllOrder extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    let now = 0;

    if (!!params&&!!params.state) {
      now = params.state;
    }

    this.states = ['全部','待付款','待发货','待收货','已收货'];
    this.data = [];

    this.state = {
      state: now,
      dataSource: []
    };

    this.loadData();
  }

  loadData() {
    let params = {
      pageIndex: 0,
      state: ''
    }
    Fetch(global.url + '/API/order/getMyOrderList', 'post', params,
      (responseData) => {
        if (responseData.success) {
          this.data = responseData.data.orderList;
          this.changeListData(this.state.state);
        }
      },
      (err) => {
        alert(err);
      }
    );
  }

  changeState(num){
    this.setState({
      state:num,
    });

    this.changeListData(num);
  }
  changeListData(num){
    if (num === 0) {
      this.setState({
        dataSource: this.data
      })
    } else if (num === 3){
      let data = [];
      this.data.forEach((item) => {
        if (item.state == '配送中' || item.state == '配货中') {
          data.push(item);
        }
      });
      this.setState({
        dataSource: data
      })
    } else {
      let data = [];
      this.data.forEach((item) => {
        if (item.state == this.states[num]) {
          data.push(item);
        }
      });
      this.setState({
        dataSource: data
      })
    }
  }

  _renderRow(item, index) {
    const { navigate } = this.props.navigation;
    if (this.state.state === 0 || this.states[this.state.state] == item.state) {
      return (
        <View style={styles.goods1}>
          <View style={styles.order}>
            <Text style={styles.orderText}>订单号</Text>
            <Text style={styles.orderNum}>{item.orderNum}</Text>
            <Text style={styles.state}>{item.state}</Text>
          </View>
          <FlatList 
          contentContainerStyle={styles.goods1}
          data={item.details}
          renderItem={({ item, index}) =>this._renderRow1(item, index)}
          />
          <View style={styles.orderSum}>
            <Text>共{item.productCount}件商品，</Text>
            <Text>总金额：</Text>
            <Text>￥{item.payAmount}</Text>
          </View>
          <View style={styles.orderSum}>
            <TouchableOpacity style={item.orderState>0?styles.orderButtonGrey:styles.hidden} onPress={() => {navigate('MyOrder', {orderId: item.id})}}>
              <Text style={styles.buttonTextGrey}>查看订单</Text>  
            </TouchableOpacity>
            <TouchableOpacity style={item.orderState===0?styles.orderButtonGrey:styles.hidden} onPress={() => {navigate('MyOrder', {orderId: item.id})}}>
              <Text style={styles.buttonTextGrey}>取消订单</Text>  
            </TouchableOpacity>
            <TouchableOpacity style={item.orderState===0?styles.orderButtonGreen:styles.hidden} onPress={() => {navigate('MyOrder', {orderId: item.id})}}>
              <Text style={styles.buttonTextWhite}>继续支付</Text>  
            </TouchableOpacity>
            <TouchableOpacity style={item.orderState===3?styles.orderButtonGreen:styles.hidden} onPress={() => {navigate('MyOrder', {orderId: item.id})}}>
              <Text style={styles.buttonTextWhite}>确认收货</Text>
            </TouchableOpacity>
          </View>
        </View> 
      );
    }
  }
  //list渲染
  _renderRow1(item, index) {
    return (
      <View style={styles.list}>
      <View style={styles.good}>
        <Image style={styles.goodImg} source={{uri: item.goodImg}}></Image>
      </View>
      <View style={styles.goodDetail}>
        <View style={styles.goodNameWrap}><Text style={styles.goodName}>{item.goodName}</Text></View>
        <View style={styles.goodSpecWrap}><Text style={styles.goodSpec}>{item.goodspecifications}</Text></View>
        <View style={styles.goodOriginalPriceWrap}><Text style={styles.goodOriginalPrice}>￥{item.price*1.2}</Text></View>
        <View style={styles.goodPresentPriceWrap}>
          <Text style={styles.goodSymble}>￥</Text><Text style={styles.goodPresentPrice}>{item.price}</Text>
          <View style={styles.goodsNum}>
            <Text style={styles.num}>X{item.count}</Text>
          </View>
        </View>
      </View>
    </View>    
    );
  }
  render() {
    const { state } = this.state;
    const { navigate } = this.props.navigation;

    let view;
    if (this.state.dataSource.length > 0) {
      view =
      <FlatList 
        data={this.state.dataSource}
        renderItem={({ item, index }) =>this._renderRow(item, index)}
      />
    } else {
      view =
        <View style={styles.stateBlank}>
          <View style={styles.stateImgWrap}>
            <Image style={styles.stateImg} source={require('../images/noOrder.png')}></Image>
          </View>
          <View style={styles.stateShow}><Text style={styles.stateShowText}>您还没有相关订单</Text></View>
          <TouchableOpacity style={styles.stateButton} onPress={() => navigate('Home')}>
            <Text>立即选购</Text>
          </TouchableOpacity>
        </View>;
    }
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="全部订单"></Header1>
        <ScrollView>
          <View style={styles.stateBtns}>
            <TouchableOpacity onPress={()=>{
              this.changeState(0)
            }} style={state===0?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>{this.states[0]}</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              this.changeState(1)
            }} style={state===1?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>{this.states[1]}</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              this.changeState(2)
            }} style={state===2?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>{this.states[2]}</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              this.changeState(3)
            }} style={state===3?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>{this.states[3]}</Text></TouchableOpacity>
            <TouchableOpacity onPress={()=>{
              this.changeState(4)
            }} style={state===4?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>{this.states[4]}</Text></TouchableOpacity>
          </View>
          {view}
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
  hidden: {
    display: 'none'
  },
  stateBtns: {
    flexDirection: 'row',
    height: pxToDp(88),
    backgroundColor:'white', 
    borderTopWidth: pxToDp(1),
    borderTopColor: '#d9ddde'
  },
  stateBtnsItem: {
    marginLeft: pxToDp(25),
    marginRight: pxToDp(25),
    flex: 1,
    height: pxToDp(86),
    alignItems: 'center',
    justifyContent: 'center'
  },
  stateBtnsItem1: {
    marginLeft: pxToDp(25),
    marginRight: pxToDp(25),
    flex: 1,
    height: pxToDp(86),
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#2abd89'
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
  order: {
    position: 'relative',
    height: pxToDp(79),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#f1f1f1',
    backgroundColor: 'white',
  },
  orderText: {
    marginLeft: pxToDp(26),
    fontSize: pxToDp(24),
    color: '#a2a2a2'
  },
  orderNum: {
    marginLeft: pxToDp(12),
    fontSize: pxToDp(24),
    color: '#2b2b2b'
  },
  state: {
    position: 'absolute',
    fontSize: pxToDp(24),
    right: pxToDp(26),
    color: '#ffae00',
  },
  state1: {
    position: 'absolute',
    fontSize: pxToDp(24),
    right: pxToDp(26),
    color: '#ff0036',
  },
  state2: {
    position: 'absolute',
    fontSize: pxToDp(24),
    right: pxToDp(26),
    color: '#a2a2a2',
  },
  orderSum: {
    position: 'relative',
    height: pxToDp(103),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderTopWidth: pxToDp(1),
    borderTopColor: '#f1f1f1',
    backgroundColor: 'white',
    paddingRight: pxToDp(26)
  },
  orderButtonGreen: {
    marginLeft: pxToDp(26),
    width: pxToDp(164),
    height: pxToDp(64),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDp(30),
    backgroundColor: '#2abd89',
  },
  orderButtonGrey: {
    marginLeft: pxToDp(26),
    width: pxToDp(164),
    height: pxToDp(64),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDp(30),
    borderColor: '#808080',
    borderWidth: pxToDp(2)
  },
  buttonTextWhite: {
    color: '#ffffff'
  },
  buttonTextGrey: {
    color: '#808080'
  },
  stateBlank: {
    width: '100%',
    height: pxToDp(537),
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
  stateButton: {
    marginTop: pxToDp(40),
    width: pxToDp(200),
    paddingTop: pxToDp(8),
    paddingBottom: pxToDp(8),
    borderWidth: pxToDp(1),
    borderColor: '#a9a9a9',
    borderRadius: pxToDp(10),
    alignItems: 'center'
  },
});
