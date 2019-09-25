import {
  createStackNavigator,
  createAppContainer,
  NavigationComponent,
} from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';

import Login from '../screens/Login';

// import AdminHome from '../screens/AdminHome';
import AdminTopTabNavi from '../navigators/AdminTopTabNavi';
import UserAttend from '../screens/UserAttend';
import UserStatus from '../screens/UserStatus';
import { Animated } from 'react-native';

const handleCustomTransition = ({
  scenes,
}: {
  scenes: NavigationComponent[];
}) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (
    prevScene &&
    prevScene.route.routeName === 'Login' &&
    nextScene.route.routeName === 'UserAttend'
  ) {
    return fadeIn();
  }

  if (
    prevScene &&
    prevScene.route.routeName === 'Login' &&
    nextScene.route.routeName === 'Admin'
  ) {
    return fadeIn();
  }
  return {
    transitionSpec: {
      animation: 'spring',
      duration: 280,
      timing: Animated.timing,
    },
  };
};

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
    Admin: {
      screen: AdminTopTabNavi,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
    UserAttend: {
      screen: UserAttend,
      navigationOptions: () => ({
        gesturesEnabled: false,
      }),
    },
    UserStatus: {
      screen: UserStatus,
    },
  },
  {
    transitionConfig: nav => handleCustomTransition(nav),
    defaultNavigationOptions: {
      header: null,
    },
  }
);

export default createAppContainer(AppNavigator);
