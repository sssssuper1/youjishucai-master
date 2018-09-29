import React, { Component } from 'react';
import Fetch from '../js/fetch';
import Header1 from './Header1.js';
import {
  StyleSheet,
  Text,
  View,
  Alert,
  FlatList
} from 'react-native';
import Toast from 'react-native-easy-toast';
import pxToDp from '../js/pxToDp';
import { renderEvaluationList, SetEvaluate } from './Evaluate';

const size = 20;

export default class AllComments extends Component {
  constructor(props) {
    super(props);

    this.total = 0;
    this.pageIndex = 0;
    this.id = this.props.navigation.state.params.id;

    this.state = {
      comments: [],
      averageStar: 0
    }

    this.loadData(this.id, this.pageIndex);
  }

  loadData(id, pageIndex, pageSize = size) {
    Fetch(`${global.url}/API/ProductDetail/GetComments?pageIndex=${pageIndex}&pageSize=${pageSize}&goodId=${id}`,
    'get', '', (res) => {
      if (res.result) {
        if (res.data.comments.length > 0) {
          let list = this.state.comments;
          list.push(...res.data.comments);

          this.setState({
            comments: list,
            averageStar: res.data.averageStar
          })

          this.total = res.data.total;
        }
      } else {
        this.refs.toast.show(res.errMsg);
      }
    }, (err) => {
      Alert.alert('提示', err);
    })
  }

  loadMore() {
    if (this.state.comments.length < this.total) {
      this.pageIndex++;
      this.loadData(this.id, this.pageIndex);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header1 name="商品评价" navigation={this.props.navigation} />
        <View style={this.state.averageStar > 0 ? styles.averageContainer : styles.hidden}>
          <Text style={styles.averageTitle}>评分</Text>
          <SetEvaluate star={this.state.averageStar} changeStar={() => {}}/>
          <Text style={styles.averageSummary}>{this.state.averageStar * 20}% 好评</Text>
        </View>
        <FlatList
          data={this.state.comments}
          renderItem={({ item, index }) => renderEvaluationList(item, index)}
          onEndReachedThreshold={0.25}
          onEndReached={this.loadMore.bind(this)}
        />
        <Toast ref="toast" style={styles.toast} position="top" positionValue={pxToDp(400)} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  hidden: {
    display: 'none'
  },
  averageContainer: {
    padding: pxToDp(26),
    marginBottom: pxToDp(15),
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderTopWidth: pxToDp(1),
    borderTopColor: '#eeeeee',
  },
  averageTitle: {
    marginRight: pxToDp(18),
    fontSize: pxToDp(28),
    color: '#2b2b2b'
  },
  averageSummary: {
    marginLeft: pxToDp(15),
    fontSize: pxToDp(28),
    color: '#a7a7a7'
  },
  toast:{
    backgroundColor: '#626262'
  }
})