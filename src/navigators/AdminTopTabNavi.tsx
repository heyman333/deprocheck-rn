import React from 'react';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safe-area-view';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { Alert, BackHandler } from 'react-native';
import {
  createNavigator,
  TabRouter,
  NavigationDescriptor,
  NavigationScreenProp,
  NavigationLeafRoute,
} from 'react-navigation';

import { AppContext } from '../contexts';

import { isSmallDeviceSize } from '../utils/styleUtils';
import { img_deprocheck_white, icon_cancel } from '../assets/images';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import AdminSessionCreate from '../screens/AdminSessionCreate';
import AdminShowAttendState from '../screens/AdminShowAttendState';

const HORIZONTAL_PADDING = isSmallDeviceSize() ? 16 : 38;

const Wrap = styled.View`
  flex: 1;
`;

const TopBarContainer = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
`;

const TopBarContent = styled.View`
  flex: 1;
  background-color: #1818b5;
`;

const Header = styled.View`
  border-bottom-color: white;
  border-bottom-width: 1px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${40 + getStatusBarHeight()}px ${HORIZONTAL_PADDING}px 57px
    ${HORIZONTAL_PADDING}px;
`;

const TopBarTab = styled(DCTouchable)<{ isLast: boolean }>`
  padding: 31px;
  justify-content: center;
  align-items: center;
  border-bottom-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
  border-bottom-color: #ffffff;
`;

const TabText = styled(DCText)`
  color: #ffffff;
  font-size: 20px;
`;

const Logo = styled.Image.attrs({ source: img_deprocheck_white })`
  width: 200px;
  height: 32px;
`;

const CancelButton = styled(DCTouchable).attrs({
  hitSlop: { top: 10, right: 10, bottom: 10, left: 10 },
})``;

const CancelImg = styled.Image.attrs({ source: icon_cancel })`
  width: 25px;
  height: 25px;
`;

const UnderTouch = styled.TouchableWithoutFeedback``;

const UnderView = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  z-index: 99;
`;

const MainRoutes = {
  ShowAttendState: {
    screen: AdminShowAttendState,
  },
  SessionCreate: {
    screen: AdminSessionCreate,
  },
};

const TopBar = ({
  navigation,
  titles,
}: {
  navigation: NavigationScreenProp<NavigationLeafRoute>;
  titles: string[];
}) => {
  const { dispatch } = React.useContext(AppContext);
  const { routes } = navigation.state;

  const onPressCancel = () => {
    dispatch({ type: 'SET_TAB_VISIBLE', payload: { tabVisible: false } });
  };

  return (
    <TopBarContainer>
      <TopBarContent>
        <Header>
          <Logo />
          <CancelButton onPress={onPressCancel}>
            <CancelImg />
          </CancelButton>
        </Header>
        {routes.map((route, index) => (
          <TopBarTab
            isLast={index === 1}
            onPress={() => navigation.navigate(route.routeName)}
            key={route.routeName}
          >
            <TabText>{titles[index]}</TabText>
          </TopBarTab>
        ))}
      </TopBarContent>
    </TopBarContainer>
  );
};

const BottomTouch = () => {
  const { dispatch } = React.useContext(AppContext);

  const onPressCancel = () => {
    dispatch({ type: 'SET_TAB_VISIBLE', payload: { tabVisible: false } });
  };

  return (
    <UnderTouch onPress={onPressCancel}>
      <UnderView />
    </UnderTouch>
  );
};

const TopBarView = ({
  descriptors,
  navigation,
  navigationConfig,
}: {
  descriptors: { [key: string]: NavigationDescriptor };
  navigation: NavigationScreenProp<NavigationLeafRoute>;
  navigationConfig: { titles: string[] };
}) => {
  const { routes, index } = navigation.state;
  const descriptor = descriptors[routes[index].key];
  const ActiveScreen = descriptor.getComponent();
  const { state } = React.useContext(AppContext);

  const onBackButtonPressAndroid = () => {
    Alert.alert('종료', '종료 할까요?', [
      { text: '네', onPress: BackHandler.exitApp },
      { text: '아니오' },
    ]);
    return true;
  };

  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <Wrap>
        {!!state.tabVisible && <BottomTouch />}
        {!!state.tabVisible && (
          <TopBar navigation={navigation} titles={navigationConfig.titles} />
        )}
        <ActiveScreen />
      </Wrap>
    </AndroidBackHandler>
  );
};

const CustomTabRouter = TabRouter(MainRoutes, {
  initialRouteName: 'SessionCreate',
});

const AdminTopTabNavi = createNavigator(TopBarView, CustomTabRouter, {
  titles: ['출석현황', '일정생성'],
});

export default AdminTopTabNavi;
