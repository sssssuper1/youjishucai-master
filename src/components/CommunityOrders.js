import React, { Component } from 'react';
import Fetch from '../js/fetch'
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ImageBackground,
  Alert,
  FlatList
} from 'react-native';
import Toast from 'react-native-easy-toast';
import pxToDp from '../js/pxToDp';
import Header1 from './Header1';

export default class CommunityOrders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderType: global.data.user.hasStore ? 0 : 1,
      isCompany: global.data.user.hasStore,
      bussinessData: [],
      personalData: []
    }

    this.loadData();
  }

  loadData() {
    if (this.state.orderType === 0 && this.state.bussinessData.length == 0) {
      Fetch(global.url + '/api/store/GetRecords', 'get', null, (res) => {
        if (res.result) {
          this.setState({
            bussinessData: res.data.list
          })
        } else {
          Alert.alert('提示', res.errMsg);
        }
      }, (err) => {
        Alert.alert('提示', err)
      })
    } else if (this.state.orderType === 1 && this.state.personalData.length == 0){
      Fetch(global.url + '/api/Integral/GetList?pageIndex=0&pageSize=10000&type=店铺消费', 'get', null, (res) => {
        if (res.result) {
          this.setState({
            personalData: res.data.list
          })
        } else {
          Alert.alert('提示', res.errMsg);
        }
      }, (err) => {
        Alert.alert('提示', err)
      })
    }
  }

  changeType(type) {
    this.setState({
      orderType: type
    },() => this.loadData());
  }

  cancelOrder(id) {
    const params = {
      id: id
    };
    
    Fetch(global.url + '/api/store/Cancel', 'post', params, (res) => {
      if (res.result) {
        this.refs.toast.show('订单退款成功!');

        this.loadData();
      } else {
        Alert.alert('提示', res.errMsg);
      }
    }, (err) => {
      Alert.alert('提示', err);
    })
  }

  _renderBussinessOrder(item, index) {
    return (
      <View style={styles.orderCell} key={index}>
        <View style={styles.orderTitle}>
          <View style={styles.hidden}>
            <Text style={[styles.font24, styles.textGrey]}>订单号  </Text>
            <Text style={[styles.font24, styles.textBlack]}>{item.orderNo}</Text>
          </View>
          <Text allowFontScaling={false} style={[styles.font24, item.stateStr == '退款中' ? styles.textRed : styles.textGrey]}>{item.stateStr}</Text>
        </View>
        <View style={styles.orderInfo}>
          <View style={styles.orderTextContent}>
            <Text allowFontScaling={false} style={[styles.font28, styles.textBlack]}>{item.customerName}</Text>
            <Text allowFontScaling={false} style={[styles.font24, styles.textGrey]}>联系方式: {item.customerPhone}</Text>
            <Text allowFontScaling={false} style={[styles.font24, styles.textGrey]}>付款时间: {item.createTime}</Text>
            <Text allowFontScaling={false} style={[styles.font24, styles.textGrey]}>付款方式: {item.type}</Text>
          </View>
          <View style={styles.orderSummary}>
            <TouchableOpacity style={styles.orderControl} onPress={this.cancelOrder.bind(this, item.id)}>
              <Text allowFontScaling={false} style={styles.orderBtnText}>订单退款</Text>
            </TouchableOpacity>
            <View style={styles.flexRow}>
              <Text allowFontScaling={false} style={[styles.font28, styles.textBlack]}>消费: </Text>
              <Text allowFontScaling={false} style={[styles.amount, styles.textRed]}>{Math.abs(item.integral)}</Text>
            </View>
          </View>
        </View>  
      </View>
    )
  }

  _renderPersonalOrder(item, index) {
    const { navigate } = this.props.navigation;
    let bg;
    switch (item.store.categoryName) {
      case '牛享吧':
        bg = require('../images/a-niu.png');
        break;
      case '康养中心':
        bg = require('../images/a-kangyang.png');
        break;
      case '共享商家':
        bg = require('../images/a-gongxiang.png');
        break;
      default:
        bg = require('../images/a-gongxiang.png');
        break;
    }
    return (
      <View style={styles.orderCell} key={index}>
        <View style={styles.orderTitle}>
          <View style={styles.hidden}>
            <Text style={[styles.font24, styles.textGrey]}>订单号  </Text>
            <Text style={[styles.font24, styles.textBlack]}>{item.orderNo}</Text>
          </View>
          <Text allowFontScaling={false} style={[styles.font24, styles.textGrey]}>{item.stateStr}</Text>
        </View>
        <View style={styles.orderInfo}>
          <View style={styles.flexRow}>
            <ImageBackground style={styles.orderInfoImageBg} source={bg} resizeMode='cover'>
              <Image style={styles.orderInfoImage} source={{uri: item.store.storeLogo}} />
            </ImageBackground>
            <View style={styles.orderTextContent}>
              <TouchableOpacity style={styles.shopLink} onPress={() => navigate('ShopDetail', {id: item.store.storeId, type: item.store.categoryName})}>
                <Text allowFontScaling={false} style={[styles.font28, styles.textBlack]}>{item.store.storeName}</Text>
                <Image style={styles.rightDir} source={require('../images/rightDir.png')} />
              </TouchableOpacity>
              <Text allowFontScaling={false} style={[styles.font24, styles.textGrey]}>付款时间: {item.createTime}</Text>
              <Text allowFontScaling={false} style={[styles.font24, styles.textGrey]}>付款方式: {item.payType}</Text>
            </View>
          </View>
          <View style={styles.orderAmountContainer}>
            <View style={styles.flexRow}>
              <Text allowFontScaling={false} style={[styles.font28, styles.textBlack]}>消费: </Text>
              <Text allowFontScaling={false} style={[styles.amount, styles.textRed]}>{Math.abs(item.integral)}</Text>
            </View>
          </View>
        </View>  
      </View>
    )
  }

  render() {
    const typeSelector = this.state.isCompany ?
      <View style={styles.orderType}>
        <TouchableOpacity style={styles.orderTypeBtn} onPress={() => this.changeType(0)}>
          <View style={styles.leftFill} />
          <Text style={[styles.orderTypeText, this.state.orderType === 0 ? styles.orderTypeSelected : styles.textBlack]}>商家收款</Text>
          <View style={styles.rightFill} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.orderTypeBtn} onPress={() => this.changeType(1)}>
          <Text style={[styles.orderTypeText, this.state.orderType === 1 ? styles.orderTypeSelected : styles.textBlack]}>个人消费</Text>
        </TouchableOpacity>
      </View> : null;
    
    const bussinessOrders = this.state.isCompany ?
      <FlatList
        style={this.state.orderType === 0 || styles.hidden}
        data={this.state.bussinessData}
        renderItem={({item, index}) => this._renderBussinessOrder(item, index)}
      /> : null;
    const personalOrders =
      <FlatList
        style={this.state.orderType === 1 || styles.hidden}
        data={this.state.personalData}
        renderItem={({item, index}) => this._renderPersonalOrder(item, index)}
      />;
    const blankView =
      <View style={this.state.orderType === 0 && this.state.bussinessData.length === 0
        || this.state.orderType === 1 && this.state.personalData.length === 0 ? styles.stateBlank : styles.hidden}>
        <View style={styles.stateImgWrap}>
          <Image style={styles.stateImg} source={require('../images/noOrder.png')}></Image>
        </View>
        <View style={styles.stateShow}><Text style={styles.stateShowText}>您还没有相关记录</Text></View>
      </View>;
    return (
      <View style={styles.container}>
        <Header1 navigation={this.props.navigation} name={'社群消费'} />
        {typeSelector}
        {blankView}
        {bussinessOrders}
        {personalOrders}
        <Toast ref="toast" style={styles.toast} position="top" positionValue={pxToDp(400)} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%'
  },
  hidden: {
    display: 'none'
  },
  flexRow: {
    flexDirection: 'row'
  },
  orderTextContent: {
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  shopLink: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightDir: {
    width: pxToDp(11),
    height: pxToDp(22),
    marginLeft: pxToDp(13)
  },
  font24: {
    fontSize: pxToDp(24),
    lineHeight: pxToDp(38)
  },
  font28: {
    fontSize: pxToDp(28),
    lineHeight: pxToDp(42)
  },
  textBlack: {
    color: '#000000'
  },
  textGrey: {
    color: '#a2a2a2'
  },
  textGreen: {
    color: '#2abd89'
  },
  textRed: {
    color: '#ff0036'
  },
  orderType: {
    backgroundColor: '#ffffff',
    borderTopColor: '#daddde',
    borderTopWidth: pxToDp(1),
    flexDirection: 'row',
    justifyContent: 'space-around',
    // paddingVertical: pxToDp(25)
  },
  orderTypeBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftFill: {
    flex: 1,
  },
  rightFill: {
    flex: 1,
    height: pxToDp(48),
    borderRightColor: '#daddde',
    borderRightWidth: pxToDp(1),
  },
  orderTypeText: {
    paddingHorizontal: pxToDp(14),
    paddingVertical: pxToDp(28),
    fontSize: pxToDp(28)
  },
  orderTypeSelected: {
    borderBottomColor: '#2abd89',
    borderBottomWidth: pxToDp(2),
    color: '#2abd89'
  },
  orderCell: {
    marginTop: pxToDp(15),
    backgroundColor: '#ffffff'
  },
  orderTitle: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: pxToDp(26),
    height: pxToDp(80),
    borderBottomColor: '#daddde',
    borderBottomWidth: pxToDp(1)
  },
  orderInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: pxToDp(26),
    paddingVertical: pxToDp(32)
  },
  orderInfoImageBg: {
    width: pxToDp(140),
    height: pxToDp(98),
    marginRight: pxToDp(30),
    marginTop: pxToDp(10)
  },
  orderInfoImage: {
    width: pxToDp(140),
    height: pxToDp(98),
  },
  orderSummary: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  orderAmountContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  orderControl: {
    height: pxToDp(64),
    borderRadius: pxToDp(32),
    paddingHorizontal: pxToDp(26),
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#daddde',
    borderWidth: pxToDp(2)
  },
  orderBtnText: {
    color: '#818181',
    fontSize: pxToDp(28)
  },
  amount: {
    fontSize: pxToDp(30),
    fontWeight: 'bold'
  },
  stateBlank: {
    width: '100%',
    height: pxToDp(537),
    alignItems: 'center',
    justifyContent: 'center'
  },
  stateImgWrap: {
    marginTop: pxToDp(60)
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
  }
})
