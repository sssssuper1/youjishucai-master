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
  return deviceHeightDp-uiElementHeight;
}

export default class SearchGoods extends Component {
  constructor(props) {
    super(props);
    const { params } = this.props.navigation.state;
    let showAlert = true;

    if (!!params && !!params.keyword) {
      this.loadData(params.keyword);
    } else {
      showAlert = false;
    }

    this.state={
      dataSource: [],
      right: new Animated.Value(10),
      top: new Animated.Value(10),
      fadeAnim: new Animated.Value(0),
      showAlert: showAlert,
      count: store.getState().count
    }

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count
      })
    })
  }

  search() {
    this.loadData(this.state.searchText);
  }

  loadData(keyword) {
    Fetch(global.url + '/API/home/getGoodsList', 'post', {
      addressLabel: '',
      categoryId: 0,
      keyword: keyword,
      loadAll: true,
      pageIndex: '0'
    }, (responseData) => {
      if (responseData.success) {
        this.setState({
          dataSource: responseData.data.goods,
          keyword: keyword
        },() => this.hideAlert());
      }
    },
    (err) => {
      alert(err);
    });
  }

  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        store.dispatch({ type: types.addShopingNum.ADDNUM, num: 1})
        this.setState({ right: new Animated.Value(deviceWidthDp-evt.nativeEvent.pageX-pxToDp(45/2)), top: new Animated.Value(evt.nativeEvent.pageY-pxToDp(45/2)) }, () => { 
          this.animate();
        })
      },
      onPanResponderMove: (evt, gestureState) => {
        // 最近一次的移动距离为gestureState.move{X,Y}

        // 从成为响应者开始时的累计手势移动距离为gestureState.d{x,y}
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        // 用户放开了所有的触摸点，且此时视图已经成为了响应者。
        // 一般来说这意味着一个手势操作已经成功完成。
      },
      onPanResponderTerminate: (evt, gestureState) => {
        // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      },
      onShouldBlockNativeResponder: (evt, gestureState) => {
        // 返回一个布尔值，决定当前组件是否应该阻止原生组件成为JS响应者
        // 默认返回true。目前暂时只支持android。
        return true;
      },
    });
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
              duration: 500,
              easing: Easing.quad
              }),
              Animated.timing(this.state.top, {
                  toValue: pxToDp(10),
                  duration: 500,
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
    return (
      <View style={styles.rowGoods}>
        <TouchableOpacity onPress={()=>navigate('GoodsDetail',{id: item.id})}>
          <Image style={styles.rowGoodsImg} source={{uri: item.cover}}/>
        </TouchableOpacity>
        <View ><Text style={styles.rowGoodsName}>{item.goodName}</Text></View>
        <View style={styles.rowGoodsMoneyAndAdd}>
          <View style={styles.rowGoodsMoney}><Text style={styles.rowGoodsSymbol}>¥</Text><Text style={styles.rowGoodsNum}>{item.price}</Text><Text style={styles.rowGoodsCompany}>/{item.specs[0].spec}</Text></View>
          <View style={styles.rowGoodsAdd} {...this._panResponder.panHandlers}><Image style={styles.rowGoodsAddImg} source={require('../images/addGood.png')}/></View>
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
    } else if (!this.state.showAlert) {
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
            <View style={styles.cartNumWrap}><Text style={styles.cartNum}>{this.state.count}</Text></View>
          </TouchableOpacity>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
  contenier: {
    width: '100%',
    height: '100%'
  },
  header:{
    position: 'relative',
    height: pxToDp(96),
    flexDirection: 'row',
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
    width: pxToDp(42),
    height: pxToDp(24),
    borderRadius: pxToDp(30),
    backgroundColor: '#fd4448',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartNum: {
    color: 'white',
    fontSize: pxToDp(20),
  },
  goods3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  rowGoods: {
    width: pxToDp(350),
    borderWidth: pxToDp(2),
    backgroundColor: '#ffffff',
    borderColor: '#f4f4f4',
  },
  rowGoodsImg: {
    width: pxToDp(350),
    height: pxToDp(350),
    marginBottom: pxToDp(18)
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
});
