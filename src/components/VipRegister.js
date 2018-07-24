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
import Header1 from './Header1'
import AwesomeAlert from 'react-native-awesome-alerts';
import PopupDialog from 'react-native-popup-dialog';
import Toast from 'react-native-easy-toast';
import MyTextInput from './MyTextInput';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
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
import citysWrap from '../json/citys.json'

export default class VipRegister extends Component {
  constructor(props) {
    super(props);

    this.state={
      provinces: this.provinces(citysWrap),
      citys: this.citys(citysWrap,this.provinces(citysWrap)[0]),
      area: this.area(citysWrap,this.provinces(citysWrap)[0],this.citys(citysWrap,this.provinces(citysWrap)[0])[0]),
      selectedProvinces: citysWrap.provinces[0].name,
      selectedCitys: citysWrap.provinces[0].City[0].name,
      selectedArea: citysWrap.provinces[0].City[0].Area[0].name,
      detailAddress: '',
      name: '',
      ID: '',
      referee: '',
      pickerNum: 0
    }
  }
  togglePicker(num){
    if (num === this.state.pickerNum) {
      this.setState({
        pickerNum: 0
      });
    } else {
      this.setState({
        pickerNum: num
      });
    }
  }
  provinces(citysWrap){
    if(!citysWrap){
      Alert.alert('提示','请传入地区数据')
    }
    let provinces=[]
    for(let i=0;i<citysWrap.provinces.length;i++){
        provinces.push(citysWrap.provinces[i].name)
    }
    return provinces
  }
  citys(citysWrap,provinces){
     if(!citysWrap){
      Alert.alert('提示','请传入地区数据')
    }
    if(!provinces){
      Alert.alert('提示','请传入显示的省份')
    }
    let citys=[]
      for(let i=0;i<citysWrap.provinces.length;i++){
        if(citysWrap.provinces[i].name==provinces){
          for(let j=0;j<citysWrap.provinces[i].City.length;j++){
              citys.push(citysWrap.provinces[i].City[j].name)
          }
        }
      }
      return citys
  }
  area(citysWrap,provinces,citys){
      if(!citysWrap){
        Alert.alert('提示','请传入地区数据')
      }
      if(!provinces){
        Alert.alert('提示','请传入显示的省份')
      }
      if(!citys){
        Alert.alert('提示','请传入显示的城市')
      }
     let area=[]
      for(let i=0;i<citysWrap.provinces.length;i++){
        if(citysWrap.provinces[i].name==provinces){
          for(let j=0;j<citysWrap.provinces[i].City.length;j++){
              if(citysWrap.provinces[i].City[j].name==citys){
                 for(let k=0;k<citysWrap.provinces[i].City[j].Area.length;k++){
                     area.push(citysWrap.provinces[i].City[j].Area[k].name)    
                 }
              }
          }
        }
      }
      return area
  }
  submit() {
    // check input
    if (this.state.name == '') {
      this.refs.toast.show('请输入姓名!');
      return;
    }

    if (this.state.ID == '') {
      this.refs.toast.show('请输入身份证号!');
      return;
    }

    if (this.state.selectedProvinces == '') {
      this.refs.toast.show('请选择所在省!');
      return;
    }

    if (this.state.selectedCitys == '') {
      this.refs.toast.show('请选择所在市!');
      return;
    }

    if (this.state.selectedArea == '') {
      this.refs.toast.show('请选择所在区!');
      return;
    }

    if (this.state.detailAddress == '') {
      this.refs.toast.show('请输入详细地址!');
      return;
    }
    
    this.props.navigation.navigate('PayToVip');
  }
  render() {
    let pickers;
    if (Platform.OS == 'android') {
      pickers = 
      <View style={styles.user}>
        <View style={styles.PickerWrap}>  
          <Text style={styles.PickerTitle}>所在省：</Text>
          <Picker
            mode={'dropdown'}
            style={styles.Picker}
            itemStyle={styles.itempicker} 
            selectedValue={this.state.selectedProvinces}
            onValueChange={(lang) => this.setState({selectedProvinces: lang,citys:this.citys(citysWrap,lang),area:this.area(citysWrap,lang,this.citys(citysWrap,lang)[0])})}>
            {
              this.state.provinces.map((item)=>  <Picker.Item label={item} value={item} />)
            }
          </Picker>
        </View>
        <View style={styles.PickerWrap}>  
          <Text style={styles.PickerTitle}>所在市：</Text>
          <Picker
            mode={'dropdown'}
            style={styles.Picker}
            selectedValue={this.state.selectedCitys}
            itemStyle={styles.itempicker} 
            onValueChange={(lang) => this.setState({selectedCitys: lang,area:this.area(citysWrap,this.state.selectedProvinces,lang)})}>
            {
              this.state.citys.map((item)=>  <Picker.Item label={item} value={item} />)
            }
          </Picker>
        </View>
        <View style={styles.PickerWrap}>  
          <Text style={styles.PickerTitle}>所在区：</Text>
          <Picker
            mode={'dropdown'}
            style={styles.Picker}
            selectedValue={this.state.selectedArea}
            itemStyle={styles.itempicker}
            onValueChange={(lang) => this.setState({selectedArea: lang})}>
            {
              this.state.area.map((item)=>  <Picker.Item label={item}   value={item} />)
          }
          </Picker>
        </View>
        <View style={styles.PickerWrap}>  
          <Text style={styles.PickerTitle}>详细地址：</Text>
          <MyTextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            placeholder={'街道、楼牌号'}
            onChangeText={(text) => this.setState({detailAddress:text})}
            value={this.state.detailAddress}
          /> 
        </View>
      </View>  
    } else {
      pickers = 
      <View style={styles.user}>
        <TouchableHighlight onPress={()=>this.togglePicker(1)}>  
          <View style={styles.PickerWrap}>
            <Text style={styles.PickerTitle}>所在省：</Text>
            <Text>{this.state.selectedProvinces}</Text>
          </View>
        </TouchableHighlight>
        <Picker
          style={this.state.pickerNum===1?styles.Picker2:styles.hidden}
          itemStyle={styles.itempicker} 
          selectedValue={this.state.selectedProvinces}
          onValueChange={(lang) => this.setState({
            selectedProvinces: lang,
            selectedCitys: this.citys(citysWrap,lang)[0],
            citys:this.citys(citysWrap,lang),
            selectedArea: '',
            area:this.area(citysWrap,lang,this.citys(citysWrap,lang)[0])})}>
          {
            this.state.provinces.map((item) =>  <Picker.Item label={item} value={item} />)
          }
        </Picker>
        <TouchableHighlight onPress={()=>this.togglePicker(2)}>
          <View style={styles.PickerWrap}>
            <Text style={styles.PickerTitle}>所在市：</Text>
            <Text>{this.state.selectedCitys}</Text>
          </View>
        </TouchableHighlight>
        <Picker
          style={this.state.pickerNum===2?styles.Picker2:styles.hidden}
          selectedValue={this.state.selectedCitys}
          itemStyle={styles.itempicker} 
          onValueChange={(lang) => this.setState({
            selectedCitys: lang,
            selectedArea: '',
            area:this.area(citysWrap,this.state.selectedProvinces,lang)})}>
          {
            this.state.citys.map((item)=>  <Picker.Item label={item} value={item} />)
          }
        </Picker>
        <TouchableHighlight onPress={()=>this.togglePicker(3)}>  
          <View  style={styles.PickerWrap}>
            <Text style={styles.PickerTitle}>所在区：</Text>
            <Text>{this.state.selectedArea}</Text>
          </View>
        </TouchableHighlight>     
        <Picker
          style={this.state.pickerNum===3?styles.Picker2:styles.hidden}
          selectedValue={this.state.selectedArea}
          itemStyle={styles.itempicker}
          onValueChange={(lang) => this.setState({selectedArea: lang})}>
          {
            this.state.area.map((item)=>  <Picker.Item label={item}   value={item} />)
          }
        </Picker>
        <View style={styles.PickerWrap}>  
          <Text style={styles.PickerTitle}>详细地址：</Text>
          <MyTextInput
            underlineColorAndroid={'transparent'}
            style={styles.detailAddress}
            placeholder={'街道、楼牌号'}
            onChangeText={(text) => this.setState({detailAddress:text})}
            value={this.state.detailAddress}
          /> 
        </View>
      </View> 
    }

    return (
      <View style={styles.contenier}>  
        <Header1 navigation={this.props.navigation} name="vip会员注册"></Header1>
        <ScrollView keyboardShouldPersistTaps={'handled'}>
          <View style={styles.user}>
            <View style={styles.PickerWrap}>  
              <Text style={styles.PickerTitle}>姓名：</Text>
              <MyTextInput
                underlineColorAndroid={'transparent'}
                style={styles.detailAddress}
                placeholder={''}
                onChangeText={(text) => this.setState({name:text})}
                value={this.state.name}
              /> 
            </View>
            <View style={styles.PickerWrap}>  
              <Text style={styles.PickerTitle}>身份证：</Text>
              <MyTextInput
                underlineColorAndroid={'transparent'}
                style={styles.detailAddress}
                placeholder={''}
                onChangeText={(text) => this.setState({ID:text})}
                value={this.state.ID}
              /> 
            </View>
          </View>
          {pickers}
          <View style={styles.userBm}>
            <View style={styles.PickerWrap}>
              <Text style={styles.PickerTitle}>邀请人：</Text>
              <MyTextInput
                underlineColorAndroid={'transparent'}
                style={styles.detailAddress}
                placeholder={'选填'}
                onChangeText={(text) => this.setState({referee:text})}
                value={this.state.referee}
                editable={true}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity style={styles.save} onPress={this.submit.bind(this)}>
            <Text style={styles.saveText}>保存</Text>
        </TouchableOpacity>
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
  header:{
    height: pxToDp(96),
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: pxToDp(36),
    color: '#020202'
  },
  user:{
    marginTop: pxToDp(14),
  },
  userBm:{
    marginTop: pxToDp(14),
    marginBottom: pxToDp(100)
  },
  Picker: {
    flex: 1,
    fontSize: pxToDp(28),
    color: '#a9a9a9',
    height: pxToDp(82),
    backgroundColor:'white'
  },
  Picker2: {
    fontSize: pxToDp(20),
    color: '#a9a9a9',
    height: pxToDp(282),
    backgroundColor:'grey'
  },
  itempicker: {
    flex: 1,
    backgroundColor:'white'
  },
  PickerWrap:{
    height: pxToDp(90),
    paddingLeft: pxToDp(26),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#daddde',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    position: 'relative',
    textAlign: 'center'
  },
  PickerTitle:{
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  detailAddress:{
    flex: 1
  },
  save:{
    position: "absolute",
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    height: pxToDp(100),
    backgroundColor: '#2abd89'
  },
  saveText:{
    fontSize: pxToDp(32),
    color: 'white'
  },
  toast:{
    backgroundColor: '#626262'
  },
});
