import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet
} from 'react-native';
import pxToDp from '../js/pxToDp';
import getVipPortrait from '../js/getVipPortrait';

const total = 5;

export class SetEvaluate extends Component {
  
  starRender(index) {
    const { star, changeStar } = this.props;

    return (
      <TouchableOpacity onPress={() => changeStar(index)}>
        <Image style={styles.starImg1} source={index <= star ? require('../images/star-check.png') : require('../images/star-uncheck.png')} />
      </TouchableOpacity>
    )
  }
  render() {
    let stars = [];
    for (let i = 1; i <= total; i++) {
      stars.push(this.starRender(i));
    }
    return (
      <View style={styles.starsContainer1}>
        {stars}
      </View>
    )
  }
}

export class GetEvaluate extends Component {
  starRender(index) {
    const { star } = this.props;

    return (
      <Image style={styles.starImg2} source={index <= star ? require('../images/star-check.png') : require('../images/star-uncheck.png')} />
    )
  }
  render() {
    let stars = [];
    for (let i = 1; i <= total; i++) {
      stars.push(this.starRender(i));
    }
    return (
      <View style={styles.starsContainer2}>
        {stars}
      </View>
    )
  }
}

export function renderEvaluationList(item, index) {
  return (
    <View style={styles.commentContainer} key={index}>
      <View style={styles.commentHeader}>
        <View style={styles.commentUser}>
          <Image style={styles.commentUserPortrait} source={getVipPortrait(item.level)} />
          <Text style={styles.commentUserName}>{item.nickName}</Text>
        </View>
        <GetEvaluate star={item.star} />
      </View>
      <Text style={styles.commentTime}>{item.evaluationTime}</Text>
      <Text style={styles.commentContent}>{item.content}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  starsContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: pxToDp(36),
    width: pxToDp(282)
  },
  starImg1: {
    width: pxToDp(38),
    height: pxToDp(36)
  },
  starsContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: pxToDp(27),
    width: pxToDp(164)
  },
  starImg2: {
    width: pxToDp(28),
    height: pxToDp(27)
  },
  commentContainer: {
    paddingHorizontal: pxToDp(26),
    paddingTop: pxToDp(33),
    paddingBottom: pxToDp(28),
    borderTopWidth: pxToDp(1),
    borderTopColor: '#eeeeee',
    backgroundColor: '#ffffff'
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  commentUser: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  commentUserPortrait: {
    width: pxToDp(60),
    height: pxToDp(60)
  },
  commentUserName: {
    marginLeft: pxToDp(20),
    fontSize: pxToDp(30),
    color: '#2b2b2b'
  },
  commentTime: {
    fontSize: pxToDp(22),
    color: '#999999',
    lineHeight: pxToDp(65)
  },
  commentContent: {
    fontSize: pxToDp(30),
    color: '#2b2b2b'
  }
})