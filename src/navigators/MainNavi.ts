import { createStackNavigator, createAppContainer } from 'react-navigation';

import Login from '../screens/Login';
import Home from '../screens/Home';
// import AdminHome from '../screens/AdminHome';
import AdminTopTabNavi from '../navigators/AdminTopTabNavi';
import UserAttend from '../screens/UserAttend';
import UserStatus from '../screens/UserStatus';


const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Home: {
      screen: Home,
    },
    Admin: {
      screen: AdminTopTabNavi,
    },
    UserAttend: {
      screen: UserAttend,
    },
    UserStatus: {
      screen: UserStatus,
    },
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  }
);

export default createAppContainer(AppNavigator);
