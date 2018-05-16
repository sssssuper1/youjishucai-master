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
  Modal,
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
const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'white' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}
type Props = {};
export default class GoodsDetail extends Component<Props> {
  constructor(props) {
    super(props);
    this.state={
      modelVistibal:true
    }
  }
  
  render() {
    return (
      <View style={styles.contenier}>
        <Header1 name="商品详情"></Header1>
        <View style={styles.wrapperWrap}>
        <Swiper style={styles.wrapper}  renderPagination={renderPagination}  autoplay={true} >
          <View style={styles.slide}>
            <Image style={styles.banner} source={require("../images/goods.jpg")}></Image>
          </View>
          <View style={styles.slide}>
            <Image style={styles.banner} source={require("../images/goods.jpg")}></Image>
          </View>
          <View style={styles.slide}>
            <Image style={styles.banner} source={require("../images/goods.jpg")}></Image>
          </View>
        </Swiper>
        </View>
        <View style={styles.goodsName}>
          <Text style={styles.goodsNameText}>奥莱曼椰子汁蛋卷榴莲味猪肉有机朱可爱猪肉朱
100g</Text>
        </View>
        <View style={styles.goodsPrice}>
          <Text style={styles.nowPrice}>￥99.00</Text><Text style={styles.spec}>/盒</Text><Text style={styles.originalPrice}>￥159.00</Text>
        </View>
        <View style={styles.goodsDetail}>
          <TouchableOpacity style={styles.goodsInfo}>
            <Text style={styles.title}>选择规格、数量</Text><Image style={styles.dir} source={require("../images/rightDir.png")}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.goodsInfo}>
            <Text style={styles.title}>产品参数</Text><Image style={styles.dir} source={require("../images/rightDir.png")}></Image>
          </TouchableOpacity>    
        </View>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.goGoods}>
            <View><Image style={styles.goGoodsImg} source={require('../images/menu1-1.png')}></Image></View>
            <View><Text style={styles.goGoodsText}>有机食材</Text></View>  
          </TouchableOpacity>
          <TouchableOpacity style={styles.customerService}> 
            <View><Image style={styles.customerServiceImg} source={require('../images/customerService2.png')}></Image></View>
            <View><Text style={styles.customerServiceText}>客服</Text></View>    
          </TouchableOpacity>
          <TouchableOpacity style={styles.cart}>
            <View><Image style={styles.cartImg} source={require('../images/searchCart.png')}></Image></View>
            <View><Text tyle={styles.cartText}>购物车</Text></View>
            <View style={styles.num}><Text style={styles.numText}>10</Text></View>    
          </TouchableOpacity>
          <TouchableOpacity style={styles.addGoods}>
            <Text style={styles.addGoodsText}>加入购物车</Text>
          </TouchableOpacity>  
        </View>
        <Modal
          animationType={"none"}
          transparent={true}
          visible={this.state.modelVistibal}
          onRequestClose={() => {alert("Modal has been closed.")}}
          >
          <View style={{backgroundColor:"rgba(0,0,0,0.3)",height:"100%"}}>
            <View style={styles.modalWrap}>
              <View style={styles.modalGoods}>
                <Image style={styles.modalGoodsImg} source={require('../images/goods.jpg')}></Image>
              </View>
              <View style={styles.modal}>
                <View style={styles.modalGoodsPriceNum}><Text style={styles.modalNowPrice}>￥99.00</Text><Text style={styles.modalSymble}>/盒</Text></View>
                <View style={styles.modalGoodsPriceNum}><Text style={styles.modalOricalPrice}>￥159.09</Text></View>
                <View style={styles.modalGoodsPriceNum}><Text style={styles.modalNum}>库存：500</Text></View>
                <View style={styles.modalGoodsSpecWrap}>
                  <View style={styles.modalGoodsSpec}><Text>规格</Text><View style={styles.modalGoodsSpecContent}><Text style={styles.modalGoodsSpecContentText}>100g*1</Text></View></View>
                  <View style={styles.modalGoodsNum}><Text>购买数量</Text><View style={styles.goodsNum}>
              <TouchableOpacity style={styles.goodsReduceWrap} onPress={() => { 
                this.reduceGoodsNum(index)
              }}><Text style={styles.goodsReduce}>-</Text></TouchableOpacity>
              <TouchableOpacity style={styles.numWrap}><Text style={styles.num}>1111</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => { 
                this.addGoodsNum(index)
              }} style={styles.goodsAddWrap}><Text style={styles.goodsAdd}>+</Text></TouchableOpacity>
            </View></View>
                </View>
                <TouchableOpacity style={styles.save}>
                  <Text style={styles.saveText}>加入购物车</Text>
                </TouchableOpacity>
              </View> 
            </View> 
          </View>
        </Modal>      
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
  },
  wrapperWrap: {
    position: 'relative',
    paddingTop: pxToDp(28),
    paddingBottom: pxToDp(28),
    backgroundColor: 'white',
    height: pxToDp(600),
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationStyle:{
    position: 'absolute',
    right: pxToDp(0),
    bottom: pxToDp(0),
    width: pxToDp(64),
    height: pxToDp(64),
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#8c8c8c'
  },
  banner: {
    width: '100%',
    height: '100%'
  },
  goodsName:{
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26),
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'  
  },
  goodsNameText: {
    fontSize: pxToDp(32),
    color: '#2b2b2b',
  },
  goodsPrice:{
    height: pxToDp(100),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white'
  },
  nowPrice:{
    paddingLeft: pxToDp(26),
    fontSize:pxToDp(32),
    color:'#ff0036'
  },
  spec: {
    marginLeft: pxToDp(10),
    marginRight: pxToDp(10),
    fontSize: pxToDp(32),
    color: '#a7a7a7'
  },
  originalPrice:{
    textDecorationLine: 'line-through',
  },
  goodsDetail:{
    marginTop: pxToDp(14),
    backgroundColor: 'white'
  },
  goodsInfo:{
    position: 'relative',
    height: pxToDp(89),
    flexDirection: 'row',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#f1f1f1',
    alignItems: 'center'
  },
  title:{
    marginLeft: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  dir:{
    position: 'absolute',
    right: pxToDp(26),
    width: pxToDp(12),
    height: pxToDp(22) 
  },
  btns:{
    flexDirection: 'row',
    position: 'absolute',
    width: '100%',
    height: pxToDp(100),
    bottom:0,
    backgroundColor: 'white'
  },
  goGoods:{
    paddingLeft: pxToDp(35),
    paddingRight: pxToDp(35),
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  goGoodsImg:{
    width: pxToDp(44),
    height: pxToDp(44)
  },
  customerService:{
    paddingLeft: pxToDp(35),
    paddingRight: pxToDp(35),
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  goGoodsText:{
    fontSize: pxToDp(20),
    color: '#818181'
  },
  customerServiceImg:{
    width: pxToDp(39),
    height: pxToDp(37)
  },
  customerServiceText:{
    fontSize: pxToDp(20),
    color: '#818181'
  },
  cart:{
    position: 'relative',
    paddingLeft: pxToDp(35),
    paddingRight: pxToDp(35),
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartImg:{
    width: pxToDp(50),
    height: pxToDp(43)
  },
  cartText:{
    fontSize: pxToDp(20),
    color: '#818181'
  },
  num:{
    position: 'absolute',
    right: pxToDp(35),
    top: pxToDp(10),
    width: pxToDp(41),
    height: pxToDp(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToDp(30),
    backgroundColor: '#fd4448'
  },
  numText:{
    fontSize: pxToDp(20),
    color: 'white',
  },
  addGoods:{
    backgroundColor: '#2abd89',
    flex: 1,
    height: pxToDp(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  addGoodsText:{
    fontSize: pxToDp(32),
    color:'white'
  },
  modalWrap:{
    position: 'absolute',
    bottom: 0,
    paddingTop: pxToDp(35),
    width: '100%',
    height: pxToDp(630),
  },
  modal:{
    paddingTop: pxToDp(20),
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
  },
  modalGoods:{
    position: 'absolute',
    left: pxToDp(34),
    top: pxToDp(0),
    zIndex:100,
    width: pxToDp(244),
    height: pxToDp(244),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalGoodsImg:{
    width: pxToDp(230),
    height: pxToDp(200)
  },
  modalGoodsPriceNum:{
    marginLeft: pxToDp(310),
    flexDirection: 'row',
    alignItems: 'center'
  },
  modalNowPrice:{
    fontSize: pxToDp(42),
    color: '#ff0036'
  },
  modalSymble:{
    marginLeft: pxToDp(10),
    fontSize: pxToDp(28),
    color: '#a7a7a7'
  },
  modalOricalPrice:{
    textDecorationLine: 'line-through',
    fontSize: pxToDp(28),
    color: '#a7a7a7'
  },
  modalNum:{
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  modalGoodsSpec:{
    flexDirection: 'row',
    marginLeft: pxToDp(34),
    height: pxToDp(117),
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#f1f1f1'
  },
  modalGoodsSpecWrap:{
    marginTop: pxToDp(66),
    backgroundColor: 'white'
  },
  modalGoodsSpecContent:{
    marginLeft: pxToDp(35),
    width: pxToDp(158),
    height: pxToDp(64),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2abd89',
    borderRadius: pxToDp(30)
  },
  modalGoodsSpecContentText:{
    fontSize: pxToDp(28),
    color: 'white'
  },
  modalGoodsNum:{
    flexDirection: 'row',
    marginLeft: pxToDp(34),
    height: pxToDp(117),
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#f1f1f1'
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
  save:{
    position: "absolute",
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(100),
    backgroundColor: '#2abd89'
  },
  saveText:{
    fontSize: pxToDp(32),
    color: 'white'
  }
});
