import React, { Component } from 'react';
import Fetch from '../js/fetch'
import Header1 from './Header1.js'
import Fonter from './Fonter'
import Toast from 'react-native-easy-toast';
import {
  Platform,
  StyleSheet,
  View,
  Text,
  TextInput,
  Picker,
  TouchableHighlight,
  Alert
} from 'react-native';
import pxToDp from '../js/pxToDp';

export default class BankCard extends Component {
  constructor(props) {
    super(props);
    this.state={
      bankCardID: '',
      bankName: '',
      userName: '',
      defaultUserName: '',
      bankOfDeposit: '',
      defaultBankOfDeposit: '',

      bankList: [],
      IOSPickerShow: false
    }

    this.loadData();
  }

  submit() {
    if (this.state.bankCardID == '') {
      this.refs.toast.show('请输入银行卡号!');
      return;
    }

    if (this.state.bankOfDeposit == '') {
      this.refs.toast.show('请输入开户行!');
      return;
    }

    if (this.state.userName == '') {
      this.refs.toast.show('请输入收款人姓名!');
      return;
    }

    if (this.state.bankName == '') {
      this.refs.toast.show('请选择银行名称!');
      return;
    }

    this.setState({
      IOSPickerShow: false
    })

    const params = {
      bankNo: this.state.bankCardID,
      bankTrueName: this.state.userName,
      bank: this.state.bankName,
      bankOfDeposit: this.state.bankOfDeposit
    }

    Fetch(global.url + '/api/user/SaveBankInfo', 'post', params, (res) => {
      if (res.result) {
        this.refs.toast.show('银行卡绑定成功!');
      } else {
        this.refs.toast.show(res.errMsg);
      }
    }, (err) => {
      Alert.alert('提示', err);
    });
  }

  loadData() {
    Fetch(global.url + '/api/user/GetBankInfo', 'get', null, (res) => {
      if (res.result) {
        this.setState({
          bankCardID: res.data.bankNo,
          bankName: res.data.bank == '' ? res.data.banks[0] : res.data.bank,
          bankList: res.data.banks,
          userName: res.data.bankTrueName,
          defaultUserName: res.data.bankTrueName,
          bankOfDeposit: res.data.bankOfDeposit,
          defaultBankOfDeposit: res.data.bankOfDeposit
        });
      } else {
        Alert.alert('提示', res.errMsg);
      }
    })
  }

  togglePicker() {
    this.setState({
      IOSPickerShow: !this.state.IOSPickerShow
    })
  }
  
  render() {
    let picker;
    if (Platform.OS == 'android') {
      picker = 
      <View style={styles.passwordWrap}>
        <Picker
          mode={'dropdown'}
          style={styles.picker}
          selectedValue={this.state.bankName}
          onValueChange={(lang) => this.setState({bankName: lang})}>
          {
            this.state.bankList.map((item) => <Picker.Item label={item} value={item} />)
          }
        </Picker>
      </View>
    } else {
      picker =
      <View style={styles.pickerWrap}>
        <TouchableHighlight style={styles.pickerSwitcher} onPress={()=>this.togglePicker()}>  
          <Text style={styles.pickerText}>{this.state.bankName}</Text>
        </TouchableHighlight>     
        <Picker
          style={this.state.IOSPickerShow?styles.Picker2:styles.hidden}
          selectedValue={this.state.bankName}
          // itemStyle={styles.itempicker}
          onValueChange={(lang) => this.setState({bankName: lang})}>
          {
            this.state.bankList.map((item) => <Picker.Item label={item} value={item} />)
          }
        </Picker>
      </View>
    }
    return (
      <View style={styles.contenier}>
        <Header1 navigation={this.props.navigation} name="银行卡信息"></Header1>
        <View style={styles.margin}>
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.textWrap}
              keyboardType={Platform.OS == 'ios' ? 'numbers-and-punctuation' : 'numeric'}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({ bankCardID: text })}
              value={this.state.bankCardID}
              placeholder={'请输入银行卡号'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View> 
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.textWrap}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({ bankOfDeposit: text })}
              defaultValue={this.state.defaultBankOfDeposit}
              placeholder={'请输入开户行 (可电话联系当地银行查询)'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View> 
          <View style={styles.passwordWrap}>
            <TextInput
              style={styles.textWrap}
              underlineColorAndroid={'transparent'}
              onChangeText={(text) => this.setState({ userName: text })}
              defaultValue={this.state.defaultUserName}
              placeholder={'请输入收款人姓名'}
              placeholderTextColor={'#a6a6a6'}
            />
          </View> 
          {picker}
        </View>
        <View style={styles.fonter}> 
         <Fonter onPress={this.submit.bind(this)} name='确认' ></Fonter> 
        </View>
        <Toast ref="toast" style={styles.toast} position="top" positionValue={pxToDp(400)} />
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
  margin:{
    marginTop: pxToDp(14),
  },
  passwordWrap:{
    height: pxToDp(109),
    borderBottomWidth: pxToDp(1),
    paddingLeft: pxToDp(30),
    borderBottomColor: '#eeeeee',
    backgroundColor:'white'
  },
  pickerWrap: {
    backgroundColor:'white'
  },
  textWrap: {
    marginLeft: pxToDp(8),
    height: pxToDp(109),
    fontSize: pxToDp(33)
  },
  pickerSwitcher: {
    height: pxToDp(109),
    paddingLeft: pxToDp(38),
    justifyContent: 'center'
  },
  pickerText: {
    fontSize: pxToDp(33)
  },
  fonter:{
    margin: pxToDp(34),
  },
  picker: {
    flex: 1,
    fontSize: pxToDp(20),
    color: '#a9a9a9',
    height: pxToDp(109),
    backgroundColor:'white'
  },
  Picker2: {
    fontSize: pxToDp(20),
    // height: pxToDp(282),
    backgroundColor:'#ffffff'
  },
  toast:{
    backgroundColor: '#626262'
  },
});