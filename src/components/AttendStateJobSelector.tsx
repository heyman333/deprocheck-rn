import React from 'react';
import styled from 'styled-components/native';
import _partial from 'lodash/partial';

import { ShowJobType } from '../interfaces';
import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';

import { colors } from '../utils/theme';

const Wrap = styled.View`
  flex-direction: row;
`;

const Button = styled(DCTouchable)<{ isLast?: boolean }>`
  flex: 1;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: ${colors.white};
  border-right-color: #eeeeee;
  border-right-width: ${({ isLast }) => (isLast ? 0 : 1)}px;
`;

const Text = styled(DCText)<{ selected: boolean }>`
  color: ${({ selected }) => (selected ? colors.blue : colors.gray)};
  font-weight: bold;
`;

interface Props {
  type: ShowJobType;
  onPressType: (type: ShowJobType) => void;
}

const AttendStateJobSelector: React.FC<Props> = ({ type, onPressType }) => {
  return (
    <Wrap>
      <Button onPress={_partial(onPressType, ShowJobType.ALL)}>
        <Text selected={type === ShowJobType.ALL}>All</Text>
      </Button>
      <Button onPress={_partial(onPressType, ShowJobType.DESIGNER)}>
        <Text selected={type === ShowJobType.DESIGNER}>Designer</Text>
      </Button>
      <Button onPress={_partial(onPressType, ShowJobType.DEVELOPER)}>
        <Text selected={type === ShowJobType.DEVELOPER}>Developer</Text>
      </Button>
    </Wrap>
  );
};

export default AttendStateJobSelector;
