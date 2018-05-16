import React, { Component } from 'react';
import {
  Animated,
} from 'react-native';

export default class FadeInView extends Component {
  constructor(props) {
      super(props);
  
    this.state = {
        left: new Animated.Value(0),
        top: new Animated.Value(0),
    };
      onPanResponderRelease: () => {
        alert(1)
        this.animate()
    };
  }
  componentDidMount() {
             this.animate()                          // 开始执行动画
    }
    animate() {
        Animated.sequence([            // 首先执行decay动画，结束后同时执行spring和twirl动画
            // Animated.timing(this.state.fadeAnim, {   // 滑行一段距离后停止
            //     toValue: 1,
            //     duration: 500
            // }),
            Animated.parallel(
                [
                    Animated.timing(this.state.left, {
                        toValue: 100,
                        duration: 1000    // 返回到起始点开始
                    }),
                    Animated.timing(this.state.top, {
                        toValue: 100,
                        duration: 1000
                    })
                ]
            ),
            // Animated.timing(this.state.fadeAnim, {   // 滑行一段距离后停止
            //     toValue: 0,
            //     duration: 500
            // }),
        ]).start();
    }
  render() {
    return (
      <Animated.View                            // 可动画化的视图组件
        style={{
            ...this.props.style,
            left: this.state.left,
            top: this.state.top,
            opacity: this.state.fadeAnim,
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}