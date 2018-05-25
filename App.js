/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import pxToDp from './src/js/pxToDp';
import Community from './src/components/Community';
import Vip from './src/components/Vip';
import PayToVip from './src/components/PayToVip';
import Message from './src/components/Message';
import SearchGoods from './src/components/SearchGoods';
import My from './src/components/My';
import Person from './src/components/Person';
import Name from './src/components/Name';
import Index from './src/components/Index';
import AccountSecurity from './src/components/AccountSecurity';
import ModifyPassword from './src/components/ModifyPassword';
import ModifyPhoneNum from './src/components/ModifyPhoneNum';
import MessageDetail from './src/components/MessageDetail';
import ServiceCenter from './src/components/ServiceCenter';
import Register from './src/components/Register';
import Register1 from './src/components/Register1';
import NewPassword from './src/components/NewPassword';
import PayFun from './src/components/PayFun';
import PaySuccess from './src/components/PaySuccess';
import Cart from './src/components/Cart';
import Order from './src/components/Order';
import Set from './src/components/Set';
import SignIn from './src/components/SignIn';
import GoodsDetail from './src/components/GoodsDetail';
import MyOrder from './src/components/MyOrder';
import AllOrder from './src/components/AllOrder';
import UserAddress from './src/components/UserAddress';
import EditAddress from './src/components/EditAddress';
import VipRegister from './src/components/VipRegister';
import TabNavigator from 'react-native-tab-navigator';
import SplashScreen from 'react-native-splash-screen';
import { StackNavigator } from 'react-navigation';
import store from './src/store/index';
import { storage } from './src/js/StorageUtil';

global.storage = storage;

class NewPasswordScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <NewPassword navigation={this.props.navigation} />
    );
  }
}
class Register1Screen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Register1 navigation={this.props.navigation} />
    );
  }
}
class RegisterScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Register navigation={this.props.navigation} />
    );
  }
}
class SignInScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <SignIn navigation={this.props.navigation} />
    );
  }
}
class ServiceCenterScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <ServiceCenter navigation={this.props.navigation} />
    );
  }
}
class MessageDetailScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <MessageDetail navigation={this.props.navigation} />
    );
  }
}
class HomeScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Index navigation={this.props.navigation} />
    );
  }
}
class MessageScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Message navigation={this.props.navigation} />
    );
  }
}
class ModifyPasswordScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <ModifyPassword navigation={this.props.navigation} />
    );
  }
}
class ModifyPhoneNumScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <ModifyPhoneNum navigation={this.props.navigation} />
    )
  }
}
class AccountSecurityScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <AccountSecurity navigation={this.props.navigation} />
    );
  }
}
class NameScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Name navigation={this.props.navigation} />
    );
  }
}
class SetScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Set navigation={this.props.navigation} />
    );
  }
}
class PersonScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Person navigation={this.props.navigation} />
    );
  }
}
class AllOrderScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <AllOrder navigation={this.props.navigation} />
    );
  }
}
class GoodsDetailScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <GoodsDetail navigation={this.props.navigation} />
    );
  }
}
class MyOrderScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <MyOrder navigation={this.props.navigation} />
    );
  }
}
class PayFunScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <PayFun navigation={this.props.navigation} />
    );
  }
}
class PaySuccessScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <PaySuccess navigation={this.props.navigation} />
    );
  }
}
class SearchGoodsScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <SearchGoods navigation={this.props.navigation} />
    );
  }
}
class UserAddressScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <UserAddress navigation={this.props.navigation} />
    );
  }
}
class EditAddressScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <EditAddress navigation={this.props.navigation} />
    );
  }
}
class CartScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Cart navigation={this.props.navigation} />
    );
  }
}
class OrderScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Order navigation={this.props.navigation} />
    );
  }
}
class VipRegisterScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <VipRegister navigation={this.props.navigation} />
    );
  }
}
class PayToVipScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <PayToVip navigation={this.props.navigation} />
    );
  }
}

function configAppNavigator(isLoggeIn) {
  return StackNavigator({
    // 主页
    Home: {
      screen: HomeScreen,
    },
    // 登录
    SignIn: {
      screen: SignInScreen,
    }, 
    // 购物车
    Cart: {
      screen: CartScreen,
    },
    // vip会员注册
    VipRegister: {
      screen: VipRegisterScreen,
    },
    // 忘记密码
    NewPassword: {
      screen: NewPasswordScreen,
    },
    // 注册
    Register1: {
      screen: Register1Screen,
    },
    // 注册/忘记密码 输入手机号
    Register: {
      screen: RegisterScreen,
    },
    // 客服中心
    ServiceCenter: {
      screen: ServiceCenterScreen,
    },
    // 系统消息详情页
    MessageDetail: {
      screen: MessageDetailScreen,
    },
    // 系统消息
    Message: {
      screen: MessageScreen,
    },
    // 修改密码
    ModifyPassword: {
      screen: ModifyPasswordScreen,
    },
    // 修改手机
    ModifyPhoneNum: {
      screen: ModifyPhoneNumScreen,
    },
    // 账号安全
    AccountSecurity: {
      screen: AccountSecurityScreen,
    },
    // 修改昵称
    Name: {
      screen: NameScreen,
    },
    // 个人信息
    Person: {
      screen: PersonScreen,
    },
    // 设置
    Set: {
      screen: SetScreen,
    },
    // 商品详情
    GoodsDetail: {
      screen: GoodsDetailScreen,
    },
    // 全部订单
    AllOrder: {
      screen: AllOrderScreen,
    },
    // 支付失败
    PayFun: {
      screen: PayFunScreen,
    },
    // 支付成功
    PaySuccess: {
      screen: PaySuccessScreen,
    },
    // 订单详情
    MyOrder: {
      screen: MyOrderScreen,
    },
    // 收货地址
    UserAddress: {
      screen: UserAddressScreen,
    },
    // 编辑收货地址
    EditAddress: {
      screen: EditAddressScreen,
    },
    // 搜索
    SearchGoods: {
      screen: SearchGoodsScreen,
    },
    // vip购买付费
    PayToVip: {
      screen: PayToVipScreen,
    },
    // 确认订单
    Order: {
      screen: OrderScreen,
    },
    
    
  }, {
    initialRouteName: isLoggeIn ? 'Home' : 'SignIn'
  });
}

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkedLogin: false,
      isLoggedIn: false
    }
  }

  componentDidMount() {
    // SplashScreen.hide();
    global.storage.load({
      key: 'Cookie'
    }).then(ret => {
      this.setState({
        checkedLogin: true
      });
      if (ret.userId == 'TestUser') {
        this.setState({
          isLoggedIn: true
        });
      }
    }).catch(err => {
      this.setState({
        checkedLogin: true
      });
    });
  }

  render() {
    const { checkedLogin, isLoggedIn } = this.state;

    if (!checkedLogin) {
      return null;
    }

    const RootNavigator = configAppNavigator(isLoggedIn);
    return <RootNavigator store={store} />;
  }
}

