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
import AwesomeAlert from 'react-native-awesome-alerts';
import PopupDialog from 'react-native-popup-dialog';
import Toast from 'react-native-easy-toast';
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
  Button,
  FlatList,
  ToastAndroid
} from 'react-native';
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  return deviceHeightDp-uiElementHeight;
}


export default class Home extends Component {
  constructor(props) {
    super(props);
    //左边菜单
    let type1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //初始化
    this.state = {
      showAlert: false,
      LeftdataSource: type1.cloneWithRows([]),
      RightdataSource: [],
      selectName: '',
      right: new Animated.Value(10),
      top: new Animated.Value(10),
      fadeAnim: new Animated.Value(0),
      message: '网络错误!',
      announce: '',
      count: 0,
      banners: []
    }

    this.getNotify();
    //菜单获取
    Fetch(global.url + '/api/home/initSgHome', 'get', null, (responseData) => {
      if (responseData.result) {
        let LeftdataSource = responseData.data.categorys.map((item, index) => {
          let json = {
            active: false,
            name: item.name,
            id: item.id
          }
          if (index === 0) {
            json.active = true;
          }
          return json
        })

        this.setState({
          // banners: responseData.data.banners
          banners: [
            { imgUrl: 'http://192.168.0.97:94/web/img/021.png' },
            { imgUrl: 'http://192.168.0.97:94/web/img/021.png' }
          ],
          LeftdataSource: type1.cloneWithRows(LeftdataSource),
          selectName: LeftdataSource[0].name,
        })

        this.rightGoods = [];
        this.menuType = 0;

        for (let i = 0; i < responseData.data.categorys.length; i++) {
          this.rightGoods.push([]);
        }

        this.getGoodsList(responseData.data.categorys[0].id, 0);
      } else { 
        Alert.alert('提示', responseData.errMsg);
      }
    }, (err) => { 
      Alert.alert('提示', '网络错误！');
    })

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count
      })
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

  getGoodsList = (categoryId, index) => {
    this.menuType = index;
    if (this.rightGoods[index].length == 0) {
      let params = {
        categoryId: categoryId,
        pageIndex: 0,
        loadAll: true
      }
      Fetch(global.url + '/api/home/getGoodsList', 'post', params, (res) => {
        if (typeof res == 'object' && res.success) { 
          this.rightGoods[index] = res.data.goods.slice(0);
          this.setState({
            RightdataSource: this.rightGoods[index]
          })
        } else { 
          Alert.alert('提示', res.errMsg);
        }
      }, (err) => { 
        Alert.alert('提示', '网络错误！');
      })
    } else {
      this.setState({
        RightdataSource: this.rightGoods[index]
      })
    }
  }

  addToCart(id) {
    CookieManager.get(global.url).then(cookie => {
      if (!!cookie) {
        Fetch(global.url + '/API/ProductDetail/joinCart', 'post', {
          count: 1,
          goodspecifications: id
        }, (responseData) => {
          if (responseData.success) {
            store.dispatch({ type: types.addShopingNum.ADDNUM, num: 1 });
            if (Platform.OS == 'android') {
              ToastAndroid.show('加入成功!', ToastAndroid.SHORT);
            } else {
              this.toast.show('加入成功!');
            }
          } else {
            this.toast.show(responseData.message);
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

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  }


  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  }

  getScreenXY(i, id) {
    // alert(id);
    // this.refs[i].measure((x, y, width, height, pageX, pageY) => {
    //   this.setState({
    //     right: new Animated.Value(deviceWidthDp - pageX - pxToDp(45 / 2)),
    //     top: new Animated.Value(pageY - pxToDp(45 / 2))
    //   }, () => { 
    //     this.animate();
    //     this.addToCart(id);
    //   })
    // })
    this.addToCart(id);
  }

  // 获取通知
  getNotify() {
    Fetch(global.url + '/api/Home/GetNotify', 'get', null, (res) => {
      if (typeof res == 'object' && res.result) {
        global.storage.load({
          key: 'notify'
        }).then(ret => {
          if (!ret || !ret.text || ret.text != res.data.notify.text) {
            this.setState({
              announce: res.data.notify.text
            }, () => {
              this.popupDialog.show();
              global.storage.save({
                key: 'notify',
                data: {
                  text: res.data.notify.text
                }
              });
            });
          }
        }).catch(err => {
          this.setState({
            announce: res.data.notify.text
          }, () => {
            this.popupDialog.show();
            global.storage.save({
              key: 'notify',
              data: {
                text: res.data.notify.text
              }
            });
          });
        });
      }
    }, (err) => { 
    })
  }

  onButtonPress() {
    this.popupDialog.dismiss();
  }
  componentWillMount() {
    this._panResponder = PanResponder.create({
      // 要求成为响应者：
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
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
  search() {
    const { navigate } = this.props.navigation;
    navigate('SearchGoods', { keyword: this.state.searchText });
  }
  //点击1级菜单
  goods1NameFn(dataSource, rowID) {
    let name=""
    for(let i=0;i<dataSource._dataBlob.s1.length;i++){
        if (i == rowID) {
          dataSource._dataBlob.s1[i].active = true
          name=dataSource._dataBlob.s1[i].name
        }else{
          dataSource._dataBlob.s1[i].active=false
        }
    }

    let newTabs = JSON.parse(JSON.stringify(dataSource._dataBlob.s1));
      this.setState({
        LeftdataSource: this.state.LeftdataSource.cloneWithRows(newTabs),
        selectName: name
      })
    this.getGoodsList(dataSource._dataBlob.s1[rowID].id, rowID);
  }
  //一级菜单的list渲染
  _renderRow1(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={() => { this.goods1NameFn(this.state.LeftdataSource, rowID) }}>
        <View style={[styles.goods1Name, rowData.active && styles.goods1NameActive]}>
          <Text style={rowData.active ?styles.goods1NameText1:styles.goods1NameText}>{rowData.name}</Text>
          <Text style={rowData.active ? styles.goods1NameTextLine : styles.goods1NameTextLine1}></Text>
        </View>
      </TouchableOpacity>
    );
  }
  //二级菜单的list渲染
  _renderRow2(item, index) {
    const { navigate } = this.props.navigation;
    let hasStock = this.hasStock(item)
    return (
      <View style={styles.rowGoods}>
        <TouchableOpacity onPress={() => {navigate('GoodsDetail', {id: item.id})}}>
          <Image style={styles.rowGoodsImg} source={{ uri: item.goodImg }} />
          <View style={hasStock? styles.hidden : styles.rowGoodsNoStock}>
            <Text style={styles.rowGoodsNoStockText}>售空</Text>
          </View>
        </TouchableOpacity>
        <View ><Text numberOfLines={1} style={styles.rowGoodsName}>{item.goodName}</Text></View>
        <View style={styles.rowGoodsMoneyAndAdd}>
          <View style={styles.rowGoodsMoney}><Text style={styles.rowGoodsSymbol}>¥</Text><Text style={styles.rowGoodsNum}>{item.price}</Text><Text style={styles.rowGoodsCompany}>/{item.specs[0].spec}</Text></View>
          <TouchableOpacity
            disabled={!hasStock}
            onPress={() => { this.getScreenXY(index, this.rightGoods[this.menuType][index].specs[0].id) }}
            style={styles.rowGoodsAdd} {...this._panResponder.panHandlers}>
            <Image style={styles.rowGoodsAddImg} source={hasStock ? require('../images/addGood.png') : require('../images/addGood2.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  _renderBanner(list) {
    return list.map(item => {
      return (
        <Image style={styles.banner} source={{ uri: item.imgUrl }}></Image>
      );
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const { showAlert, message } = this.state;

    return (
      <View style={styles.contenier}>  
        <ImageBackground style={styles.headerBackground} source={require('../images/headerBackground.png')} resizeMode='cover'>
          <View style={styles.header}>
            <TouchableOpacity style={styles.customerServiceBtn} onPress={() => {navigate('ServiceCenter')}}>
              <Image style={styles.customerServiceImg} source={require("../images/customerService.png")}></Image>
            </TouchableOpacity>
            <View style={styles.headerSearchWrap}>
              <Image style={styles.headerSearchImg} source={require("../images/search.png")}></Image>  
              <TextInput
                returnKeyType={"search"}
                style={styles.headerSearch}
                underlineColorAndroid={'transparent'}
                onChangeText={(text) => this.setState({ searchText: text })}
                onSubmitEditing={this.search.bind(this)}
                placeholder={'输入关键字直接搜索...'}
                placeholderTextColor={'#a6a6a6'}
              />
            </View>
            <TouchableOpacity style={styles.cartBtn} onPress={() => {navigate('Cart')}} >
              <Image style={styles.cartImg} source={require("../images/cart.png")}></Image>
              <View style={styles.cartNumWrap}><Text style={styles.cartNum}>{this.state.count}</Text></View>
            </TouchableOpacity> 
          </View>
        </ImageBackground>
        <View style={styles.wrapperWrap}>
          <Swiper style={styles.wrapper} activeDot={<View style={{backgroundColor:'#007aff', width: 20, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />} dot={<View style={{backgroundColor:'white', width: 20, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}  autoplay={true} >
            {this._renderBanner(this.state.banners)}
          </Swiper>
        </View>
        <View style={styles.goodsWrap} >
          <ListView 
            style={styles.goods1}  
            dataSource={this.state.LeftdataSource}
            renderRow={this._renderRow1.bind(this)}
          />
          <View style={styles.goods2}>
            <View style={styles.goods2Header}><Image style={styles.goods2HeaderImg1} source={require("../images/bubbleLeft.png")}></Image><Text style={styles.goods2HeaderText}>{this.state.selectName}</Text><Image style={styles.goods2HeaderImg2}  source={require("../images/bubbleRight.png")}></Image></View>  
              <FlatList 
                contentContainerStyle={styles.goods3}
                data={this.state.RightdataSource}
                renderItem={({ item, index }) => this._renderRow2(item, index)}
              />
          </View>  
        </View>
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
          show={showAlert}
          showProgress={false}
          title="提示"
          message={message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          confirmText="确定"
          confirmButtonColor="#29be87"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        <PopupDialog
          width={pxToDp(600)} 
          height={pxToDp(692)} 
          containerStyle={{zIndex: 1000}}
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
            <View>
              <Image style={styles.bulletImage} resizeMode="stretch" source={require("../images/bullet.png")}></Image>
            </View>
          <View style={styles.bullet}>
            <View style={styles.bulletTitle}><Text style={styles.bulletTitleText}>消息通知</Text></View>  
            <View style={styles.bulletContent}><Text style={styles.bulletContentText}>{this.state.announce}</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this)}>
              <Text
              style={styles.buttonText}  
              >知道了</Text>
            </TouchableOpacity>
          </View>
        </PopupDialog>
        <Toast ref={toast => {this.toast = toast;}} style={styles.toast} position="top" positionValue={410}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperWrap: {
    height: pxToDp(238)
  },
  slide: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    width: '100%',
    height: '100%'
  },
  contenier: {
    width: '100%',
    height: '100%'
  },
  hidden: {
    display: 'none'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  headerBackground: {
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
    flexDirection: 'row',
    paddingTop: pxToDp(17),
    paddingBottom: pxToDp(17),
    paddingLeft: pxToDp(12),
    paddingRight: pxToDp(12),
    height: pxToDp(96),
  },
  customerServiceBtn: {
    flexDirection: 'row',
    width: pxToDp(86),
    height: pxToDp(64),
    alignItems: "center",
    justifyContent: "center",
  },
  customerServiceImg: {
    width: pxToDp(45),
    height: pxToDp(45)
  },
  headerSearchWrap: {
    position: "relative",
    flex: 1,
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
  cartBtn: {
    position: 'relative',
    flexDirection: 'row',
    width: pxToDp(86),
    height: pxToDp(64),
    alignItems: "center",
    justifyContent: "center",
  },
  cartImg: {
    width: pxToDp(52),
    height: pxToDp(45)
  },
  cartNumWrap: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: pxToDp(40),
    height: pxToDp(24),
    backgroundColor: "#fd4448",
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  cartNum: {
    color: "white",
    fontSize: pxToDp(20),
  },
  pagination: {
    bottom: pxToDp(10)
  },
  goodsWrap: {
    flexDirection: 'row',
    backgroundColor: '#f4f4f4'
  },
  goods1: {
    width: pxToDp(176),
    height: scrrollHeight(pxToDp(504))
  },
  goods1Name: {
    width: "100%",
    height: pxToDp(93),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#daddde',
    backgroundColor: '#f4f4f4',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goods1NameText: {
    // textAlign:'center',
    fontSize: pxToDp(28),
    // textAlignVertical: 'center',
  },
  goods1NameText1: {
    // textAlign:'center',
    fontSize: pxToDp(28),
    color: '#11b57c'
  },
  goods1NameActive: {
    backgroundColor: 'white',
  },
  goods1NameTextLine: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: pxToDp(6),
    height: '100%',
    backgroundColor: '#11b57c',
  },
  goods1NameTextLine1: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: pxToDp(6),
    height: '100%',
    backgroundColor: 'white',
  },
  goods2: {
    width: pxToDp(576),
    height: scrrollHeight(pxToDp(242)),
    paddingLeft: pxToDp(24),
    backgroundColor: "white",
  },
  goods2Header: {
    height: pxToDp(98),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  goods2HeaderText: {
    marginLeft: pxToDp(15),
    marginRight: pxToDp(15)
  },
  goods2HeaderImg1: {
    width: pxToDp(40),
    height: pxToDp(25)
  },
  goods2HeaderImg2: {
    width: pxToDp(61),
    height: pxToDp(25)
  },
  goods2Bnner: {
    width: pxToDp(526),
    height: pxToDp(200),
    marginTop: pxToDp(28)
  },
  goods3: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: pxToDp(250)
  },
  rowGoods: {
    marginRight: pxToDp(8),
    width: pxToDp(268),
    borderWidth: pxToDp(2),
    borderColor: '#f4f4f4',
  },
  rowGoodsImg: {
    width: '100%',
    height: pxToDp(236),
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
  bullet: {
    height: pxToDp(570),
    alignItems: 'center'
  },
  bulletImage: {
    width: "100%",
    height: pxToDp(120)
  },
  bulletTitle: {
    marginTop: pxToDp(64),
    marginBottom: pxToDp(10),
    alignItems: "center"
  },
  bulletTitleText: {
    fontSize: pxToDp(40),
    color: "#333335"
  },
  bulletContent: {
    marginTop: pxToDp(20),
    width: pxToDp(430)
  },
  bulletContentText: {
    fontSize: pxToDp(28),
    color: '#99979a'
  },
  button: {
    position: 'absolute',
    bottom: pxToDp(80),
    width: pxToDp(334),
    height: pxToDp(84),
    borderRadius: pxToDp(30),
    backgroundColor: "#2abd89",
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: "white"
  },
  toast:{
    backgroundColor: '#626262'
  },
});
