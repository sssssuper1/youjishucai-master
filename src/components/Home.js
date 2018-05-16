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
  Button
} from 'react-native';
import pxToDp from '../js/pxToDp';
const deviceHeightDp = Dimensions.get('window').height;
const deviceWidthDp = Dimensions.get('window').width;
function scrrollHeight(uiElementHeight) {
  return deviceHeightDp-uiElementHeight;
}

type Props = {};
export default class Home extends Component<Props> {
  constructor(props) {
    super(props);
    //左边菜单
    var type1 = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //右边菜单  
    let type2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged:(s1,s2)=>r1 !== r2,
    });
    //初始化
    this.state = {
      showAlert: false,
      isBullet: false,
      bulletMessage: '我的世界',
      LeftdataSource: type1.cloneWithRows([]),
      RightdataSource: type2.cloneWithRows([]),
      selectName: '有机蔬菜',
      right: new Animated.Value(10),
      top: new Animated.Value(10),
      fadeAnim: new Animated.Value(0),
      cartNum: store.getState().count,
      message: '',
      rightGoods:[]
    }
    //菜单获取
    let manuUrl=global.url + '/api/home/initSgHome'
    Fetch(manuUrl, "post", {}, (responseData) => { 
      if (typeof responseData == 'object') {
        let LeftdataSource = responseData.data.map((item, index) => {
          let json = {
            active: false,
            name: item.name
          }
          if (index === 0) {
            json.active = true;
          }
          return json
        })
        let rightGoods = responseData.data.map((item, index) => {
          let array = [];
          let i = 0;
          for (i = 0; i < item.categorys.length;i++) { 
            let json = {
              id:item.categorys[i].id,
              img: item.categorys[i].img,
              name:item.categorys[i].name,
              money: item.categorys[i].id,
              company: '袋',
              isNull:false
            }
            array[i] = json;
          }
          return array;
        })
        this.setState({ LeftdataSource: type1.cloneWithRows(LeftdataSource), rightGoods: rightGoods, RightdataSource: type2.cloneWithRows(rightGoods[0]) }, () => { 
          this.popupDialog.show(() => {
            console.log('callback - will be called immediately')
          });
        })
      } else { 
        this.setState({ message: "数据格式不对或者出错" });
        this.showAlert()
      }
    }, (err) => { 
      this.setState({message: error.toString()})
      this.showAlert()
      })
  }
  showAlert = () => {
    this.setState({
      showAlert: true
    });
  }
  showBullet = () => {
    this.setState({
      isBullet: true
    });
  }
  hideBullet = () => {
    this.setState({
      isBullet: false
    });
  }
  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  }
  onButtonPress() {
    this.popupDialog.dismiss(() => {
      console.log('callback - will be called immediately')
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
        store.dispatch({ type: types.reduceShopingNum.REDUCENUM})
        this.setState({ right: new Animated.Value(deviceWidthDp-evt.nativeEvent.pageX-pxToDp(45/2)), top: new Animated.Value(evt.nativeEvent.pageY-pxToDp(45/2)) }, () => { 
          this.animate();
          // this.showAlert();
          this.setState({cartNum: store.getState().count, message: "数据格式不对或者出错" })
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
  //点击1级菜单
  goods1NameFn(dataSource, rowID) {
    let type2 = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged:(s1,s2)=>r1 !== r2,
    });
    let name=""
    for(let i=0;i<dataSource._dataBlob.s1.length;i++){
        if (i == rowID) {
          dataSource._dataBlob.s1[i].active = true
          name=dataSource._dataBlob.s1[i].name
        }else{
          dataSource._dataBlob.s1[i].active=false
        }
    }
    var newTabs = JSON.parse(JSON.stringify(dataSource._dataBlob.s1));
    this.setState({LeftdataSource:this.state.LeftdataSource.cloneWithRows(newTabs),selectName:name,RightdataSource:type2.cloneWithRows(this.state.rightGoods[rowID])})
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
  _renderRow2(rowData, sectionID, rowID) {
    return (
      <View style={styles.rowGoods}>
        <View >
          <Image style={styles.rowGoodsImg} source={require('../images/banner1.jpg')}/>
        </View>
        <View ><Text style={styles.rowGoodsName}>{rowData.name}</Text></View>
        <View style={styles.rowGoodsMoneyAndAdd}>
          <View style={styles.rowGoodsMoney}><Text style={styles.rowGoodsSymbol}>¥</Text><Text style={styles.rowGoodsNum}>{rowData.money}</Text><Text style={styles.rowGoodsCompany}>/{rowData.company}</Text></View>
          <View style={styles.rowGoodsAdd} {...this._panResponder.panHandlers}><Image style={styles.rowGoodsAddImg} source={require('../images/addGood.png')}/></View>
        </View>
      </View>
    );
  }
  render() {
    const { showAlert, message, isBullet, bulletMessage } = this.state;
    return (
      <View style={styles.contenier}>  
        <ImageBackground style={styles.header} source={require('../images/headerBackground.png')} resizeMode='cover'>
          <TouchableOpacity style={styles.customerServiceBtn} onPress={() => {alert(111) }}>
            <Image style={styles.customerServiceImg} source={require("../images/customerService.png")}></Image>
          </TouchableOpacity>
          <View style={styles.headerSearchWrap}>
            <Image style={styles.headerSearchImg} source={require("../images/search.png")}></Image>  
            <TextInput
              returnKeyType={"search"}
              style={styles.headerSearch}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({searchText:text})}
              placeholder={'有机大米'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View>
          <TouchableOpacity style={styles.cartBtn}>
            <Image style={styles.cartImg} source={require("../images/cart.png")}></Image>
            <View style={styles.cartNumWrap}><Text style={styles.cartNum}>{this.state.cartNum}</Text></View>
          </TouchableOpacity>  
        </ImageBackground>
        <View style={styles.wrapperWrap}>
          <Swiper style={styles.wrapper}  activeDot={<View style={{backgroundColor:'#007aff', width: 20, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />} dot={<View style={{backgroundColor:'white', width: 20, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}  autoplay={true} >
            <View style={styles.slide}>
              <Image style={styles.banner} source={require("../images/banner1.jpg")}></Image>
            </View>
            <View style={styles.slide}>
              <Image style={styles.banner} source={require("../images/banner1.jpg")}></Image>
            </View>
            <View style={styles.slide}>
              <Image style={styles.banner} source={require("../images/banner1.jpg")}></Image>
            </View>
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
              <ListView 
                contentContainerStyle={styles.goods3}
                dataSource={this.state.RightdataSource}
                renderRow={this._renderRow2.bind(this)}
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
          message={message}
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showConfirmButton={true}
          confirmText="知道了"
          confirmButtonColor="#DD6B55"
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
        <PopupDialog
          width={pxToDp(600)} 
          height={pxToDp(692)} 
            ref={(popupDialog) => { this.popupDialog = popupDialog; }}
          >
            <View>
              <Image style={styles.bulletImage} resizeMode="stretch" source={require("../images/bullet.png")}></Image>
            </View>
          <View style={styles.bullet}>
            <View style={styles.bulletTitle}><Text style={styles.bulletTitleText}>消息通知</Text></View>  
            <View style={styles.bulletContent}><Text style={styles.bulletContentText}>为了让公司员工过一个欢乐祥和的
              五一劳动节，现将我司放假时间通
              知如下：2018年4月29日至2018年
              5月1日放假，共3天（届时3天内订
              单将统一在2018年5月2日正式上班
              安排发出，敬请谅解.</Text>
            </View>
            <TouchableOpacity style={styles.button} onPress={this.onButtonPress.bind(this)}>
              <Text
              style={styles.buttonText}  
              >知道了</Text>
            </TouchableOpacity>
          </View>
        </PopupDialog>
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
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    paddingTop: pxToDp(17),
    paddingBottom: pxToDp(17),
    paddingLeft: pxToDp(12),
    paddingRight: pxToDp(12),
    height: pxToDp(100),
    backgroundColor: '#ff8b00'
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
    color: "white",
    borderRadius: 36,
    fontSize: pxToDp(20),
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
    lineHeight: pxToDp(93),
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
    height: scrrollHeight(242),
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
    flexWrap: 'wrap'
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
    width: pxToDp(430)
  },
  bulletContentText: {
    fontSize: pxToDp(28),
    color: '#99979a'
  },
  button: {
    marginTop: pxToDp(60),
    marginBottom: pxToDp(50),
    width: pxToDp(334),
    height: pxToDp(84),
    borderRadius: pxToDp(30),
    backgroundColor: "#2abd89",
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: "white"
  }
});
