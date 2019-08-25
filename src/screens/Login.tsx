import React from 'react';
import styled from 'styled-components/native';

import { navigate } from '../navigators/NavigationService';
import DCTouchable from '../components/DCTouchable';
import ScreenWrap from '../components/ScreenWrap';
import Text from '../components/DCText';

const Wrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.background};
`;

const Login: React.FC = () => {
  const onLogin = () => {
    navigate('Home');
  };

  return (
    <ScreenWrap>
      <Wrap>
        <DCTouchable onPress={onLogin}>
          <Text>로그인화면</Text>
        </DCTouchable>
      </Wrap>
    </ScreenWrap>
  );
};

export default Login;
