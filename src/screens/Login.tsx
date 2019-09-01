import React from 'react';
import styled from 'styled-components/native';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import ScreenWrap from '../components/ScreenWrap';
import SwitchToggle from '../components/SwitchToggle';
import { navigate } from '../navigators/NavigationService';
import { AppContext } from '../contexts/AppContext';
import { img_deprocheck_logo } from '../assets/images';

const Wrap = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Header = styled.View`
  padding: 38px;
`;

const Body = styled.View`
  justify-content: center;
  align-items: center;
`;

const BottomButton = styled(DCTouchable)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: ${({ theme }) => theme.reverseBackColor};
`;

const BottomText = styled(DCText)`
  color: ${({ theme }) => theme.background};
`;

const StyledToggle = styled(SwitchToggle).attrs(({ theme }) => ({
  circleColorOn: theme.background,
  circleColorOff: theme.background,
  backgroundColorOn: theme.reverseBackColor,
  backgroundColorOff: theme.reverseBackColor,
}))``;

const Logo = styled.Image.attrs({ source: img_deprocheck_logo })`
  width: 220px;
  height: 153px;
`;

const Login: React.FC = () => {
  const onLogin = () => {
    navigate('Home');
  };

  const { state, dispatch } = React.useContext(AppContext);

  const onPressToggle = () => {
    if (state.theme === 'ADMIN') {
      dispatch({ type: 'change-theme', payload: { theme: 'MEMBER' } });
      return;
    }

    dispatch({ type: 'change-theme', payload: { theme: 'ADMIN' } });
  };

  return (
    <ScreenWrap>
      <Wrap>
        <Header>
          <StyledToggle
            switchOn={state.theme === 'ADMIN'}
            onPress={onPressToggle}
          />
        </Header>
        <Body>{state.theme === 'MEMBER' && <Logo />}</Body>
        <BottomButton onPress={onLogin}>
          <BottomText>로그인하기</BottomText>
        </BottomButton>
      </Wrap>
    </ScreenWrap>
  );
};

export default Login;
