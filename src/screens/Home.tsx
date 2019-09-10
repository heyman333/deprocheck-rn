import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';

import { UserContext } from '../contexts';
import ScreenWrap from '../components/ScreenWrap';
import Text from '../components/DCText';

const Wrap = styled.View`
  justify-content: center;
  align-items: center;
`;

const Home: React.FC<NavigationScreenComponent> = () => {
  const { state: authState } = React.useContext(UserContext);

  console.log('state', authState.userInfo);

  return (
    <ScreenWrap mode="MEMBER">
      <Wrap>
        <Text>메인화면</Text>
      </Wrap>
    </ScreenWrap>
  );
};

export default Home;
