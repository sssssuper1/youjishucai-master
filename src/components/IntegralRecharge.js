import React, { Component } from 'react';
import Fetch from '../js/fetch';
import wxPayVip from '../js/wxPayVip';
import aliPayVip from '../js/aliPayVip';
import Header1 from './Header1.js';
import store from '../store/index';
import PayPassword from './PayPassword';
import PopupDialog from 'react-native-popup-dialog';
import Toast from 'react-native-easy-toast';
import {
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class IntegralRecharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rechargeObject: 0,
      payNum: 0,
      inputAmount: '',
      isEnough: true,
      isConfirm: false,
      isSubmitting: false,
      inputPassword: false,
      balance: store.getState().balance,
      rechargeID: '',
      rechargePhone: '',
      uid: '',
      name: '',
      phone: ''
    }

    this.params = {};
  }

  changePaymentMethod(type) {
    this.setState({
      payNum: type
    })
  }

  openModal() {
    this.setState({
      inputPassword: true
    })
  }

  closeModal() {
    this.setState({
      inputPassword: false,
      isSubmitting: false
    })
  }

  changeAmount(text) {
    let num = Number(text);
    if (num == NaN || num < 0) return;
    if (num > this.state.balance) {
      if (this.state.payNum === 2) {
        this.setState({
          inputAmount: num,
          isEnough: false,
          payNum: 0
        });
      } else {
        this.setState({
          inputAmount: num,
          isEnough: false
        });
      }
    } else {
      this.setState({
        inputAmount: num,
        isEnough: true
      });
    }
  }

  pay() {
    if (this.state.inputAmount < 1) return;

    if (this.state.rechargeObject === 1) {
      if (!this.state.rechargeID) {
        this.refs.toast.show('请输入用户ID!');
        return;
      } 

      if (!this.state.rechargePhone) {
        this.refs.toast.show('请输入用户手机号末4位!');
        return;
      } 
    }

    if (this.state.inputAmount >= 5000) {
      this.popupShow();
    } else {
      this.recharge(false);
    }
  }

  popupShow() {
    this.popupDialog.show();
  }

  popupClose() {
    this.popupDialog.dismiss();
  }

  confirm() {
    this.setState({
      isConfirm: !this.state.isConfirm
    })
  }

  submit() {
    if (!this.state.uid) {
      this.refs.toast.show('请输入UID!');
      return;
    } 

    if (!this.state.name) {
      this.refs.toast.show('请输入昵称!');
      return;
    }

    if (!this.state.phone || this.state.phone.length != 4) {
      this.refs.toast.show('请输入手机号末4位!');
      return;
    }

    if (!this.state.isConfirm) {
      this.refs.toast.show('请确认此信息无误!');
      return;
    }

    this.popupClose();
    this.recharge(true);
  }

  skip() {
    this.popupClose();
    this.recharge(false);
  }

  recharge(hasExtend) {
    const url = '/api/Integral/pay';
    let params = {};

    if (hasExtend) {
      params = {
        money: this.state.inputAmount,
        appId: this.state.uid,
        appNickName: this.state.name,
        appMobile: this.state.phone
      }
    } else {
      params = {
        money: this.state.inputAmount
      }
    }

    if (this.state.rechargeObject === 1) {
      params.uid = this.state.rechargeID;
      params.mobile = this.state.rechargePhone;
    }

    this.setState({
      isSubmitting: true
    });

    switch (this.state.payNum) {
      case 0:
        params.payType = 'wx';
        wxPayVip(url, this.props.navigation, params, 2, () => this.setState({isSubmitting: false}));
        break;
      case 1:
        params.payType = 'ali';
        aliPayVip(params, this.props.navigation, url, 2, () => this.setState({isSubmitting: false}));
        break;
      case 2:
        params.payType = 'balance';
        this.params = params;
        this.openModal();
        break;
      default:
        break;
    }
  }

  balanceRecharge(payPwd) {
    let params = this.params;
    params.payPwd = payPwd;
    Fetch(global.url + '/api/Integral/pay', 'post', params, (res) => {
      if (res.result) {
        // this.refs.toast.show('充值成功!');
        // setTimeout(() => {
        //   this.props.navigation.navigate('Home', { selectedTab: 'my' });
        // }, 1500);
        this.props.navigation.navigate('PaySuccess', {
          payAmount: this.state.inputAmount,
          orderType: 2
        });
      } else {
        Alert.alert('提示', res.errMsg);
      }
      this.setState({
        isSubmitting: false
      });
    }, (err) => {
      Alert.alert('提示', err);
      this.setState({
        isSubmitting: false
      });
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header1 navigation={this.props.navigation} name="充值" />
        <View style={styles.rechargeTypeSelectArea}>
          <View style={styles.rechargeTypeSelect}>
            <TouchableOpacity style={styles.typeSelect} onPress={() => this.setState({rechargeObject: 0})}>
              <Text style={styles.textBlack}>为自己充值</Text>
              <Image style={styles.obSelect} source={this.state.rechargeObject === 0 ? require('../images/select.png') : require('../images/unchecked.png')} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.typeSelect} onPress={() => this.setState({rechargeObject: 1})}>
              <Text style={styles.textBlack}>帮他人充值</Text>
              <Image style={styles.obSelect} source={this.state.rechargeObject === 1 ? require('../images/select.png') : require('../images/unchecked.png')} />
            </TouchableOpacity>
          </View>
          <TextInput
            style={this.state.rechargeObject === 1 ? styles.phoneNumber : styles.hidden}
            keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : 'numeric'}
            underlineColorAndroid={'transparent'}
            returnKeyType={'done'}
            onChangeText={(text) => this.setState({rechargeID:text}) }
            placeholder={'他人用户ID号'}
            placeholderTextColor={'#a6a6a6'}
          />
          <TextInput
            maxLength={4}
            style={this.state.rechargeObject === 1 ? styles.phoneNumber : styles.hidden}
            keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : 'numeric'}
            underlineColorAndroid={'transparent'}
            returnKeyType={'done'}
            onChangeText={(text) => this.setState({rechargePhone:text}) }
            placeholder={'他人手机号末4位'}
            placeholderTextColor={'#a6a6a6'}
          />
        </View>
        <View style={[styles.tableContainer, styles.tableFill]}>
          <View style={styles.amountTitle}>
            <Text style={styles.textBlack}>充值金额</Text>
            <Text> (1元等于1积分)</Text>
          </View>
          <TextInput
            style={styles.inputField}
            keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : 'numeric'}
            underlineColorAndroid={'transparent'}
            onChangeText={(text) => this.changeAmount(text)}
          />
        </View>
        <View style={styles.tableContainer}>
          <TouchableOpacity style={styles.payment} onPress={()=>this.changePaymentMethod(0)}>
            <Image style={styles.payment1Img} source={require('../images/wechat.png')} />
            <Text style={styles.textBlack}>微信支付</Text>
            <Image style={styles.isSelect} source={this.state.payNum === 0 ? require('../images/select.png') : require('../images/unchecked.png')} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.payment} onPress={()=>this.changePaymentMethod(1)}>
            <Image style={styles.payment2Img} source={require('../images/alipay.png')}></Image>
            <Text style={styles.textBlack}>支付宝</Text>
            <Image style={styles.isSelect} source={this.state.payNum === 1 ? require('../images/select.png') : require('../images/unchecked.png')}></Image>
          </TouchableOpacity>
          <TouchableOpacity style={styles.payment} onPress={() => this.changePaymentMethod(2)} disabled={!this.state.isEnough}>
            <Image style={styles.payment2Img} source={this.state.isEnough ? require('../images/balance1.png') : require('../images/balance2.png')}></Image>
            <View>
              <Text style={this.state.isEnough ? styles.textBlack : styles.textGrey}>账户余额 (剩余: {this.state.balance})</Text>
              <Text style={this.state.isEnough ? styles.hidden : styles.textGrey}>金额不足</Text>
            </View>
            <View style={[styles.selectView, this.state.isEnough || styles.selectDisabled, this.state.payNum === 2 && styles.selectNoborder]}>
              <Image style={this.state.payNum === 2 && this.state.isEnough ? styles.selectIcon : styles.hidden} source={require('../images/select.png')}></Image>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.cellContainer}>
          <TouchableOpacity
            style={[styles.btn, this.state.isSubmitting ? styles.btnDisabled : styles.btnEnabled]}
            onPress={this.pay.bind(this)} disabled={this.state.isSubmitting}>
            <Text style={styles.btnText}>{this.state.isSubmitting ? '支付中' : '确认买单'}</Text>
          </TouchableOpacity>
        </View>
        <PopupDialog
          width={pxToDp(600)}
          height={pxToDp(690)}
          ref={(popupDialog) => { this.popupDialog = popupDialog; }}>
          <View style={styles.bullet}>
            <View style={styles.bulletHeader}>
              <TouchableOpacity style={styles.bulletSkip} onPress={this.skip.bind(this)}>
                <Text style={styles.buttonCancle}>跳过</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.bulletForm}>
              <View style={styles.bulletCell}>
                <Text style={styles.bulletCellText}>UID</Text>
                <TextInput
                  style={[styles.bulletCellInput, this.state.isConfirm ? styles.textGrey : styles.textBlack]}
                  underlineColorAndroid={'transparent'}
                  editable={!this.state.isConfirm}
                  value={this.state.uid}
                  onChangeText={(text) => this.setState({uid: text})}
                />
              </View>
              <View style={styles.bulletCell}>
                <Text style={styles.bulletCellText}>昵称</Text>
                <TextInput
                  style={[styles.bulletCellInput, this.state.isConfirm ? styles.textGrey : styles.textBlack]}
                  underlineColorAndroid={'transparent'}
                  editable={!this.state.isConfirm}
                  value={this.state.name}
                  onChangeText={(text) => this.setState({name: text})}
                />
              </View>
              <View style={styles.bulletCell}>
                <Text style={styles.bulletCellText}>手机号末4位</Text>
                <TextInput
                  style={[styles.bulletCellInput, this.state.isConfirm ? styles.textGrey : styles.textBlack]}
                  keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : 'numeric'}
                  underlineColorAndroid={'transparent'}
                  maxLength={4}
                  editable={!this.state.isConfirm}
                  value={this.state.phone}
                  onChangeText={(text) => this.setState({phone: text})}
                />
              </View>
              <View style={styles.bulletConfirm}>
                <TouchableOpacity style={styles.checkBox} onPress={this.confirm.bind(this)}>
                  <Image style={this.state.isConfirm ? styles.checkRight : styles.hidden} source={require('../images/checkBox.png') }/>
                </TouchableOpacity>
                <Text style={[styles.checkInfo, this.state.isConfirm ? styles.textBlack : styles.textGreen]}>确认此信息无误</Text>
              </View>
            </View>
            <View style={styles.buttonContent}>
              <TouchableOpacity style={styles.button} onPress={this.popupClose.bind(this)}>
                <Text style={styles.buttonCancle}>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, styles.buttonCut]} onPress={this.submit.bind(this)}>
                <Text style={styles.buttonConfirm}>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        </PopupDialog>
        <PayPassword visible={this.state.inputPassword} close={this.closeModal.bind(this)} submit={this.balanceRecharge.bind(this)} />
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
  rechargeTypeSelectArea: {
    marginTop: pxToDp(15),
    backgroundColor: '#ffffff',
  },
  rechargeTypeSelect: {
    paddingHorizontal: pxToDp(34),
    flexDirection: 'row',
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee'
  },
  typeSelect: {
    flex: 1,
    height: pxToDp(112),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: pxToDp(1),
    borderRightColor: '#eeeeee'
  },
  obSelect: {
    width: pxToDp(40),
    height: pxToDp(40),
    marginLeft: pxToDp(30)
  },
  phoneNumber:{
    height: pxToDp(106),
    backgroundColor:'white',
    paddingLeft: pxToDp(34),
    fontSize: pxToDp(32),
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee'
  },
  tableContainer: {
    marginTop: pxToDp(15),
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34),
    backgroundColor: 'white',
  },
  tableFill: {
    paddingTop: pxToDp(40),
    paddingBottom: pxToDp(30)
  },
  amountTitle: {
    flexDirection: 'row'
  },
  textBlack: {
    color: '#000000'
  },
  textGrey: {
    color: '#b0b0b0'
  },
  textGreen: {
    color: "#2abd89"
  },
  inputField: {
    color: '#2bbd89',
    fontSize: pxToDp(46),
    fontWeight: 'bold'
  },
  payment: {
    position: 'relative',
    height: pxToDp(112),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: pxToDp(2),
    borderBottomColor: '#eeeeee'
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
  selectView: {
    position: 'absolute',
    right: 0,
    width: pxToDp(41),
    height: pxToDp(41),
    borderWidth: pxToDp(2),
    borderColor: '#cccccc',
    borderRadius: pxToDp(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectDisabled: {
    backgroundColor: '#eeeeee',
  },
  selectNoborder: {
    borderColor: '#ffffff',
  },
  selectIcon: {
    width: pxToDp(40),
    height: pxToDp(40),
  },
  cellContainer: {
    paddingLeft: pxToDp(34),
    paddingRight: pxToDp(34),
    paddingTop: pxToDp(37),
    paddingBottom: pxToDp(37)
  },
  btn: {
    width: '100%',
    height: pxToDp(88),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: pxToDp(4)
  },
  btnEnabled: {
    backgroundColor: '#2abd89',
  },
  btnDisabled: {
    backgroundColor: '#d0d0d0'
  },
  btnText: {
    fontSize: pxToDp(32),
    color: 'white'
  },
  bullet: {
    // alignItems: 'center',
    padding: 0
  },
  bulletHeader: {
    height: pxToDp(100),
    borderTopLeftRadius: pxToDp(20),
    borderTopRightRadius: pxToDp(20),
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#f4f4f4'
  },
  bulletSkip: {
    height: pxToDp(100),
    width: pxToDp(140),
    alignItems: 'center',
    justifyContent: 'center'
  },
  bulletForm: {
    paddingTop: pxToDp(22),
    paddingHorizontal: pxToDp(58),
    paddingBottom: pxToDp(40)
  },
  bulletCell: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: '#eeeeee',
    borderBottomWidth: pxToDp(2),
    height: pxToDp(108)
  },
  bulletCellText: {
    fontSize: pxToDp(28),
    color: '#a9a9a9'
  },
  bulletCellInput: {
    flex: 1,
    marginLeft: pxToDp(12),
    fontSize: pxToDp(32)
  },
  bulletConfirm: {
    height: pxToDp(92),
    flexDirection: 'row',
    alignItems: 'center'
  },
  checkBox: {
    height: pxToDp(31),
    width: pxToDp(31),
    marginRight: pxToDp(15),
    borderWidth: pxToDp(2),
    borderColor: '#c2c2c2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkRight: {
    height: pxToDp(30),
    width: pxToDp(30)
  },
  checkInfo: {
    fontSize: pxToDp(30)
  },
  buttonContent: {
    height: pxToDp(100),
    width: '100%',
    flexDirection: 'row',
    backgroundColor: "white",
    borderTopWidth: pxToDp(1),
    borderTopColor: '#d9ddde',
  },
  button: {
    width: '50%',
    height: pxToDp(100),
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonCut: {
    borderLeftWidth: pxToDp(1),
    borderLeftColor: '#d9ddde',
  },
  buttonConfirm: {
    color: "#2abd89",
    fontSize: pxToDp(33),
  },
  buttonCancle: {
    color: "#000000",
    fontSize: pxToDp(33),
  },
  toast:{
    backgroundColor: '#626262'
  }
})