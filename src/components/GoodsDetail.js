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
import Toast, { DURATION } from 'react-native-easy-toast';
import CookieManager from 'react-native-cookies';
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
  Picker,
  WebView
} from 'react-native';
import pxToDp from '../js/pxToDp';

const renderPagination = (index, total, context) => {
  return (
    <View style={styles.paginationStyle}>
      <Text style={{ color: 'white' }}>
        <Text style={styles.paginationText}>{index + 1}</Text>/{total}
      </Text>
    </View>
  )
}

export default class GoodsDetail extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.index = 0;
    this.desc = '';

    this.state={
      selectionModelVisible: false,
      detailModelVisible: false,
      productDetailDt: {
        goodImg: [],
      },
      specDt: [{}],
      specIndex: 0,
      count: 1,
      noStock: true,
      WebViewHeight: 0,
      desc: '',
      isLogin: false
    }

    CookieManager.get(global.url).then(cookie => {
      if (!!cookie.userId) {
        this.setState({
          isLogin: true
        })
      }
    })

    if (!!params && !!params.id) {
      this.loadData(params.id);
    }
  }

  loadData(id) {
    Fetch(global.url + '/API/ProductDetail/getCommodityDetail', 'post', {
      id: id
    }, (responseData) => {
      if (responseData.success) {
        let count = 0;
        let specIndex = 0;
        this.desc = responseData.data.productDetailDt.goodDetail;
        let html = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
            <style>
              img {width: 100% !important; height: 100% !important}
            </style>
        </head>
        <body style="padding: 0; margin: 0">
        <script>
          var height = 0;
          window.location.hash = '#' + document.body.clientHeight;
          function changeHeight() {
            if (document.body.scrollHeight != height) {
              height = document.body.scrollHeight;
              window.postMessage(height);
            }
          }
          var flag =  setInterval(changeHeight, 500);
        </script>
        <div>
        ${this.desc}
        </div>
        </body>
        </html>
        `;
        for (let i = 0; i < responseData.data.specDt.length; i++) {
          if (count === 0 && responseData.data.specDt[i].stock > 0) {
            specIndex = i;
          }
          count += responseData.data.specDt[i].stock;
        }
        this.setState({
          productDetailDt: responseData.data.productDetailDt,
          specDt: responseData.data.specDt,
          noStock: count > 0 ? false : true,
          specIndex: specIndex,
          desc: html
        });
      }
    },
    (err) => {
      Alert.alert('提示',err);
    });
  }

  changeSpec(index) {
    this.setState({
      specIndex: index,
    });
  }

  addToCart() {
    if (this.state.isLogin) {
      Fetch(global.url + '/API/ProductDetail/joinCart', 'post', {
        count: this.state.count,
        goodspecifications: this.state.specDt[this.state.specIndex].id
      }, (responseData) => {
        if (responseData.success) {
          this.refs.toast.show('加入成功!');
          store.dispatch({ type: types.addShopingNum.ADDNUM, num: this.state.count })
          this.closeselectionModel();
        } else {
          this.refs.toast.show(responseData.message);
        }
      },
      (err) => {
        Alert.alert('提示',err);
      });
    } else {
      this.props.navigation.navigate('SignIn');
    }
  }

  reduceGoodsNum() {
    if (this.state.count === 1) {
      return;
    }
    this.setState({
      count: this.state.count - 1
    });
  }

  addGoodsNum() {
    this.setState({
      count: this.state.count + 1
    });
  }

  showselectionModel() {
    this.setState({
      selectionModelVisible: true
    });
  }

  closeselectionModel() {
    this.setState({
      selectionModelVisible: false
    });
  }

  showDetailModel() {
    this.setState({
      detailModelVisible: true
    });
  }

  closeDetailModel() {
    this.setState({
      detailModelVisible: false
    });
  }

  webViewLoaded = () => {
    console.log('load over, inject js clearInterval');
    this.refs.webview.injectJavaScript(`
      (function() {
        height = document.body.scrollHeight;
        window.postMessage(height);
        clearInterval(flag)
      }())
    `);
  }

  handleMessage(e) {
    console.log(e.nativeEvent.data);
    if (this.desc != '') {
      this.setState({
        WebViewHeight: e.nativeEvent.data
      });
    }
  }

  _renderSwiper(list) {
    return list.map((item, index) => this._renderSwiperImg(item, index));
  }

  _renderSwiperImg(item, index) {
    return (
      <View style={styles.slide} key={index}>
        <Image style={styles.banner} source={{uri: item}}></Image>
      </View>
    );
  }

  _renderDetailList(list) {
    return list.map(item => this._renderDetailImg(item));
  }

  _renderDetailImg(item) {
    return (
      <NetImage source={item}/>
    )
  }

  _renderSpecifications(list) {
    return list.map((item, index) => {
      return (
        <TouchableOpacity key={index} style={this.state.specIndex === index ? styles.modalGoodsSpecContent : styles.modalGoodsSpecContent1}
          onPress={() => this.changeSpec(index)}>
          <Text style={this.state.specIndex === index?styles.modalGoodsSpecContentText:styles.modalGoodsSpecContentText1}>{item.spec}</Text>
        </TouchableOpacity>
      );
    })
  }
  
  render() {
    const { navigate } = this.props.navigation;
    const { specIndex, productDetailDt, specDt } = this.state;

    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="商品详情" share={this.state.isLogin} shareData={{
          name: productDetailDt.goodName,
          goodImg: productDetailDt.goodImg[0],
          price: specDt[specIndex].price,
          spec: specDt[specIndex].spec,
          preSellPrice: specDt[specIndex].preSellPrice
        }}></Header1>
        <ScrollView>
          <View style={styles.wrapperWrap}>
            <Swiper key={this.state.productDetailDt.goodImg.length} style={styles.wrapper}  renderPagination={renderPagination} autoplay={true} >
              {this._renderSwiper(this.state.productDetailDt.goodImg)}
            </Swiper>
          </View>
          <View style={styles.goodsName}>
            <Text style={styles.goodsNameText}>{productDetailDt.goodName}</Text>
          </View>
          <View style={styles.goodsPrice}>
            <Text style={styles.nowPrice}>￥{specDt[specIndex].price}</Text>
            <Text style={styles.spec}>/{specDt[specIndex].spec}</Text>
            <Text style={styles.originalPrice}>￥{specDt[specIndex].preSellPrice}</Text>
          </View>
          <View style={styles.goodsDetail}>
            <TouchableOpacity style={styles.goodsInfo} onPress={this.showselectionModel.bind(this)}>
              <Text style={styles.title}>选择规格、数量</Text><Image style={styles.dir} source={require("../images/rightDir.png")}></Image>
            </TouchableOpacity>
            <TouchableOpacity style={styles.goodsInfo} onPress={this.showDetailModel.bind(this)}>
              <Text style={styles.title}>产品参数</Text><Image style={styles.dir} source={require("../images/rightDir.png")}></Image>
            </TouchableOpacity>
          </View>
          <WebView
            ref={'webview'}
            source={{html: this.state.desc, baseUrl: ''}}
            style={{height: Number(this.state.WebViewHeight), marginTop: pxToDp(15), marginBottom: pxToDp(100), backgroundColor: 'white',}}
            onLoadEnd={this.webViewLoaded}
            onMessage={(e)=>this.handleMessage(e)}
            javaScriptEnabled={true}
            automaticallyAdjustContentInsets={true}
            scalesPageToFit={true}>
          </WebView>
        </ScrollView>
        <View style={styles.btns}>
          <TouchableOpacity style={styles.goGoods} onPress={()=>{navigate('Home', {selectedTab: 'home'})}}>
            <View style={styles.goodsImgContainer}><Image style={styles.goGoodsImg} source={require('../images/menu1-2.png')}></Image></View>
            <View><Text style={styles.goGoodsText}>有机食材</Text></View>  
          </TouchableOpacity>
          <TouchableOpacity style={styles.customerService} onPress={()=>{navigate('ServiceCenter')}}> 
            <View style={styles.goodsImgContainer}><Image style={styles.customerServiceImg} source={require('../images/customerService2.png')}></Image></View>
            <View><Text style={styles.customerServiceText}>客服</Text></View>    
          </TouchableOpacity>
          <TouchableOpacity style={styles.cart} onPress={()=>{navigate('Cart')}}> 
            <View style={styles.goodsImgContainer}><Image style={styles.cartImg} source={require('../images/searchCart.png')}></Image></View>
            <View style={[styles.cartNumWrap, store.getState().count > 9 ? styles.cartNumWrapLong : styles.cartNumWrapShort]}>
              <Text style={styles.cartNum}>{store.getState().count}</Text>
            </View>
            <View><Text style={styles.cartText}>购物车</Text></View>
          </TouchableOpacity>
          <TouchableOpacity disabled={this.state.noStock} style={this.state.noStock?styles.noGoods:styles.addGoods} onPress={this.addToCart.bind(this)}>
            <Text style={styles.addGoodsText}>{this.state.noStock ? '已售空' : '加入购物车'}</Text>
          </TouchableOpacity>
        </View>
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.selectionModelVisible}
          >
          <View style={{backgroundColor:"rgba(0,0,0,0.3)",height:"100%"}}>
            <View style={styles.modalWrap}>
              <View style={styles.modalGoods}>
                <Image style={styles.modalGoodsImg} source={{uri: productDetailDt.cover}}></Image>
              </View>
              <View style={styles.modal}>
                <View style={styles.modalGoodsPriceNum}><Text style={styles.modalNowPrice}>￥{specDt[specIndex].price}</Text><Text style={styles.modalSymble}>/{specDt[specIndex].spec}</Text></View>
                <View style={styles.modalGoodsPriceNum}><Text style={styles.modalOricalPrice}>￥{specDt[specIndex].preSellPrice}</Text></View>
                <View style={styles.modalGoodsPriceNum}><Text style={styles.modalNum}>库存：{specDt[specIndex].stock}</Text></View>
                <View style={styles.modalGoodsSpecWrap}>
                  <View style={styles.modalGoodsSpec}>
                    <Text>规格</Text>
                    {this._renderSpecifications(specDt)}
                  </View>
                  <View style={styles.modalGoodsNum}>
                    <Text>购买数量</Text>
                    <View style={styles.goodsNum}>
                      <TouchableOpacity style={styles.goodsReduceWrap} onPress={this.reduceGoodsNum.bind(this)}>
                        <Text style={styles.goodsReduce}>-</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.numWrap}><Text style={styles.num}>{this.state.count}</Text></TouchableOpacity>
                      <TouchableOpacity style={styles.goodsAddWrap} onPress={this.addGoodsNum.bind(this)}>
                        <Text style={styles.goodsAdd}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={styles.closeModel} onPress={this.closeselectionModel.bind(this)}>
                  <Image style={styles.closeImg} source={require('../images/close.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity disabled={!(specDt[specIndex].stock > 0)} style={specDt[specIndex].stock > 0?styles.save:styles.cannotSave} onPress={this.addToCart.bind(this)}>
                  <Text style={styles.saveText}>{specDt[specIndex].stock > 0 ? '加入购物车' : '已售空'}</Text>
                </TouchableOpacity>
              </View> 
            </View> 
          </View>
        </Modal>      
        <Modal
          animationType={"slide"}
          transparent={true}
          visible={this.state.detailModelVisible}
          >
          <View style={{backgroundColor:"rgba(0,0,0,0.3)",height:"100%"}}>
            <View style={styles.modalWrap}>
              <View style={styles.modal}>
                <View style={styles.detailTitle}>
                  <Text style={styles.detailTitleText}>产品参数</Text>
                </View>
                <View style={styles.detailList}>
                  <Text style={styles.detailListTitle}>产地</Text>
                  <Text style={styles.detailListInfo}>{productDetailDt.placeOfOrigin}</Text>
                </View>
                <View style={styles.detailList}>
                  <Text style={styles.detailListTitle}>规格</Text>
                  <Text style={styles.detailListInfo}>{specDt[specIndex].spec}</Text>
                </View>
                <View style={styles.detailList}>
                  <Text style={styles.detailListTitle}>储存方式</Text>
                  <Text style={styles.detailListInfo}>{productDetailDt.storageMode}</Text>
                </View>
                <View style={styles.detailList}>
                  <Text style={styles.detailListTitle}>品牌</Text>
                  <Text style={styles.detailListInfo}>{productDetailDt.brand}</Text>
                </View>
                <TouchableOpacity style={styles.closeModel} onPress={this.closeDetailModel.bind(this)}>
                  <Image style={styles.closeImg} source={require('../images/close.png')}></Image>
                </TouchableOpacity>
                <TouchableOpacity style={styles.save} onPress={this.closeDetailModel.bind(this)}>
                  <Text style={styles.saveText}>完成</Text>
                </TouchableOpacity>
              </View> 
            </View> 
          </View>
        </Modal>
        <Toast ref="toast" style={styles.toast} position="top" positionValue={410}/>
      </View>
    );
  }
}

class NetImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: pxToDp(750),
      height: 0,
    }
  }

  componentWillMount() {
    let uri = this.props.source;
    Image.getSize(uri, (width, height) => {
      let h = pxToDp(height / width * 750);
      this.setState({
        height: h,
      })
    })
  }

  render() {
    return (
      <Image
        style={{ width: this.state.width, height: this.state.height }}
        source={{ uri: this.props.source }}
      />
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
    borderTopWidth: pxToDp(2),
    borderTopColor: '#eeeeee',
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationStyle:{
    position: 'absolute',
    right: pxToDp(26),
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
    height: '100%',
    resizeMode: 'contain',
  },
  goodsName:{
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26),
    backgroundColor: 'white',
    justifyContent: 'center',
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
    fontWeight: 'bold',
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
    color: '#d0d0d0'
  },
  goodsDetail:{
    marginTop: pxToDp(14),
    backgroundColor: 'white'
  },
  goodDetailImg: {
    marginTop: pxToDp(14),
    paddingBottom: pxToDp(100)
  },
  goodsInfo:{
    position: 'relative',
    height: pxToDp(89),
    flexDirection: 'row',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee',
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
    backgroundColor: 'white',
    borderTopColor: '#f1f1f1',
    borderTopWidth: pxToDp(1)
  },
  goGoods:{
    paddingLeft: pxToDp(35),
    paddingRight: pxToDp(35),
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  goodsImgContainer: {
    paddingBottom: pxToDp(5)
  },
  goGoodsImg:{
    width: pxToDp(44),
    height: pxToDp(44)
  },
  goGoodsText:{
    fontSize: pxToDp(20),
    color: '#818181'
  },
  customerService:{
    paddingLeft: pxToDp(35),
    paddingRight: pxToDp(35),
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  customerServiceImg:{
    width: pxToDp(44),
    height: pxToDp(44)
  },
  customerServiceText:{
    fontSize: pxToDp(20),
    color: '#818181'
  },
  cart: {
    width: pxToDp(140),
    paddingLeft: pxToDp(35),
    paddingRight: pxToDp(35),
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartImg:{
    width: pxToDp(50),
    height: pxToDp(44)
  },
  cartText:{
    fontSize: pxToDp(20),
    color: '#818181'
  },
  cartNumWrap:{
    position: 'absolute',
    right: pxToDp(30),
    top: pxToDp(10),
    width: pxToDp(41),
    height: pxToDp(25),
    backgroundColor: '#fc4444',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToDp(30),
  },
  cartNumWrapShort: {
    width: pxToDp(32),
  },
  cartNumWrapLong: {
    width: pxToDp(40),
  },
  cartNum:{
    fontSize: pxToDp(20),
    color: 'white'
  },
  addGoods:{
    backgroundColor: '#2abd89',
    flex: 1,
    height: pxToDp(100),
    justifyContent: 'center',
    alignItems: 'center'
  },
  noGoods: {
    backgroundColor: '#d0d0d0',
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
    height: pxToDp(650),
  },
  modal:{
    paddingTop: pxToDp(40),
    width: '100%',
    height: '100%',
    backgroundColor: '#fafafa',
  },
  modalGoods:{
    position: 'absolute',
    left: pxToDp(34),
    top: pxToDp(0),
    zIndex:100,
    width: pxToDp(229),
    height: pxToDp(229),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalGoodsImg:{
    width: pxToDp(214),
    height: pxToDp(214),
    resizeMode: 'contain',
  },
  modalGoodsPriceNum:{
    marginLeft: pxToDp(290),
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
    borderBottomColor: '#eeeeee'
  },
  modalGoodsSpecWrap:{
    marginTop: pxToDp(66),
    backgroundColor: 'white'
  },
  modalGoodsSpecContent:{
    marginLeft: pxToDp(35),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    height: pxToDp(64),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2abd89',
    borderRadius: pxToDp(30)
  },
  modalGoodsSpecContent1:{
    marginLeft: pxToDp(35),
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    height: pxToDp(64),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f4f4f4',
    borderRadius: pxToDp(30)
  },
  modalGoodsSpecContentText:{
    fontSize: pxToDp(28),
    color: 'white'
  },
  modalGoodsSpecContentText1:{
    fontSize: pxToDp(28),
    color: 'black'
  },
  modalGoodsNum:{
    flexDirection: 'row',
    marginLeft: pxToDp(34),
    height: pxToDp(117),
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee'
  },
  closeModel: {
    position: 'absolute',
    right: pxToDp(30),
    top: pxToDp(50),
    width: pxToDp(50),
    height: pxToDp(50),
  },
  closeImg: {
    width: pxToDp(20),
    height: pxToDp(20)
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
  cannotSave: {
    position: "absolute",
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(100),
    backgroundColor: '#d0d0d0'
  },
  saveText:{
    fontSize: pxToDp(32),
    color: 'white'
  },
  detailTitle:{
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(90),
    backgroundColor: '#fafafa'
  },
  detailTitleText: {
    fontSize: pxToDp(34),
    color: '#2b2b2b'
  },
  detailList: {
    marginLeft: pxToDp(34),
    marginRight: pxToDp(34),
    flexDirection: 'row',
    alignItems: 'center',
    height: pxToDp(90),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee'
  },
  detailListTitle: {
    width: pxToDp(170),
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  detailListInfo: {
    fontSize: pxToDp(28),
  },
  toast:{
    backgroundColor: '#626262'
  },
});
