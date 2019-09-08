import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';

import DCText from '../components/DCText';

const Wrap = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

import ScreenWrap from '../components/ScreenWrap';

const AdminSessionCreate: React.FC<NavigationScreenComponent> = () => {
  return (
    <ScreenWrap>
      <Wrap>
        <DCText>세션 생성</DCText>
      </Wrap>
    </ScreenWrap>
  );
};

export default AdminSessionCreate;
