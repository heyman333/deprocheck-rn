import {
  createStackNavigator,
  createAppContainer,
  NavigationComponent,
} from 'react-navigation';
import { fadeIn } from 'react-navigation-transitions';

import Login from '../screens/Login';
import Home from '../screens/Home';
// import AdminHome from '../screens/AdminHome';
import AdminTopTabNavi from '../navigators/AdminTopTabNavi';
import UserAttend from '../screens/UserAttend';
import UserStatus from '../screens/UserStatus';
import { Animated, Easing } from 'react-native';

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
      config: {
        stiffness: 1000,
        damping: 500,
        mass: 3,
        overshootClamping: true,
        restDisplacementThreshold: 0.01,
        restSpeedThreshold: 0.01,
      },
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
