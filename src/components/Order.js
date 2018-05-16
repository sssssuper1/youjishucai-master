/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PureComponent } from 'react';
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
export default class Order extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [{ isSelect: true, name: '有机青菜', img: '', spec: '500g袋装', originalPrice: '58.90', presentPrice: '49.00', num: 2 }, { isSelect: false, name: '有机花菜', spec: '500g袋装', originalPrice: '12.90', presentPrice: '10.00', num: 1 }],
      text: '',
      payNum:0
    };
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
          <View style={styles.goodSpecWrap}><Text style={styles.goodSpec}>规格：{item.spec}</Text></View>
          <View style={styles.goodPresentPriceWrap}>
            <Text style={styles.goodSymble}>￥</Text><Text style={styles.goodPresentPrice}>{item.presentPrice}</Text><Text style={styles.company}></Text>
            <View style={styles.goodsNum}>
              <Text>2</Text>
            </View>
          </View>
        </View>
      </View>  
    );
  }
  render() {
    return (
      <View style={styles.contenier}> 
        <View style={styles.header} >
          <TouchableOpacity style={styles.headerGoBack}>
            <Image style={styles.headerGoBackImg} source={require('../images/orderDir.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>确认订单</Text>
        </View>
        <ScrollView> 
        <TouchableOpacity style={styles.address}>
          <View style={styles.addressWrap}><Image style={styles.addressImg} source={require('../images/orderAddress.png')}></Image></View>
          <View style={styles.userInfo}>
            <View style={styles.user}><Text style={styles.userName}>张三丰</Text><Text style={styles.userPhone}>1802013458967</Text></View>
            <View style={styles.userAddress}><Text style={styles.userAddressText}>江苏省南京市鼓楼区  中央门街道389号凤凰国际大
            厦11楼01</Text></View>
          </View>
          <View style={styles.dir}>
            <Image style={styles.dirImg} source={require('../images/rightDir.png')}></Image>
          </View>  
        </TouchableOpacity>
        <ImageBackground style={styles.addressBackground} source={require('../images/addressBackground.jpg')}>
        </ImageBackground>
        <FlatList 
          contentContainerStyle={styles.goods1}  
          data={this.state.dataSource}
          renderItem={({ item, index }) =>this._renderRow1(item, index)}
        />
        <View style={styles.remarks}>
          <Text style={styles.remarksText}>备注：</Text>
          <TextInput
            returnKeyType={"search"}
            underlineColorAndroid={'transparent'}
            style={styles.remarksInput}
            placeholder={'选填，本次交易说明'}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />  
        </View>
        <View style={styles.paymentMethod}>
          <TouchableOpacity style={styles.payment}><Image style={styles.payment1Img} source={require('../images/wechat.png')}></Image><Text>微信支付</Text><Image style={styles.isSelect} source={this.state.payNum===0?require('../images/select.png'):require('../images/unchecked.png')}></Image></TouchableOpacity>
          <TouchableOpacity style={styles.payment}><Image style={styles.payment2Img} source={require('../images/alipay.png')}></Image><Text>支付宝</Text><Image style={styles.isSelect} source={this.state.payNum===1?require('../images/select.png'):require('../images/unchecked.png')}></Image></TouchableOpacity>
        </View>
        <View style={styles.goods}>
          <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>商品件数</Text><Text style={styles.totalNum}>共三件</Text></View>
          <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>商品金额</Text><Text style={styles.price}>¥148.00</Text></View>
          <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>配送费</Text><Text style={styles.price}>+ ¥148.00</Text></View>
          <View style={styles.goodsInfo}><Text style={styles.goodsInfoTitle}>vip会员卡优惠</Text><Text style={styles.price}>- ¥148.00</Text></View>
        </View>
        </ScrollView>  
        <View style={styles.result}>    
          <Text style={styles.resultTitle}>实付金额：</Text><Text style={styles.resultPrice}>¥148.00</Text><TouchableOpacity style={styles.payBtn}><Text style={styles.payBtnText}>去结算</Text></TouchableOpacity>  
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
    height: pxToDp(96),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  headerGoBack: {
    position: 'absolute',
    left: pxToDp(34),
    width: pxToDp(50),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerGoBackImg: {
    width: pxToDp(23),
    height: pxToDp(40)
  },
  headerTitle: {
    fontSize: pxToDp(36),
  },
  address: {
    flexDirection: 'row',
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26),
    height: pxToDp(190),
    alignItems: "center",
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  addressWrap: {
    width: pxToDp(27),
  },
  addressImg: {
    width: pxToDp(27),
    height: pxToDp(31)
  },
  userInfo: {
    width: pxToDp(660),
    paddingLeft: pxToDp(20)
  },
  user: {
    flexDirection: 'row'
  },
  userName: {
    marginRight: pxToDp(50),
    fontSize: pxToDp(28),
    color: '#1d1d20',
  },
  userPhone: {
    fontSize: pxToDp(28),
    color: '#1d1d20'
  },
  userAddressText: {
    fontSize: pxToDp(28),
    color: '#a7a7a7'
  },
  dir: {
    flex: 1
    
  },
  dirImg: {
    width: pxToDp(10),
    height: pxToDp(20)
  },
  addressBackground: {
    marginBottom: pxToDp(16),
    height: pxToDp(5),
  },
  list: {
    borderTopWidth: pxToDp(1),
    borderTopColor: '#f1f1f1',
    flexDirection: 'row',
    alignItems: 'center',
    height: pxToDp(240),
    backgroundColor: 'white'
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
    marginLeft: pxToDp(26),
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
    borderBottomLeftRadius: 2,
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
    borderBottomRightRadius: 2,
  },
  remarks: {
    flexDirection: 'row',
    height: pxToDp(86),
    alignItems: "center",
    backgroundColor: 'white'
  },
  remarksText: {
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  remarksInput: {
    width: '100%',
    height: '100%'
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
    borderBottomColor: '#f1f1f1'
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
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#f1f1f1',
  },
  goodsInfoTitle: {
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  totalNum: {
    position: 'absolute',
    right: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  price: {
    position: 'absolute',
    right: pxToDp(26),
    fontSize: pxToDp(28),
    color: '#ff0036'
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
    color: '#2a2a2a'
  },
  resultPrice: {
    fontSize: pxToDp(32),
    color: '#ff0036'
  },
  payBtn: {
    position: 'absolute',
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    width: pxToDp(220),
    height: '100%',
    backgroundColor: '#ff0036',
  },
  payBtnText: {
    color: 'white',
    fontSize: pxToDp(32)
  }
});
