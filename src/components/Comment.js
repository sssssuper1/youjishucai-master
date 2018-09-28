import React, { Component } from 'react';
import Fetch from '../js/fetch';
import { SetEvaluate } from './Evaluate';
import Header1 from './Header1.js';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  Alert,
  FlatList
} from 'react-native';
import Toast from 'react-native-easy-toast';
import pxToDp from '../js/pxToDp';

export default class Comment extends Component {
  constructor(props) {
    super(props);

    let orderDetails = this.props.navigation.state.params.orderDetails;

    for (let i = 0; i < orderDetails.length; i++) {
      orderDetails[i].star = 0;
      orderDetails[i].commentLength = 0;
      orderDetails[i].comment = '';
    }

    this.state = {
      orderDetails: orderDetails
    }
  }

  changeStar(star, index) {
    let orderDetails = this.state.orderDetails.slice(0);
    orderDetails[index].star = star;

    this.setState({
      orderDetails: orderDetails
    })
  }

  changeComment(value, index) {
    let orderDetails = this.state.orderDetails.slice(0);
    orderDetails[index].comment = value;
    orderDetails[index].commentLength = value.length;
    if (orderDetails[index].commentLength >= 100) return;
    
    this.setState({
      orderDetails: orderDetails
    })
  }

  submit() {
    let params = [];
    this.state.orderDetails.forEach((item) => {
      if (!item.comment) {
        this.refs.toast.show('请填写评价!');

        return
      }

      let param = {
        OrderDetailId: item.id,
        rating: item.star,
        content: item.comment,
        goodSpecId: item.goodSpecId,
        goodId: item.goodId
      };

      params.push(param);
    })

    Fetch(global.url + '/api/Order/addEvaluate', 'post', params, (res) => {
      if (res.success) {
        this.refs.toast.show('评价成功!');

        setTimeout(() => {
          this.props.navigation.navigate('Home', { selectedTab: 'my' });
        }, 1500);
      } else {
        this.refs.toast.show(res.message);
      }
    }, (err) => {
      Alert.alert('提示', err)
    })
  }

  renderGoods(item, index) {
    return (
      <View style={styles.goodCommentContainer} key={index}>
        <View style={styles.goodCommentInfo}>
          <Image style={styles.goodImg} source={{uri: item.goodImg}} />
          <View style={styles.commentContent}>
            <Text style={styles.commentTitle}>{item.goodName}</Text>
            <SetEvaluate star={item.star} changeStar={(star) => this.changeStar(star, index)}/>
          </View>
        </View>
        <View style={styles.commentInputArea}>
          <TextInput
            style={styles.commentInputField}
            multiline={true}
            numberOfLines={5}
            placeholder={'分享你的心得，给小伙伴们吧!'}
            onChangeText={(value) => this.changeComment(value, index)}
            value={item.comment}
          />
          <Text style={styles.commentInputLimit}>{item.commentLength}/100</Text>
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <Header1 name="发表评价" navigation={this.props.navigation} />
        <FlatList
          data={this.state.orderDetails}
          renderItem={({ item, index }) => this.renderGoods(item, index)}
          keyboardShouldPersistTaps={'handled'}
          style={styles.listContainer}
        />
        <TouchableOpacity style={styles.save} onPress={() => this.submit()}>
          <Text style={styles.saveText}>发表</Text>
        </TouchableOpacity>
        <Toast ref="toast" style={styles.toast} position="top" positionValue={pxToDp(400)} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  listContainer: {
    marginBottom: pxToDp(85)
  },
  goodCommentContainer: {
    backgroundColor: '#ffffff',
    marginBottom: pxToDp(15),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#d1d1d1'
  },
  goodCommentInfo: {
    flexDirection: 'row',
    padding: pxToDp(35),
    borderBottomWidth: pxToDp(1),
    borderBottomColor: '#d1d1d1'
  },
  good: {
    width: pxToDp(120),
    height: pxToDp(120)
  },
  goodImg: {
    width: pxToDp(120),
    height: pxToDp(120)
  },
  commentContent: {
    paddingLeft: pxToDp(25),
    paddingVertical: pxToDp(13)
  },
  commentTitle: {
    fontSize: pxToDp(30),
    color: '#000000',
    marginBottom: pxToDp(15)
  },
  commentInputArea: {
    paddingHorizontal: pxToDp(35),
    paddingTop: pxToDp(35),
    paddingBottom: pxToDp(15)
  },
  commentInputField: {
    textAlignVertical: 'top'
  },
  commentInputLimit: {
    textAlign: 'right',
    fontSize: pxToDp(20),
    color: '#999999'
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
  }
})