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
export default class PayFun extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      state:0,
      dataSource:[{
          order:'17325090932',
          state:'待付款',
          goods:[{ isSelect: true, name: '有机青菜', img: '', spec: '500g袋装', originalPrice: '58.90', presentPrice: '49.00', num: 2 }, { isSelect: false, name: '有机花菜', spec: '500g袋装', originalPrice: '12.90', presentPrice: '10.00', num: 1 }]
        }]
    }
  }
  changeState(num){
    this.setState({
        state:num,
      })
  }
  //list渲染
  _renderRow(item, index) {
    //   alert(item.goods)
    return (
      <View>
        <View style={styles.order}><Text style={styles.orderText}>订单号</Text><Text style={styles.orderNum}>{item.order}</Text><Text style={item.state==='待付款'?styles.state:styles.hidden}>{item.state}</Text><Text style={item.state==='交易失败'?styles.state:styles.hidden}>{item.state}</Text><Text style={item.state==='已付款'?styles.state:styles.hidden}>{item.state}</Text></View>
        <FlatList 
        contentContainerStyle={styles.goods1}
        data={item.goods}
        renderItem={({ item, index}) =>this._renderRow1(item, index)}
        />
      </View> 
    );
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
    const {state} = this.state
    return (
      <View style={styles.contenier}>
        <Header1 name="全部订单"></Header1>
        <ScrollView>
        <View style={styles.stateBtns}>
          <TouchableOpacity onPress={()=>{
            this.changeState(0)
          }} style={state===0?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>全部</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            this.changeState(1)
          }} style={state===1?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>待付款</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            this.changeState(2)
          }} style={state===2?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>代发货</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            this.changeState(3)
          }} style={state===3?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>待收货</Text></TouchableOpacity>
          <TouchableOpacity onPress={()=>{
            this.changeState(4)
          }} style={state===4?styles.stateBtnsItem1:styles.stateBtnsItem}><Text>已收货</Text></TouchableOpacity>
        </View>
        {/* <FlatList 
            contentContainerStyle={styles.goods1}
            data={this.state.dataSource}
            renderItem={({ item, index }) =>this._renderRow1(item, index)}
        />    */}
        <FlatList 
            contentContainerStyle={styles.goods1}
            data={this.state.dataSource}
            renderItem={({ item, index }) =>this._renderRow(item, index)}
        />
        {/* <View>
          <View style={styles.order}><Text style={styles.orderText}>订单号</Text><Text style={styles.orderNum}>17325090932</Text><Text style={payState==='待付款'?styles.state:styles.hidden}>待付款</Text><Text style={payState==='交易失败'?styles.state:styles.hidden}>交易失败</Text><Text style={payState==='已付款'?styles.state:styles.hidden}>已付款</Text></View>
          <FlatList 
            contentContainerStyle={styles.goods1}
            data={this.state.dataSource}
            renderItem={({ item, index }) =>this._renderRow1(item, index)}
          />
        </View> */}
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
  }
});
