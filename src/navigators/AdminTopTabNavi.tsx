import React from 'react';
import styled from 'styled-components/native';
import {
  createNavigator,
  TabRouter,
  NavigationDescriptor,
  NavigationScreenProp,
  NavigationLeafRoute,
} from 'react-navigation';
import { AppContext } from '../contexts';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import AdminSessionCreate from '../screens/AdminSessionCreate';
import AdminShowAttendState from '../screens/AdminShowAttendState';

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

const MainRoutes = {
  SessionCreate: {
    screen: AdminSessionCreate,
  },
  ShowAttendState: {
    screen: AdminShowAttendState,
  },
};

const TopBar = ({
  navigation,
  titles,
}: {
  navigation: NavigationScreenProp<NavigationLeafRoute>;
  titles: string[];
}) => {
  const { routes } = navigation.state;

  return (
    <TopBarContainer>
      <TopBarContent>
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

  return (
    <Wrap>
      {!!state.tabVisible && (
        <TopBar navigation={navigation} titles={navigationConfig.titles} />
      )}
      <ActiveScreen />
    </Wrap>
  );
};

const CustomTabRouter = TabRouter(MainRoutes, {});

const AdminTopTabNavi = createNavigator(TopBarView, CustomTabRouter, {
  titles: ['출석현황', '일정선택'],
});

export default AdminTopTabNavi;
