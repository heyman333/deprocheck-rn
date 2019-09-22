import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import SafeAreaView, { SafeAreaViewProps } from 'react-native-safe-area-view';

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
  mode: 'ADMIN' | 'MEMBER';
}

const ScreenWrap: React.FC<Props> = ({ children, mode, forceInset }: Props) => {
  return (
    <Wrap forceInset={forceInset}>
      <StatusBar
        barStyle={mode === 'ADMIN' ? 'light-content' : 'dark-content'}
      />
      <InnerWrap>{children}</InnerWrap>
    </Wrap>
  );
};

export default ScreenWrap;
