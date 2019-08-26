import React from 'react';
import styled from 'styled-components/native';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import ScreenWrap from '../components/ScreenWrap';
import SwitchToggle from '../components/SwitchToggle';
import { navigate } from '../navigators/NavigationService';
import { AppContext } from '../contexts/AppContext';
import { img_deprocheck_logo } from '../assets/images';
import {Image} from "react-native";

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
  background-color: ${({ theme }) => theme.background};
`

const Footer = styled.View`
  justify-content: center;
  align-items: center;
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
  width: 100%;
  height: 80px;
  background-color: #222222;
`;

const EnterText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.36px;
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
        <Image
            source={require('../asset/deprocheck-logo.png')}
            width={220}
        />

        <Footer>
          <DCTouchable onPress={onLogin}>
            <EnterText>입장하기</EnterText>
          </DCTouchable>
        </Footer>
      </Wrap>
    </ScreenWrap>
  );
};

export default Login;
