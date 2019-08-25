import React from 'react';
import styled from 'styled-components/native';
import ScreenWrap from '../components/ScreenWrap';
import Text from '../components/DCText';

const Wrap = styled.View`
  justify-content: center;
  align-items: center;
`;

const Home: React.FC = () => {
  return (
    <ScreenWrap>
      <Wrap>
        <Text>메인화면</Text>
      </Wrap>
    </ScreenWrap>
  );
};

export default Home;
