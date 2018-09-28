/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import types from '../actions/shopingCart'
import store from '../store/index'
import Fetch from '../js/fetch'
import Toast from 'react-native-easy-toast';
import AwesomeAlert from 'react-native-awesome-alerts';
import CookieManager from 'react-native-cookies';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Animated,
  Easing,
  Alert,
  FlatList
} from 'react-native';
import pxToDp from '../js/pxToDp';
import hasFringe from '../js/hasFringe';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  return deviceHeightDp-uiElementHeight;
}

export default class SearchGoods extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;

    this.isLoad = false;

    if (!!params && !!params.keyword) {
      this.loadData(params.keyword);
    }

    this.state={
      dataSource: [],
      right: new Animated.Value(10),
      top: new Animated.Value(10),
      fadeAnim: new Animated.Value(0),
      count: store.getState().count
    }

    this._refs = {}

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count
      })
    })
  }

  search() {
    this.loadData(this.state.searchText);
  }

  getScreenXY(i, id) {
    this.addToCart(id);
    this._refs[i].measure((x, y, width, height, pageX, pageY) => {
      this.setState({
        right: new Animated.Value(deviceWidthDp - pageX - pxToDp(45 / 2)),
        top: new Animated.Value(pageY - pxToDp(45 / 2))
      }, () => { 
        this.animate();
      })
    })
  }

  addToCart(id) {
    CookieManager.get(global.url).then(cookie => {
      if (!!cookie.userId) {
        Fetch(global.url + '/API/ProductDetail/joinCart', 'post', {
          count: 1,
          goodspecifications: id
        }, (responseData) => {
          if (responseData.success) {
            this.refs.toast.show('加入成功!');
            store.dispatch({ type: types.addShopingNum.ADDNUM, num: 1 })
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
    })
  }

  hasStock(good) {
    let count = 0;
    for (let spec of good.specs) {
      count += spec.stock;
    }
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  }

  loadData(keyword) {
    this.isLoad = true;
    Fetch(global.url + '/api/home/search?pageIndex=0&pageSize=1000&keyword=' + keyword, 'get', null,
      (responseData) => {
      this.isLoad = false;
      if (responseData.result) {
        this.setState({
          dataSource: responseData.data.goods,
          keyword: keyword
        },() => this.hideAlert());
      }
    },
    (err) => {
      this.hideAlert()
      Alert.alert('提示',err);
    });
    
    setTimeout(() => {
      if (this.isLoad) {
        this.setState({
          showAlert: true
        })
      }
    }, 1500);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  animate() {
    Animated.sequence([
        Animated.timing(                            // 随时间变化而执行的动画类型
          this.state.fadeAnim,                      // 动画中的变量值
          {
            toValue: 1, 
            duration: 100,                             // 透明度最终变为1，即完全不透明
          },
        ),            // 首先执行decay动画，结束后同时执行spring和twirl动画
        Animated.parallel(
            [
              Animated.timing(this.state.right, {
                  toValue: pxToDp(10),
              duration: 300,
              easing: Easing.quad
              }),
              Animated.timing(this.state.top, {
                  toValue: pxToDp(10),
                  duration: 300,
                  easing: Easing.quad
              })
            ]
      ),
      Animated.timing(                            // 随时间变化而执行的动画类型
        this.state.fadeAnim,                      // 动画中的变量值
        {
          toValue: 0,
          duration: 100,                             // 透明度最终变为1，即完全不透明
        }
      ),
    ]).start();
  }

  hideAlert() {
    this.setState({
      showAlert: false
    });
  }

  _renderRow1(item, index) {
    const { navigate } = this.props.navigation;
    let hasStock = this.hasStock(item)
    return (
      <View style={styles.rowGoods}>
        <TouchableOpacity style={styles.rowGoodsImgContainer} onPress={()=>navigate('GoodsDetail',{id: item.id})}>
          <Image style={styles.rowGoodsImg} source={{ uri: item.cover }} />
          <View style={hasStock? styles.hidden : styles.rowGoodsNoStock}>
            <Text style={styles.rowGoodsNoStockText}>售空</Text>
          </View>
        </TouchableOpacity>
        <View><Text numberOfLines={1} style={styles.rowGoodsName}>{item.goodName}</Text></View>
        <View style={styles.rowGoodsMoneyAndAdd}>
          <View style={styles.rowGoodsMoney}><Text style={styles.rowGoodsSymbol}>¥</Text><Text style={styles.rowGoodsNum}>{item.price}</Text><Text style={styles.rowGoodsCompany}>/{item.specs[0].spec}</Text></View>
          <TouchableOpacity
            disabled={!hasStock}
            ref={(r) => this._refs[index] = r}
            onPress={() => { this.getScreenXY(index, item.specs[0].id) }}
            style={styles.rowGoodsAdd}>
            <Image style={styles.rowGoodsAddImg} source={hasStock ? require('../images/addGood.png') : require('../images/addGood2.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  render() {
    const { navigate, goBack } = this.props.navigation;
    const { params } = this.props.navigation.state;

    let view;
    if (this.state.dataSource.length > 0) {
      view = 
      <FlatList 
        contentContainerStyle={styles.goods3}  
        data={this.state.dataSource}
        renderItem={({ item, index }) =>this._renderRow1(item, index)}
      />
    } else if (!this.state.showAlert && !this.isLoad) {
      view = 
      <View style={styles.state}>
        <View style={styles.stateImgWrap}>
          <Image style={styles.stateImg} source={require('../images/noResult.png')}></Image>
        </View>
        <View style={styles.stateShow}><Text style={styles.stateShowText}>没有找到搜索结果</Text></View>
      </View>;
    }
    return (
      <View style={styles.contenier}>
        <View style={styles.headerContainer}>
          <View style={styles.header}>
            <TouchableOpacity style={styles.headerGoBack} onPress={()=>goBack()}>
              <Image style={styles.headerImg} source={require('../images/orderDir.png')}></Image>
            </TouchableOpacity>  
            <View style={styles.headerSearchWrap}>
              <Image style={styles.headerSearchImg} source={require("../images/search.png")}></Image>  
              <TextInput
                returnKeyType={"search"}
                style={styles.headerSearch}
                underlineColorAndroid={'transparent'}
                onChangeText={(text) => this.setState({searchText:text})}
                placeholder={this.state.keyword}
                onSubmitEditing={this.search.bind(this)}
                placeholderTextColor={'#a6a6a6'}
              />
            </View>
            <TouchableOpacity style={styles.cart} onPress={()=>{navigate('Cart')}}>
              <Image style={styles.cartImg} source={require('../images/searchCart.png')}></Image>
              <View style={[styles.cartNumWrap, this.state.count > 9 ? styles.cartNumWrapLong : styles.cartNumWrapShort]}>
                <Text style={styles.cartNum}>{this.state.count}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        {view}
        <Animated.View                            // 可动画化的视图组件
          style={{
            position:"absolute",
            zIndex: 1000,
            opacity: this.state.fadeAnim,
            width: pxToDp(30), height: pxToDp(30),
            backgroundColor: '#2abd89',
            borderRadius:50,
            right: this.state.right,
            top: this.state.top,
          }}
        >
        </Animated.View>
        <AwesomeAlert
          show={this.state.showAlert}
          showProgress={true}
          closeOnHardwareBackPress={false}
          closeOnTouchOutside={false}
          title='Loading..'
          progressSize='small'
          progressColor='gray'
        />
        <Toast ref="toast" style={styles.toast} position="top" positionValue={410}/>
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
  headerContainer: {
    backgroundColor: 'white'
  },
  header:{
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(96),
    ...Platform.select({
      ios: {
        marginTop: pxToDp(hasFringe() ? 50 : 28)
      },
      android: {}
    })
  },
  headerGoBack: {
    position: 'absolute',
    left: pxToDp(16),
    width: pxToDp(50),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerImg:{
    width: pxToDp(24),
    height: pxToDp(40),
  },
  headerText: {
    fontSize: pxToDp(36),
    color: '#020202'
  },
  headerSearchWrap: {
    position: "relative",
    flex: 1,
    height: pxToDp(63),
    marginLeft: pxToDp(98),
    justifyContent: "center",
  },
  headerSearchImg: {
    position: 'absolute',
    left: pxToDp(30),
    zIndex: 100,
    margin: "auto",
    width: pxToDp(36),
    height: pxToDp(36)
  },
  headerSearch: {
    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 36,
    backgroundColor: "#eeeeee",
    height: "100%",
    paddingLeft: pxToDp(74),
    paddingBottom: 0,
    paddingTop: 0
  },
  cart:{
    position: 'relative',
    marginRight: pxToDp(12),
    width: pxToDp(92),
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cartImg:{
    width: pxToDp(52),
    height: pxToDp(42)
  },
  cartNumWrap:{
    position: 'absolute',
    right: 0,
    top: pxToDp(17),
    height: pxToDp(24),
    borderRadius: pxToDp(30),
    backgroundColor: '#fd4448',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartNumWrapShort: {
    width: pxToDp(32),
  },
  cartNumWrapLong: {
    width: pxToDp(40),
  },
  cartNum: {
    color: 'white',
    fontSize: pxToDp(20),
  },
  goods3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    // justifyContent: 'space-around',
  },
  rowGoods: {
    width: pxToDp(375),
    borderWidth: pxToDp(2),
    backgroundColor: '#ffffff',
    borderColor: '#f4f4f4',
  },
  rowGoodsImgContainer: {
    width: '100%',
    height: pxToDp(375)
  },
  rowGoodsImg: {
    width: pxToDp(375),
    height: pxToDp(375),
    marginBottom: pxToDp(18)
  },
  rowGoodsNoStock: {
    position: 'absolute',
    padding: pxToDp(10),
    right: 0,
    top: 0,
  },
  rowGoodsNoStockText: {
    fontSize: pxToDp(20),
    color: '#ffae00'
  },
  rowGoodsName: {
    marginTop: pxToDp(10),
    marginBottom: pxToDp(10),
    paddingLeft: pxToDp(16),
    fontSize: pxToDp(24),
    color: '#2a2a2a'
  },
  rowGoodsMoneyAndAdd: {
    position: 'relative',
    flexDirection: "row",
    marginBottom: pxToDp(30),
  },
  rowGoodsMoney: {
    marginLeft: pxToDp(18),
    flexDirection: "row",
    alignItems: 'flex-end',
  },
  rowGoodsSymbol: {
    fontSize: pxToDp(20),
    color: "#ff0036",
  },
  rowGoodsNum: {
    fontSize: pxToDp(26),
    color: "#ff0036",
  },
  rowGoodsCompany: {
    marginLeft: pxToDp(5),
    fontSize: pxToDp(20),
    color: "#aaaaaa",
  },
  rowGoodsAdd: {
    position: 'absolute',
    top: 0,
    right: pxToDp(18)
  },
  rowGoodsAddImg: {
    width: pxToDp(45),
    height: pxToDp(45)
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
  toast:{
    backgroundColor: '#626262'
  },
});
