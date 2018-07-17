import {Alert} from 'react-native';
import * as WeChat from 'react-native-wechat';

export function wxShareToTimeline(data) {
    WeChat.registerApp('wx4e425ddae999f00b');
    WeChat.shareToTimeline(data).catch(err => {
        Alert.alert('分享失败！');
    });
}

export function wxShareToSession(data) {
    WeChat.registerApp('wx4e425ddae999f00b');
    WeChat.shareToSession(data).catch(err => {
        Alert.alert('分享失败！');
    });
}