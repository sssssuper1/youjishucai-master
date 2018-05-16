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
import MessageDetail from './src/components/MessageDetail';
import ServiceCenter from './src/components/ServiceCenter';
import Register from './src/components/Register';
import Register1 from './src/components/Register1';
import NewPassword from './src/components/NewPassword';
import PayFun from './src/components/PayFun';
import Cart from './src/components/Cart';
import Order from './src/components/Order';
import Set from './src/components/Set';
import SignIn from './src/components/SignIn';
import GoodsDetail from './src/components/GoodsDetail';
import MyOrder from './src/components/MyOrder';
import AllOrder from './src/components/AllOrder';
import UserAddress from './src/components/UserAddress';
import VipRegister from './src/components/VipRegister';
import TabNavigator from 'react-native-tab-navigator';
import { StackNavigator } from 'react-navigation';
import store from './src/store/index'
type Props = {};
class NewPasswordScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <NewPassword navigation={this.props.navigation} />
    );
  }
}
class Register1Screen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Register1 navigation={this.props.navigation} />
    );
  }
}
class RegisterScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Register navigation={this.props.navigation} />
    );
  }
}
class SignInScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <SignIn navigation={this.props.navigation} />
    );
  }
}
class ServiceCenterScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <ServiceCenter navigation={this.props.navigation} />
    );
  }
}
class MessageDetailScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <MessageDetail navigation={this.props.navigation} />
    );
  }
}
class HomeScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Index navigation={this.props.navigation} />
    );
  }
}
class MessageScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Message navigation={this.props.navigation} />
    );
  }
}
class ModifyPasswordScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <ModifyPassword navigation={this.props.navigation} />
    );
  }
}
class AccountSecurityScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <AccountSecurity navigation={this.props.navigation} />
    );
  }
}
class NameScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Name navigation={this.props.navigation} />
    );
  }
}
class SetScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Set navigation={this.props.navigation} />
    );
  }
}
class PersonScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Person navigation={this.props.navigation} />
    );
  }
}
class AllOrderScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <AllOrder navigation={this.props.navigation} />
    );
  }
}
class GoodsDetailScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <GoodsDetail navigation={this.props.navigation} />
    );
  }
}
class MyOrderScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <MyOrder navigation={this.props.navigation} />
    );
  }
}
class PayFunScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <PayFun navigation={this.props.navigation} />
    );
  }
}
class SearchGoodsScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <SearchGoods navigation={this.props.navigation} />
    );
  }
}
class UserAddressScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <UserAddress navigation={this.props.navigation} />
    );
  }
}
class CartScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Cart navigation={this.props.navigation} />
    );
  }
}
class OrderScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <Order navigation={this.props.navigation} />
    );
  }
}
class VipRegisterScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <VipRegister navigation={this.props.navigation} />
    );
  }
}
class PayToVipScreen extends Component<Props> { 
  static navigationOptions = {
    header:null
  };
  render() {
    return (
      <PayToVip navigation={this.props.navigation} />
    );
  }
}
const RootNavigator = StackNavigator({
  NewPassword: {
    screen: NewPasswordScreen,
  },
  Register1: {
    screen: Register1Screen,
  },
  Register: {
    screen: RegisterScreen,
  },
  SignIn: {
    screen: SignInScreen,
  },
  ServiceCenter: {
    screen: ServiceCenterScreen,
  },
  MessageDetail: {
    screen: MessageDetailScreen,
  },
  Message: {
    screen: MessageScreen,
  },
  ModifyPassword: {
    screen: ModifyPasswordScreen,
  },
  AccountSecurity: {
    screen: AccountSecurityScreen,
  },
  Name: {
    screen: NameScreen,
  },
  Person: {
    screen: PersonScreen,
  },
  Set: {
    screen: SetScreen,
  },
  GoodsDetail: {
    screen: GoodsDetailScreen,
  },
  AllOrder: {
    screen: AllOrderScreen,
  },
  PayFun: {
    screen: PayFunScreen,
  },
  MyOrder: {
    screen: MyOrderScreen,
  },
  UserAddress: {
    screen: UserAddressScreen,
  },
  SearchGoods: {
    screen: SearchGoodsScreen,
  },
  PayToVip: {
    screen: PayToVipScreen,
  },
  VipRegister: {
    screen: VipRegisterScreen,
  },
  Order: {
    screen: OrderScreen,
  },
  Cart: {
    screen: CartScreen,
  },
  Home: {
    screen: HomeScreen,
  },
});
export default class App extends React.Component {
  render() {
    return <RootNavigator store={store} />;
  }
}

