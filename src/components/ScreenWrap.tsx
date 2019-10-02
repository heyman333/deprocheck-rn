import React from 'react';
import { Platform, StatusBar } from 'react-native';
import styled from 'styled-components/native';
import SafeAreaView, { SafeAreaViewProps } from 'react-native-safe-area-view';

import { AppContext } from '../contexts';

let Wrap = styled(SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const InnerWrap = styled.View`
  flex: 1;
  background-color: #f6f9ff;
`;

interface Props extends SafeAreaViewProps {
  children: React.ReactElement | React.ReactElement[];
}

const ScreenWrap: React.FC<Props> = ({ children, forceInset }) => {
  const {
    state: { theme },
  } = React.useContext(AppContext);

  return (
    <Wrap forceInset={forceInset}>
      <StatusBar
        barStyle={theme === 'ADMIN' ? 'light-content' : 'dark-content'}
        translucent={Platform.OS === 'android'}
        backgroundColor={Platform.OS === 'android' ? 'transparent' : ''}
      />
      <InnerWrap>{children}</InnerWrap>
    </Wrap>
  );
};

export default ScreenWrap;
