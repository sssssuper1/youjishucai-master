import React, { Component } from 'react';
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
import AwesomeAlert from 'react-native-awesome-alerts';
import store from '../store/index';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  FlatList
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class IntegralRecord extends Component {
  constructor(props) {
    super(props);
    this.isLoad = false;
    this.state = {
      dataSource: [],
      showAlert: false,
      intergral: store.getState().integral
    };

    this.loadData();

    this.unsubscribe = store.subscribe(() => {
      this.setState({
        integral: store.getState().integral
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  loadData() {
    this.isLoad = true;

    Fetch(global.url + '/api/Integral/GetList?pageIndex=0&pageSize=10000', 'get', null,
      (responseData) => {
        this.isLoad = false;
        if (responseData.result) {
          this.setState({
            dataSource: responseData.data.list,
            integral: responseData.data.integral
          })
          this.hideAlert();
        }
      },
      (err) => {
        this.hideAlert();
        Alert.alert('提示',err);
      }
    );

    setTimeout(() => {
      if (this.isLoad) {
        this.setState({
          showAlert: true
        })
      }
    }, 1500);
  }

  hideAlert() {
    this.setState({
      showAlert: false
    });
  }

  _renderRow(item, index) {
    return (
      <View style={styles.goods1} key={index}>
        <View style={styles.order}>
          <Text allowFontScaling={false} style={styles.orderText}>订单号</Text>
          <Text allowFontScaling={false} style={styles.orderNum}>{item.orderNo != '' ? item.orderNo : '无'}</Text>
          <Text allowFontScaling={false} style={styles.state}>{item.createTime}</Text>
        </View>
        <View style={styles.orderSum}>
          <Text allowFontScaling={false} style={styles.orderRemark}>{item.remark}</Text>
          <View>
            <Text allowFontScaling={false} style={item.integral >= 0 ? styles.plus : styles.reduce}>{item.integral >= 0 ? '+' : ''}{item.integral}</Text>
            <Text allowFontScaling={false} style={styles.integralState}>{item.currentIntegral}</Text>
          </View>
        </View>
      </View> 
    );
  }
  render() {
    const { state } = this.state;
    const { navigate } = this.props.navigation;

    let view;
    if (this.state.dataSource.length > 0) {
      view =
      <FlatList 
        data={this.state.dataSource}
        renderItem={({ item, index }) =>this._renderRow(item, index)}
      />
    } else if(!this.state.showAlert && !this.isLoad) {
      view =
        <View style={styles.stateBlank}>
          <View style={styles.stateImgWrap}>
            <Image style={styles.stateImg} source={require('../images/noOrder.png')}></Image>
          </View>
          <View style={styles.stateShow}><Text style={styles.stateShowText}>您还没有相关记录</Text></View>
        </View>;
    }
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="积分"></Header1>
        <View style={styles.header}>
          <View>
            <Text style={styles.integralTitle}>当前积分:</Text>
            <Text style={styles.integralSum}>{this.state.intergral.toFixed(2)}</Text>
          </View>
          <TouchableOpacity style={styles.rechargeBtn} onPress={() => navigate('IntegralRecharge')}>
            <Text style={styles.rechargeText}>充值</Text>
          </TouchableOpacity>
        </View>
          {view}
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
  hidden: {
    display: 'none'
  },
  header: {
    backgroundColor: '#2abd89',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: pxToDp(44),
    paddingBottom: pxToDp(44),
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26)
  },
  integralTitle: {
    fontSize: pxToDp(30),
    color: '#ffffff'
  },
  integralSum: {
    fontSize: pxToDp(46),
    fontWeight: 'bold',
    color: '#ffffff'
  },
  rechargeBtn: {
    width: pxToDp(167),
    height: pxToDp(64),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: pxToDp(2),
    borderColor: '#ffffff',
    borderRadius: pxToDp(32)
  },
  rechargeText: {
    color: '#ffffff',
    fontSize: pxToDp(30)
  },
  goods1:{
    marginTop: pxToDp(15),
    backgroundColor: 'white',
  },
  list: {
    paddingLeft: pxToDp(26),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee',
    height: pxToDp(240)
  },
  order: {
    position: 'relative',
    height: pxToDp(79),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#eeeeee',
    backgroundColor: 'white',
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26)
  },
  orderText: {
    fontSize: pxToDp(24),
    color: '#a2a2a2'
  },
  orderNum: {
    marginLeft: pxToDp(12),
    fontSize: pxToDp(24),
    color: '#2b2b2b'
  },
  state: {
    position: 'absolute',
    fontSize: pxToDp(24),
    right: pxToDp(26),
    color: '#a2a2a2',
  },
  orderSum: {
    position: 'relative',
    height: pxToDp(103),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: pxToDp(2),
    borderTopColor: '#f1f1f1',
    backgroundColor: 'white',
    paddingLeft: pxToDp(26),
    paddingRight: pxToDp(26)
  },
  orderRemark: {
    fontSize: pxToDp(30),
    color: '#000000'
  },
  plus: {
    fontSize: pxToDp(36),
    fontWeight: 'bold',
    color: '#fe0036'
  },
  reduce: {
    fontSize: pxToDp(36),
    fontWeight: 'bold',
    color: '#15b97d'
  },
  integralState: {
    fontSize: pxToDp(24),
    color: '#a2a2a2',
    textAlign: 'right'
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
});
