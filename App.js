/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import PayToVip from './src/components/PayToVip';
import Message from './src/components/Message';
import SearchGoods from './src/components/SearchGoods';
import Person from './src/components/Person';
import Name from './src/components/Name';
import Index from './src/components/Index';
import AccountSecurity from './src/components/AccountSecurity';
import ModifyPassword from './src/components/ModifyPassword';
import ModifyPayPassword from './src/components/ModifyPayPassword';
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
import IntegralRecord from './src/components/IntegralRecord';
import IntegralRecharge from './src/components/IntegralRecharge';
import Balance from './src/components/Balance';
import Cash from './src/components/Cash';
import TransferInput from './src/components/TransferInput';
import TransferConfirm from './src/components/TransferConfirm';
import ShopDetail from './src/components/ShopDetail';
import ShopPay from './src/components/ShopPay';
import Share from './src/components/Share';
import BankCard from './src/components/BankCard';
import Partner from './src/components/Partner';
import CommunityOrders from './src/components/CommunityOrders';
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
class IntegralRecordScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <IntegralRecord navigation={this.props.navigation} />
    );
  }
}
class IntegralRechargeScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <IntegralRecharge navigation={this.props.navigation} />
    )
  }
}
class BalanceScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Balance navigation={this.props.navigation} />
    )
  }
}
class CashScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <Cash navigation={this.props.navigation} />
    )
  }
}
class TransferInputScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <TransferInput navigation={this.props.navigation} />
    )
  }
}
class TransferConfirmScreen extends Component {
  static navigationOptions = {
    header: null
  };
  render() {
    return (
      <TransferConfirm navigation={this.props.navigation} />
    )
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
class ShopDetailScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <ShopDetail navigation={this.props.navigation} />
    );
  }
}
class ShopPayScreen extends Component {
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <ShopPay navigation={this.props.navigation} />
    )
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
class ModifyPayPasswordScreen extends Component { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <ModifyPayPassword navigation={this.props.navigation} />
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
class ShareScreen extends Component {
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Share navigation={this.props.navigation} />
    );
  }
}
class BankCardScreen extends Component {
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <BankCard navigation={this.props.navigation} />
    )
  }
}
class PartnerScreen extends Component {
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Partner navigation={this.props.navigation} />
    )
  }
}
class CommunityOrderScreen extends Component {
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <CommunityOrders navigation={this.props.navigation} />
    )
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
    // 修改支付密码
    ModifyPayPassword: {
      screen: ModifyPayPasswordScreen,
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
    // 积分记录
    IntegralRecord: {
      screen: IntegralRecordScreen,
    },
    // 积分充值
    IntegralRecharge: {
      screen: IntegralRechargeScreen
    },
    // 余额记录
    Balance: {
      screen: BalanceScreen
    },
    //余额提现
    Cash: {
      screen: CashScreen
    },
    // 余额转账输入账户
    TransferInput: {
      screen: TransferInputScreen
    },
    // 余额转账确认
    TransferConfirm: {
      screen: TransferConfirmScreen
    },
    // 店铺详情
    ShopDetail: {
      screen: ShopDetailScreen,
    },
    // 店铺实付
    ShopPay: {
      screen: ShopPayScreen
    },
    // 分享
    Share: {
      screen: ShareScreen
    },
    // 银行卡信息
    BankCard: {
      screen: BankCardScreen
    },
    // 我的伙伴
    Partner: {
      screen: PartnerScreen
    },
    // 社群消费订单
    CommunityOrders: {
      screen: CommunityOrderScreen
    }
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
    // global.storage.load({
    //   key: 'Cookie'
    // }).then(ret => {
    //   this.setState({
    //     checkedLogin: true
    //   });
    //   if (!!ret && !!ret.userId) {
    //     this.setState({
    //       isLoggedIn: true
    //     });
    //   }
    // }).catch(err => {
    //   this.setState({
    //     checkedLogin: true
    //   });
    // });

    this.setState({
      checkedLogin: true,
      isLoggedIn: true
    })
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

