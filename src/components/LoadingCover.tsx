import React from 'react';
import styled from 'styled-components/native';
import { ActivityIndicator } from 'react-native';

const Wrap = styled.View`
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: absolute;
`;

export default function LoadingCover() {
  return (
    <Wrap>
      <ActivityIndicator />
    </Wrap>
  );
}
