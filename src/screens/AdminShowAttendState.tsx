import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';

import { img_deprocheck_white, icon_menu_bar } from '../assets/images';
import { isSmallDeviceSize } from '../utils/styleUtils';
import { colors } from '../utils/theme';

import ScreenWrap from '../components/ScreenWrap';
import DCTouchable from '../components/DCTouchable';
import { AppContext } from '../contexts';
import DCText from '../components/DCText';

const HORIZONTAL_PADDING = isSmallDeviceSize() ? 16 : 38;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px ${HORIZONTAL_PADDING}px 0px ${HORIZONTAL_PADDING}px;
`;

const Logo = styled.Image.attrs({ source: img_deprocheck_white })`
  width: 200px;
  height: 32px;
`;

const MenuBar = styled.Image.attrs({ source: icon_menu_bar })``;

const MenuButton = styled(DCTouchable).attrs({
  hitSlop: { top: 10, right: 10, bottom: 10, left: 10 },
})``;

const Wrap = styled.View`
  flex: 1;
  background-color: ${colors.black};
`;

const Body = styled.View`
  padding: ${HORIZONTAL_PADDING}px;
`;

const Title = styled(DCText)`
  font-weight: bold;
  margin-bottom: 12px;
  color: white;
`;

const AdminShowAttendState: NavigationScreenComponent = () => {
  const { dispatch } = React.useContext(AppContext);

  const onPressMenu = () => {
    dispatch({ type: 'SET_TAB_VISIBLE', payload: { tabVisible: true } });
  };

  return (
    <ScreenWrap mode="ADMIN">
      <Wrap>
        <Header>
          <Logo />
          <MenuButton onPress={onPressMenu}>
            <MenuBar />
          </MenuButton>
        </Header>
        <Body>
          <Title>출석현황</Title>
        </Body>
      </Wrap>
    </ScreenWrap>
  );
};

export default AdminShowAttendState;
