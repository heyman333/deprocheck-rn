import React from 'react';
import { FlatList } from 'react-native';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import _partial from 'lodash/partial';

import { isSmallDeviceSize } from '../utils/styleUtils';
import { toYYMMDDKR } from '../utils/timeUtils';
import { SessionDateType } from '../interfaces/sessionDate';
import { colors } from '../utils/theme';
import DCText from './DCText';
import DCTouchable from './DCTouchable';

const HORIZONTAL_PADDING = isSmallDeviceSize() ? 16 : 38;

interface Props {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: (item: SessionDateType) => void;
  data: SessionDateType[];
}

const Wrap = styled.View`
  flex: 1;
  padding: 0px ${HORIZONTAL_PADDING}px;
  justify-content: center;
  align-items: center;
`;

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
  font-size: 14px;
  margin-bottom: 5px;
  font-weight: ${({ selected }) => (selected ? 'bold' : 'normal')};
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
      <Row onPress={_partial(onSelectRow, index)}>
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
    <Wrap>
      <Modal
        isVisible={isVisible}
        onBackButtonPress={onClose}
        onBackdropPress={onClose}
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
    </Wrap>
  );
};

export default DateSelectModal;
