import React from 'react';
import styled from 'styled-components/native';
import { Platform } from 'react-native';

const paltformVersion =
  typeof Platform.Version === 'string'
    ? parseInt(Platform.Version, 10)
    : Platform.Version;

const iOS10Under = Platform.OS === 'ios' && paltformVersion <= 10;

const Wrap = (iOS10Under ? styled.View : styled.SafeAreaView)<{
  bgColor: string;
}>`
  flex: 1;
  background-color: ${props => props.bgColor};
`;

const InnerWrap = styled.View`
  flex: 1;
  background-color: #f6f9ff;
`;

interface Props {
  children: React.ReactElement;
  safeAreaColor?: string;
}

const ScreenWrap: React.FC<Props> = ({ children, safeAreaColor }: Props) => {
  return (
    <Wrap bgColor={safeAreaColor || '#fff'}>
      <InnerWrap>{children}</InnerWrap>
    </Wrap>
  );
};

export default ScreenWrap;
