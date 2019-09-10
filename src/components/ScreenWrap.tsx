import React from 'react';
import { StatusBar } from 'react-native';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

const paltformVersion =
  typeof Platform.Version === 'string'
    ? parseInt(Platform.Version, 10)
    : Platform.Version;

const iOS10Under = Platform.OS === 'ios' && paltformVersion <= 10;

const Wrap = (iOS10Under ? styled.View : styled.SafeAreaView)`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const InnerWrap = styled.View`
  flex: 1;
  background-color: #f6f9ff;
`;

interface Props {
  children: React.ReactElement;
  mode: 'ADMIN' | 'MEMBER';
}

const ScreenWrap: React.FC<Props> = ({ children, mode }: Props) => {
  return (
    <Wrap>
      <StatusBar
        barStyle={mode === 'ADMIN' ? 'light-content' : 'dark-content'}
      />
      <InnerWrap>{children}</InnerWrap>
    </Wrap>
  );
};

export default ScreenWrap;
