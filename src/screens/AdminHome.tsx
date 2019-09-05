import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';

import DCText from '../components/DCText';

const Wrap = styled.View`
  flex: 1;
`;

import ScreenWrap from '../components/ScreenWrap';

const AdminHome: React.FC<NavigationScreenComponent> = () => {
  return (
    <ScreenWrap>
      <Wrap>
        <DCText>관리자</DCText>
      </Wrap>
    </ScreenWrap>
  );
};

export default AdminHome;
