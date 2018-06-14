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

export default class Cart extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      dataSource: [],
      isEdit: false,
      checkAll: 0,
      sumNum: 0,
      totalPrice: 0,
      reducePrice: 0,
      showAlert: true
    };

    this.loadData();
  }

  loadData() {
    Fetch(global.url + '/API/MyCart/getShopCartList', 'post', {}, (responseData) => {
      if (responseData.success) {
        this.setState({
          dataSource: responseData.data.shopCartListDt
        });
        this.changeTotal();
        this.hideAlert();
      }
    },
    (err) => {
      Alert.alert('提示',err);
    });
  }

  hideAlert(){
    this.setState({
      showAlert: false
    });
  }

  // 总价计算
  changeTotal() {
    let sumNum = 0;
    let totalPrice = 0;
    let totalOriginalPrice = 0;
    let reducePrice = 0;
    let checkAll = 1;

    this.state.dataSource.forEach((data) => {
      if (!!data.isChecked) {
        totalPrice = totalPrice + data.price * data.count;
        totalOriginalPrice = totalOriginalPrice + data.originalPrice * data.count;
        sumNum = sumNum + data.count;
      } else {
        checkAll = 0;
      }
    });

    reducePrice = totalOriginalPrice - totalPrice;

    this.setState({
      sumNum: sumNum,
      checkAll: checkAll,
      totalPrice: parseFloat(totalPrice.toFixed(2)),
      reducePrice: parseFloat(reducePrice.toFixed(2))
    });
  }
  // 减少件数
  reduceGoodsNum(index) { 
    if (this.state.dataSource[index].count===1) { 
      return
    }
    this.state.dataSource[index].count--
    let newData = JSON.parse(JSON.stringify(this.state.dataSource));

    Fetch(global.url + '/API/MyCart/reduce', 'post', {
      id: this.state.dataSource[index].id
    }, (responseData) => {
      if (responseData.success) {
        this.setState({ dataSource: newData });
        this.changeTotal();
        store.dispatch({ type: types.reduceShopingNum.REDUCENUM, num: 1 });
      }
    },
    (err) => {
      Alert.alert('提示',err);
    });
  }
  // 增加件数
  addGoodsNum(index) { 
    this.state.dataSource[index].count++
    let newData = JSON.parse(JSON.stringify(this.state.dataSource));

    Fetch(global.url + '/API/MyCart/plus', 'post', {
      id: this.state.dataSource[index].id
    }, (responseData) => {
      if (responseData.success) {
        this.setState({ dataSource: newData });
        this.changeTotal();
        store.dispatch({ type: types.addShopingNum.ADDNUM, num: 1 });
      }
    },
    (err) => {
      Alert.alert('提示',err);
    });
  }
  // 删除所选
  deleteSelected() {
    let newData = this.state.dataSource;

    for (let i = 0; i < newData.length; i++) {
      if (newData[i].isChecked) {
        Fetch(global.url + '/API/MyCart/getShopCartList', 'post',
          {
            id: newData[i].id,
            isDeleted: 1
          }, (responseData) => {
          if (responseData.success) {
            this.setState({
              dataSource: responseData.data.shopCartListDt
            });
            this.changeTotal();
            store.dispatch({ type: types.reduceShopingNum.REDUCENUM, num: newData[i].count });
          }
        },
        (err) => {
          Alert.alert('提示',err);
        });
        // newData.splice(i, 1);
        // i--;
      }
    }

    this.setState({ dataSource: newData });
    this.changeTotal();
  }
  isCheckedFu(index) { 
    this.state.dataSource[index].isChecked = Number(!this.state.dataSource[index].isChecked);
    let newData = JSON.parse(JSON.stringify(this.state.dataSource));
    let isChecked = this.state.dataSource.every((item) => {
      return item.isChecked == true
    });

    Fetch(global.url + '/API/MyCart/check', 'post', {
      id: this.state.dataSource[index].id,
      isChecked: this.state.dataSource[index].isChecked
    }, (responseData) => {
      if (responseData.success) {
        this.setState({ dataSource: newData });
        this.changeTotal();
      }
    },
    (err) => {
      Alert.alert('提示',err);
    });
  }
  editFn() { 
    this.setState({ isEdit: true })
  }
  finish() { 
    this.setState({ isEdit: false })
  }
  // 全选
  checkAll() { 
    this.state.checkAll = Number(!this.state.checkAll);
    for (let i = 0; i < this.state.dataSource.length;i++) { 
      this.state.dataSource[i].isChecked = this.state.checkAll; 
    }
    let newData = JSON.parse(JSON.stringify(this.state.dataSource));

    Fetch(global.url + '/API/MyCart/checkAll', 'post', {
      isChecked: this.state.checkAll
    }, (responseData) => {
      if (responseData.success) {
        this.setState({ dataSource: newData, checkAll: this.state.checkAll });
        this.changeTotal();
      }
    },
    (err) => {
      Alert.alert('提示',err);
    });
  }
  //list渲染
  _renderRow1(item, index) {
    return (
      <View style={styles.list}>
        <TouchableOpacity style={styles.unchecked} onPress={() => { 
           this.isCheckedFu(index)
        }}>
          <Image style={styles.uncheckedImg} source={item.isChecked?require('../images/select.png'):require('../images/unchecked.png')}></Image> 
        </TouchableOpacity>
        <View style={styles.good}>
          <Image style={styles.goodImg} source={{uri: item.goodImg[0]}}></Image>
        </View>
        <View style={styles.goodDetail}>
          <View style={styles.goodNameWrap}><Text style={styles.goodName}>{item.goodName}</Text></View>
          <View style={styles.goodSpecWrap}><Text style={styles.goodSpec}>{item.goodspecifications}</Text></View>
          <View style={styles.goodOriginalPriceWrap}><Text style={styles.goodOriginalPrice}>￥{item.originalPrice}</Text></View>
          <View style={styles.goodPresentPriceWrap}>
            <Text style={styles.goodSymble}>￥</Text><Text style={styles.goodPresentPrice}>{item.price}</Text><Text style={styles.company}></Text>
            <View style={styles.goodsNum}>
              <TouchableOpacity style={styles.goodsReduceWrap} onPress={() => { 
                this.reduceGoodsNum(index)
              }}><Text style={styles.goodsReduce}>-</Text></TouchableOpacity>
              <TouchableOpacity style={styles.numWrap}><Text style={styles.num}>{item.count}</Text></TouchableOpacity>
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
    const { navigate, goBack } = this.props.navigation;
    let view;
    if (this.state.dataSource.length > 0) {
      view =
        <FlatList 
          style={styles.flatList}
          contentContainerStyle={styles.goods1}
          data={this.state.dataSource}
          renderItem={({ item, index }) =>this._renderRow1(item, index)}
        />;
    } else if(!this.state.showAlert) {
      view =
        <View style={styles.state}>
          <View style={styles.stateImgWrap}>
            <Image style={styles.stateImg} source={require('../images/noCart.png')}></Image>
          </View>
          <View style={styles.stateShow}><Text style={styles.stateShowText}>购物车竟然是空的</Text></View>
          <TouchableOpacity style={styles.stateButton} onPress={() => navigate('Home', {selectedTab: 'home'})}>
            <Text>立即选购</Text>
          </TouchableOpacity>
        </View>;
    }

    return (
      <View style={styles.contenier}>  
        <ImageBackground style={styles.headerContainer} source={require('../images/headerBackground.png')} resizeMode='cover'>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerGoBack} onPress={() => {goBack()}}>
              <Image style={styles.headerGoBackImg} source={require('../images/leftDir.png')}></Image>
            </TouchableOpacity>
            <Text style={styles.headerTitle}>购物车</Text>
            <TouchableOpacity onPress={() => { 
              this.editFn()
            }} style={!this.state.isEdit&&this.state.dataSource.length>0?styles.headerEdit:styles.hidden}>
              <Text  style={styles.headerEditText}>编辑</Text>
            </TouchableOpacity> 
            <TouchableOpacity onPress={() => { 
              this.finish()
            }} style={this.state.isEdit&&this.state.dataSource.length>0?styles.headerEdit:styles.hidden}>
              <Text  style={styles.headerEditText}>完成</Text>
            </TouchableOpacity>  
          </View>
        </ImageBackground>
        {view}
        <View style={this.state.dataSource.length>0?styles.result:styles.hidden}>
          <TouchableOpacity style={styles.allchecked} onPress={() => { 
            this.checkAll()
          }}>
            <Image style={styles.allcheckedImg} source={this.state.checkAll?require('../images/select.png'):require('../images/unchecked.png')}></Image>
            <Text>全选</Text>
          </TouchableOpacity>
          <View style={this.state.isEdit?styles.hidden:styles.totalPrice}>
            <View style={styles.total}><Text style={styles.totalText}>合计（不含运费）：</Text><Text style={styles.totalNum}>￥{this.state.totalPrice}</Text></View> 
            <View style={styles.reducePrice}><Text style={styles.reducePriceText}>已优惠：</Text><Text style={styles.reducePriceNum}>￥{this.state.reducePrice}</Text></View> 
          </View>
          <TouchableOpacity style={!this.state.isEdit && this.state.sumNum > 0 ? styles.goPay : styles.hidden}
            onPress={() => {navigate('Order')}}>
            <Text style={styles.goPayText}>去结算({this.state.sumNum})</Text>  
          </TouchableOpacity>
          <View style={!this.state.isEdit && this.state.sumNum<=0?styles.payDisable:styles.hidden}>
            <Text style={styles.goPayText}>去结算</Text>
          </View>  
          <TouchableOpacity style={this.state.isEdit && this.state.sumNum > 0 ? styles.delete : styles.hidden}
            onPress={() => {this.deleteSelected()}}>
            <Text style={styles.deleteText}>删除({this.state.sumNum})</Text>
          </TouchableOpacity>
          <View style={this.state.isEdit&&this.state.sumNum<=0?styles.deleteDisable:styles.hidden}>
            <Text style={styles.deleteText}>删除</Text>
          </View> 
        </View>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={true}
          closeOnHardwareBackPress={false}
          closeOnTouchOutside={false}
          title='Loading..'
          progressSize='small'
          progressColor='gray'
        />
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
    height: pxToDp(96),
    ...Platform.select({
      ios: {
        height: pxToDp(124),
        paddingTop: pxToDp(28)
      },
      android: {
        height: pxToDp(96),
      }
    })
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
  state: {
    width: '100%',
    height: pxToDp(537),
    alignItems: 'center',
    justifyContent: 'center'
  },
  stateImgWrap: {
    marginTop: pxToDp(200)
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
  flatList: {
    marginBottom: pxToDp(100),
  },
  result: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    height: pxToDp(100),
    backgroundColor: '#ffffff',
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
    backgroundColor: '#fe0036'
  },
  payDisable: {
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
  deleteDisable: {
    position: 'absolute',
    right: 0,
    width: pxToDp(220),
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#d0d0d0'
  },
  deleteText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
  hidden: {
    display:'none'
  }
});
