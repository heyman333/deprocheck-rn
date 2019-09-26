import React from 'react';
import { FlatList } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import _partial from 'lodash/partial';

import { toYYMMDDKR } from '../utils/timeUtils';
import { SessionDateType } from '../interfaces';
import { colors } from '../utils/theme';
import DCText from './DCText';
import DCTouchable from './DCTouchable';

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (item: SessionDateType) => void;
  data: SessionDateType[];
}

const ModalWrap = styled.View`
  height: 355px;
  background-color: white;
  justify-content: center;
  align-items: center;
  padding: 20px 20px 27px 20px;
`;

const Row = styled(DCTouchable)``;

const DateText = styled(DCText)<{ selected: boolean }>`
  color: ${colors.black};
  font-size: ${({ selected }) => (selected ? 15 : 14)}px;
  margin-bottom: 5px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
  line-height: 28px;
`;

const BottomButton = styled(DCTouchable)`
  background-color: ${colors.black};
  width: 160px;
  height: 50px;
  justify-content: center;
  align-items: center;
`;

const BottomText = styled(DCText)`
  color: white;
  font-weight: bold;
`;

const DateSelectModal: React.FC<Props> = ({
  isVisible,
  onConfirm,
  data,
  onClose,
}) => {
  const [selectedRow, setSelectedRow] = React.useState(0);

  const onSelectRow = (index: number) => {
    setSelectedRow(index);
  };

  const renderRow = ({
    item,
    index,
  }: {
    item: SessionDateType;
    index: number;
  }) => {
    return (
      <Row onPress={_partial(onSelectRow, index)} noEffect>
        <DateText selected={selectedRow === index}>
          {toYYMMDDKR(item.startTime)}
        </DateText>
      </Row>
    );
  };

  const onPressConfirm = () => {
    onConfirm(data[selectedRow]);
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
      backdropTransitionOutTiming={0}
    >
      <ModalWrap>
        <FlatList
          data={data}
          renderItem={renderRow}
          keyExtractor={item => item.startTime.toDateString()}
          extraData={selectedRow}
        />
        <BottomButton onPress={onPressConfirm}>
          <BottomText>일정 선택확인</BottomText>
        </BottomButton>
      </ModalWrap>
    </Modal>
  );
};

export default DateSelectModal;
