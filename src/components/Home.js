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
  ListView,
  Dimensions,
  Animated,
  Easing,
  ImageBackground,
  Alert,
  FlatList,
  SectionList,
  ToastAndroid,
  Modal
} from 'react-native';
import pxToDp from '../js/pxToDp';
import { CachedImage } from 'react-native-img-cache';
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
      right: new Animated.Value(10),
      top: new Animated.Value(10),
      fadeAnim: new Animated.Value(0),
      message: '网络错误!',
      count: 0,
      selectedName: '',
      selectedPrice: 0,
      selectedStock: 0,
      specId: 0,
      specs: [],
      banners: [],
      refreshing: false,
      selectionModelVisible: false
    }

    this.refsj = 0
    this.refsi = 0

    this._refs = []

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
          banners: responseData.data.banners,
          LeftdataSource: type1.cloneWithRows(LeftdataSource)
        });

        this.rightGoods = [];
        this.menuIndex = 0;
        this.menuType = responseData.data.categorys[0].id;

        for (let i = 0; i < responseData.data.categorys.length; i++) {
          this.rightGoods.push([]);
        }

        this.getGoodsList(responseData.data.categorys[0].id, 0);
      } else { 
        Alert.alert('提示', responseData.errMsg);
      }
    }, (err) => { 
      // Alert.alert('提示', '网络错误！');
    })

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        count: store.getState().count
      });
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

  getGoodsList(categoryId, index, isRresh = false) {
    if (isRresh) {
      this.setState({
        refreshing: true
      })
    }

    if (this.rightGoods[index].length == 0 || isRresh) {
      let params = {
        categoryId: categoryId,
        pageIndex: 0,
        pageSize: 10000
      }

      Fetch(global.url + '/api/home/getGoodsList', 'post', params, (res) => {
        if (typeof res == 'object' && res.success) { 
          this.rightGoods[index] = res.data.goods.slice(0);
          for (let i = 0; i < res.data.goods.length; i++) {
            this.rightGoods[index][i].data = [res.data.goods[i].categoryId];
            this.rightGoods[index][i].listSwitcher = true;
            this.rightGoods[index][i].sortNumber = i;
            this._refs.length === i && this._refs.push([]);
          }

          this.setState({
            RightdataSource: this.rightGoods[index],
          });
        } else { 
          Alert.alert('提示', res.errMsg);
        }

        if (isRresh) {
          this.setState({
            refreshing: false
          })
        }
      }, (err) => { 
        Alert.alert('提示', '网络错误！');
      })
    } else {
      this.setState({
        RightdataSource: this.rightGoods[index]
      });
    }
  }

  addToCart(id) {
    CookieManager.get(global.url).then(cookie => {
      if (!!cookie.userId) {
        Fetch(global.url + '/API/ProductDetail/joinCart', 'post', {
          count: 1,
          goodspecifications: id
        }, (responseData) => {
          if (responseData.success) {
            store.dispatch({ type: types.addShopingNum.ADDNUM, num: 1 });
            if (Platform.OS == 'android') {
              ToastAndroid.showWithGravity('加入成功!', ToastAndroid.SHORT, ToastAndroid.CENTER);
            } else {
              this.toast.show('加入成功!');
            }
          } else {
            if (Platform.OS == 'android') {
              ToastAndroid.showWithGravity(responseData.message, ToastAndroid.SHORT, ToastAndroid.CENTER);
            } else {
              this.toast.show(responseData.message);
            }
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

  getScreenXY(j, i, id) {
    this.addToCart(id);
    this._refs[j][i].measure((x, y, width, height, pageX, pageY) => {
      this.setState({
        selectionModelVisible: false,
        right: new Animated.Value(deviceWidthDp - pageX - pxToDp(45 / 2)),
        top: new Animated.Value(pageY - pxToDp(45 / 2))
      }, () => { 
        this.animate();
      })
    })
  }

  choseSpec(j, i, specs, name) {
    if (specs.length > 1) {
      this.refsj = j;
      this.refsi = i;
      this.setState({
        selectionModelVisible: true,
        specs: specs,
        selectedName: name,
        selectedPrice: specs[0].price,
        specId: specs[0].id,
        selectedStock: specs[0].stock
      })
    } else {
      this.getScreenXY(j, i, specs[0].id)
    }
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

  search() {
    const { navigate } = this.props.navigation;
    navigate('SearchGoods', { keyword: this.state.searchText });
  }

  goDetail(url) {
    const { navigate } = this.props.navigation;
    let urlRegular = /^http/
    let goodDetailRegular = /goodId=/i

    if (urlRegular.test(url)) {
      navigate('Artical', { url: url });
    } else if (goodDetailRegular.test(url)) {
      navigate('GoodsDetail', { id: url.replace(goodDetailRegular, '') });
    }
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
      LeftdataSource: this.state.LeftdataSource.cloneWithRows(newTabs)
    });
    this.menuIndex = rowID;
    this.menuType = dataSource._dataBlob.s1[rowID].id;
    this.getGoodsList(dataSource._dataBlob.s1[rowID].id, rowID);
  }

  //一级菜单的list渲染
  _renderRow1(rowData, sectionID, rowID) {
    return (
      <TouchableOpacity onPress={() => { this.goods1NameFn(this.state.LeftdataSource, rowID) }}>
        <View style={[styles.goods1Name, rowData.active && styles.goods1NameActive]}>
          <Text allowFontScaling={false} style={rowData.active ? styles.goods1NameText1:styles.goods1NameText}>{rowData.name}</Text>
          <Text style={rowData.active ? styles.goods1NameTextLine : styles.goods1NameTextLine1}></Text>
        </View>
      </TouchableOpacity>
    );
  }

  //flatList渲染
  _renderFlatList(listIndex, listSwitcher, data) {
    return (
      <FlatList 
        style={listSwitcher || styles.hidden}
        horizontal={false}
        numColumns={2}
        data={data}
        renderItem={({ item, index }) => this._renderRow2(listIndex, item, index)}
      />
    )
  }

  //二级菜单的list渲染
  _renderRow2(listIndex, item, index) {
    const { navigate } = this.props.navigation;
    let hasStock = this.hasStock(item)

    return (
      <View style={styles.rowGoods} key={index}>
        <TouchableOpacity style={styles.rowGoodsImgContainer} onPress={() => {navigate('GoodsDetail', {id: item.id})}}>
          <CachedImage style={styles.rowGoodsImg} source={{ uri: item.cover == null ? '' : item.cover}} />
          <View style={!hasStock || item.purchaseLimit > 0 ? styles.rowGoodsRemark : styles.hidden}>
            <Text style={styles.rowGoodsRemarkText}>{hasStock ? `限购${item.purchaseLimit}件` : '售空'}</Text>
          </View>
        </TouchableOpacity>
        <View><Text numberOfLines={1} style={styles.rowGoodsName}>{item.goodName}</Text></View>
        <View style={styles.rowGoodsMoneyAndAdd}>
          <View style={styles.rowGoodsMoney}>
            <Text style={styles.rowGoodsSymbol}>¥ {item.price}</Text>
            <Text style={styles.rowGoodsCompany}>/{item.specs[0].spec}</Text>
          </View>
          <TouchableOpacity
            disabled={!hasStock}
            ref={(r) => { this._refs[listIndex][index] = r }}
            onPress={() => this.choseSpec(listIndex, index, item.specs, item.goodName)}
            style={styles.rowGoodsAdd}>
            <Image style={styles.rowGoodsAddImg} source={hasStock ? require('../images/addGood.png') : require('../images/addGood2.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //二级菜单header渲染
  _renderRowHeader(index, title, listSwitcher, goods) {
    return (
      <View style={[styles.goods2Header, listSwitcher || styles.goods2HeaderBorder]}>
        <Image style={styles.goods2HeaderImg1} source={require("../images/bubbleLeft.png")}></Image>
        <Text style={styles.goods2HeaderText}>{title}</Text>
        <Image style={styles.goods2HeaderImg2} source={require("../images/bubbleRight.png")}></Image>
        <TouchableOpacity style={styles.listSwitch} onPress={() => this.switchList(index)}>
          <Image style={styles.switchImage} source={listSwitcher ? require("../images/listOpen.png") : require("../images/listClose.png")} />
        </TouchableOpacity>
      </View>
    );
  }

  switchList(index) {
    let tmp = this.state.RightdataSource;
    tmp[index].listSwitcher = !tmp[index].listSwitcher;
    this.setState({
      RightdataSource : tmp
    });
    this.rightGoods[this.menuIndex][index].listSwitcher = tmp[index].listSwitcher;
  }

  render() {
    const { navigate } = this.props.navigation;
    const { showAlert, message } = this.state;

    let swiper = (this.state.banners.map((item, index)=> {
      return (
        <TouchableOpacity
          key={item.imgUrl}
          onPress={() => this.goDetail(item.href)}
          style={{ flex: 1, justifyContent: 'center' }}>
          <Image style={styles.banner} source={{ uri: item.imgUrl }}></Image>
        </TouchableOpacity>
      )
    }));

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
              <View style={[styles.cartNumWrap, this.state.count > 9 ? styles.cartNumWrapLong : styles.cartNumWrapShort]}>
                <Text allowFontScaling={false} style={styles.cartNum}>{this.state.count}</Text>
              </View>
            </TouchableOpacity> 
          </View>
        </ImageBackground>
        <View style={styles.wrapperWrap}>
          <Swiper 
            key={this.state.banners.length}
            horizontal={true}
            showsPagination={true}
            activeDot={<View style={{backgroundColor:'#2abd89', width: 20, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: 3,}} />} 
            dot={<View style={{backgroundColor:'white', width: 20, height: 5,borderRadius: 4, marginLeft: 3, marginRight: 3, marginTop: 10, marginBottom: 3,}} />}
            autoplay={true}
            loop={true}>
            {swiper}
          </Swiper>
        </View>
        <View style={styles.goodsWrap} >
          <ListView 
            style={styles.goods1}  
            dataSource={this.state.LeftdataSource}
            renderRow={this._renderRow1.bind(this)}
          />
          <View style={styles.goods2}>
            <SectionList
              sections={this.state.RightdataSource}
              renderItem={({ section: {sortNumber, listSwitcher, goods } }) => this._renderFlatList(sortNumber, listSwitcher, goods)}
              renderSectionHeader={({ section: { sortNumber, categoryName, listSwitcher, goods } }) => this._renderRowHeader(sortNumber, categoryName, listSwitcher, goods)}
              onRefresh={this.getGoodsList.bind(this, this.menuType, this.menuIndex, true)}
              refreshing={this.state.refreshing}
              keyExtractor={(item) => String(item)}
              contentContainerStyle={styles.goods3}
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
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.state.selectionModelVisible}
          onRequestClose={() => this.setState({selectionModelVisible: false})}>
          <TouchableOpacity
            style={styles.specSelectModal}
            onPress={() => this.setState({ selectionModelVisible: false })}>
            <View style={styles.specModalContainer}>
              <View style={styles.specModalTitle}>
                <Text style={styles.specModalName}>{this.state.selectedName}</Text>
              </View>
              <View style={styles.specModalSelectTitle}>
                <Text style={styles.specModalSelectText}>规格:</Text>
              </View>
              <View style={styles.specModalSelector}>
                {this.state.specs.map((item, index) => 
                  <TouchableOpacity
                    style={[styles.specBtn, this.state.specId == item.id ? styles.specBtnSelected : styles.specBtnUnselected]}
                    onPress={() => this.setState({
                      specId: item.id,
                      selectedPrice: item.price,
                      selectedStock: item.stock
                    })}>
                    <Text style={this.state.specId == item.id ? styles.specTextSelected : styles.specTextUnselected}>{item.spec}</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.specModalSummary}>
                <Text style={styles.rowGoodsSymbol}>￥{this.state.selectedPrice}</Text>
                <TouchableOpacity
                  style={[styles.specModalBtn, this.state.selectedStock > 0 ? styles.specModalBtnEnable : styles.specModalBtnDisable]}
                  onPress={() => this.getScreenXY(this.refsj, this.refsi, this.state.specId)}>
                  <Text style={this.state.selectedStock > 0 ? styles.specModalBtnTextEnable : styles.specModalBtnTextDisable}>{this.state.selectedStock > 0 ? '加入购物车' : '售空'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        </Modal>
        <Toast ref={toast => {this.toast = toast;}} style={styles.toast} position="top" positionValue={410}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrapperWrap: {
    height: pxToDp(238),
    borderBottomColor: '#f1f1f1',
    borderBottomWidth: pxToDp(1),
    borderTopColor: '#f1f1f1',
    borderTopWidth: pxToDp(1)
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
    backgroundColor: "white",
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
    height: pxToDp(24),
    backgroundColor: "#fd4448",
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center"
  },
  cartNumWrapShort: {
    width: pxToDp(32),
  },
  cartNumWrapLong: {
    width: pxToDp(40),
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
    backgroundColor: '#f4f4f4',
  },
  goods2: {
    width: pxToDp(576),
    height: scrrollHeight(pxToDp(242)),
    paddingLeft: pxToDp(12),
    backgroundColor: "white",
  },
  goods2Header: {
    position: 'relative',
    height: pxToDp(98),
    paddingTop: pxToDp(12),
    marginRight: pxToDp(12),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff'
  },
  goods2HeaderBorder: {
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#f4f4f4',
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
  listSwitch: {
    width: pxToDp(80),
    height: pxToDp(90),
    position: 'absolute',
    right: pxToDp(0),
    justifyContent: 'center',
    alignItems: 'center'
  },
  switchImage: {
    width: pxToDp(28),
    height: pxToDp(28),
  },
  goods2Bnner: {
    width: pxToDp(526),
    height: pxToDp(200),
    marginTop: pxToDp(28)
  },
  goods3: {
    paddingBottom: pxToDp(250)
  },
  rowGoods: {
    marginRight: pxToDp(8),
    marginBottom: pxToDp(8),
    width: pxToDp(268),
    borderWidth: pxToDp(2),
    borderColor: '#f4f4f4',
  },
  rowGoodsImgContainer: {
    width: '100%',
    height: pxToDp(236)
  },
  rowGoodsImg: {
    width: '100%',
    height: pxToDp(236),
    marginBottom: pxToDp(18)
  },
  rowGoodsRemark: {
    position: 'absolute',
    paddingHorizontal: pxToDp(10),
    marginTop: pxToDp(10),
    marginRight: pxToDp(10),
    right: 0,
    top: 0,
    backgroundColor: '#ffae00'
  },
  rowGoodsRemarkText: {
    fontSize: pxToDp(20),
    color: '#ffffff'
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
    alignItems: 'baseline',
  },
  rowGoodsSymbol: {
    fontSize: pxToDp(26),
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
  button: {
    position: 'absolute',
    bottom: pxToDp(60),
    width: pxToDp(334),
    height: pxToDp(84),
    borderRadius: pxToDp(44),
    backgroundColor: "#2abd89",
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: "white"
  },
  specSelectModal: {
    backgroundColor: "rgba(0,0,0,0.3)",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  specModalContainer: {
    backgroundColor: '#ffffff',
    // alignItems: 'center',
    // justifyContent: 'center',
    padding: pxToDp(30),
    width: pxToDp(600),
    borderRadius: pxToDp(20)
  },
  specModalTitle: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  specModalName: {
    fontSize: pxToDp(34),
    color: '#000000'
  },
  specModalSelectTitle: {
    marginTop: pxToDp(40)
  },
  specModalSelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: pxToDp(20)
  },
  specBtn: {
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    marginRight: pxToDp(30),
    marginBottom: pxToDp(20),
    height: pxToDp(64),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDp(30)
  },
  specBtnSelected: {
    backgroundColor: '#2abd89'
  },
  specBtnUnselected: {
    backgroundColor: '#f4f4f4'
  },
  specModalSummary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: pxToDp(20),
    paddingTop: pxToDp(20),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#eeeeee'
  },
  specModalBtn: {
    paddingLeft: pxToDp(20),
    paddingRight: pxToDp(20),
    height: pxToDp(64),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: pxToDp(30),
    borderWidth: pxToDp(2)
  },
  specModalBtnEnable: {
    borderColor: '#2abd89'
  },
  specModalBtnDisable: {
    borderColor: '#d0d0d0'
  },
  specModalBtnTextEnable: {
    fontSize: pxToDp(28),
    color: '#2abd89'
  },
  specModalBtnTextDisable: {
    fontSize: pxToDp(28),
    color: '#d0d0d0'
  },
  specTextSelected: {
    fontSize: pxToDp(28),
    color: '#ffffff'
  },
  specTextUnselected: {
    fontSize: pxToDp(28),
    color: '#000000'
  },
  toast:{
    backgroundColor: '#626262'
  },
});
