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
export default class Cart extends Component<Props> {
  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: [{ isSelect: true, name: '有机青菜', img: '', spec: '500g袋装', originalPrice: '58.90', presentPrice: '49.00', num: 2 }, { isSelect: false, name: '有机花菜', spec: '500g袋装', originalPrice: '12.90', presentPrice: '10.00', num: 1 }],
      isEdit: false,
      checkAll: false
    };
  }
  reduceGoodsNum(index) { 
    if (this.state.dataSource[index].num===1) { 
      return
    }
    this.state.dataSource[index].num--
    var newData = JSON.parse(JSON.stringify(this.state.dataSource));
    this.setState({ dataSource: newData })
  }
  addGoodsNum(index) { 
    this.state.dataSource[index].num++
    var newData = JSON.parse(JSON.stringify(this.state.dataSource));
    this.setState({ dataSource: newData })
  }
  isSelectFu(index) { 
    this.state.dataSource[index].isSelect = !this.state.dataSource[index].isSelect
    var newData = JSON.parse(JSON.stringify(this.state.dataSource));
    let isSelect=this.state.dataSource.every((item) => { 
        return item.isSelect===true
    })
    this.setState({ dataSource: newData,checkAll:isSelect })
  }
  editFn() { 
    this.setState({ isEdit: true })
  }
  finish() { 
    this.setState({ isEdit: false })
  }
  checkAll() { 
    this.state.checkAll=!this.state.checkAll
    for (let i = 0; i < this.state.dataSource.length;i++) { 
      this.state.dataSource[i].isSelect = this.state.checkAll; 
    }
    var newData = JSON.parse(JSON.stringify(this.state.dataSource));
    this.setState({dataSource: newData,checkAll:this.state.checkAll })
  }
  //list渲染
  _renderRow1(item, index) {
    return (
      <View style={styles.list}>
        <TouchableOpacity style={styles.unchecked} onPress={() => { 
           this.isSelectFu(index)
        }}>
          <Image style={styles.uncheckedImg} source={item.isSelect?require('../images/select.png'):require('../images/unchecked.png')}></Image> 
        </TouchableOpacity>
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
              <TouchableOpacity style={styles.goodsReduceWrap} onPress={() => { 
                this.reduceGoodsNum(index)
              }}><Text style={styles.goodsReduce}>-</Text></TouchableOpacity>
              <TouchableOpacity style={styles.numWrap}><Text style={styles.num}>{item.num}</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => { 
                this.addGoodsNum(index)
              }} style={styles.goodsAddWrap}><Text style={styles.goodsAdd}>+</Text></TouchableOpacity>
            </View>
          </View>
        </View>
      </View>  
    );
  }
  render() {
    return (
      <View style={styles.contenier}>  
        <ImageBackground style={styles.header} source={require('../images/headerBackground.png')} resizeMode='cover'>
          <TouchableOpacity style={styles.headerGoBack}>
            <Image style={styles.headerGoBackImg} source={require('../images/leftDir.png')}></Image>
          </TouchableOpacity>
          <Text style={styles.headerTitle}>购物车</Text>
          <TouchableOpacity onPress={() => { 
            this.editFn()
          }} style={this.state.isEdit?styles.hidden:styles.headerEdit}>
            <Text  style={styles.headerEditText}>编辑</Text>
          </TouchableOpacity> 
          <TouchableOpacity onPress={() => { 
            this.finish()
          }} style={!this.state.isEdit?styles.hidden:styles.headerEdit}>
            <Text  style={styles.headerEditText}>完成</Text>
          </TouchableOpacity>  
        </ImageBackground>
        <FlatList 
          contentContainerStyle={styles.goods1}
          data={this.state.dataSource}
          renderItem={({ item, index }) =>this._renderRow1(item, index)}
        />
        <View style={styles.result}>
          <TouchableOpacity style={styles.allchecked} onPress={() => { 
            this.checkAll()
          }}>
            <Image style={styles.allcheckedImg} source={this.state.checkAll?require('../images/select.png'):require('../images/unchecked.png')}></Image>
            <Text>全选</Text>
          </TouchableOpacity>
          <View style={this.state.isEdit?styles.hidden:styles.totalPrice}>
            <View style={styles.total}><Text style={styles.totalText}>合计（不含运费）：</Text><Text style={styles.totalNum}>￥0.00</Text></View> 
            <View style={styles.reducePrice}><Text style={styles.reducePriceText}>已优惠：</Text><Text style={styles.reducePriceNum}>￥0.00</Text></View> 
          </View>
          <TouchableOpacity style={this.state.isEdit?styles.hidden:styles.goPay}>
            <Text style={styles.goPayText}>去结算</Text>  
          </TouchableOpacity>
          <TouchableOpacity style={!this.state.isEdit?styles.hidden:styles.delete}>
            <Text style={styles.deleteText}>删除(1)</Text>  
          </TouchableOpacity> 
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
    justifyContent: 'center'
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
    color: 'white'
  },
  headerEdit: {
    position: 'absolute',
    right: pxToDp(32),
    width: pxToDp(100),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerEditText: {
    fontSize: pxToDp(32),
    color: 'white',
  },
  list: {
    flexDirection: 'row',
    alignItems: 'center',
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
  result: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: pxToDp(100),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#daddde'
  },
  allchecked: {
    marginLeft: pxToDp(26),
    flexDirection: 'row',
    alignItems: 'center'
  },
  allcheckedImg: {
    marginRight: pxToDp(12),
    width: pxToDp(38),
    height: pxToDp(38),
  },
  totalPrice: {
    paddingRight: pxToDp(24),
    width: pxToDp(400),
    alignItems: 'flex-end',
  },
  total: {
    flexDirection: 'row'
  },
  totalText: {
    fontSize: pxToDp(24),
    color: '#2a2a2a'
  },
  totalNum: {
    fontSize: pxToDp(28),
    color: "#ff0036"
  },
  reducePrice: {
    flexDirection: 'row'
  },
  reducePriceText: {
    fontSize: pxToDp(24),
    color: '#adadad'
  },
  reducePriceNum: {
    fontSize: pxToDp(24),
    color: '#adadad'
  },
  goPay: {
    width: pxToDp(220),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0d0d0'
  },
  goPayText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
  delete: {
    position: 'absolute',
    right: 0,
    width: pxToDp(220),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fe0036'
  },
  deleteText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
  hidden: {
    display:'none'
  }
});
