import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import ScreenWrap from '../components/ScreenWrap';
import SwitchToggle from '../components/SwitchToggle';
import { replace } from '../navigators/NavigationService';
import { AppContext, UserContext } from '../contexts';
import { img_deprocheck_logo } from '../assets/images';
import { requestMemberLoginByName } from '../modules/auth';

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

const Login: React.FC<NavigationScreenComponent> = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { dispatch: authDispatch } = React.useContext(UserContext);

  const onLogin = async () => {
    try {
      // FIXME: 일단 아무이름이나 하드코딩
      const data = await requestMemberLoginByName('한영수');
      if (data.accessToken) {
        authDispatch({
          type: 'SET_USER_INFO',
          payload: { userInfo: { name: '한영수' } },
        });

        gotoHome();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const gotoHome = () => {
    // 화면을 따로 만들고 공통된 컴포넌트 최대한 활용
    // 사용자 위치는 renderProps 디자인 패턴을 활용해서 재활용
    if (state.theme === 'ADMIN') {
      replace('AdminHome');
      return;
    }
    replace('UserHome');
  };

  const onPressToggle = () => {
    if (state.theme === 'ADMIN') {
      dispatch({ type: 'CHANGE_THEME', payload: { theme: 'MEMBER' } });
      return;
    }

    dispatch({ type: 'CHANGE_THEME', payload: { theme: 'ADMIN' } });
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
