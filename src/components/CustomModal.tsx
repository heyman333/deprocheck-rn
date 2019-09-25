import React from 'react';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';

import { AppContext } from '../contexts';
import { colors } from '../utils/theme';

import DCText from './DCText';

const ModalWrap = styled.View`
  background-color: white;
  margin: 0 14px;
`;

const InnerWrap = styled.View`
  justify-content: center;
  align-items: center;
`;

const TitleImage = styled.Image`
  width: 50px;
  height: 50px;
  margin: 10px;
`;

const Message = styled(DCText)`
  color: ${colors.black};
  font-size: 16px;
`;

const SubMessage = styled(DCText)`
  color: ${colors.black};
  font-size: ${colors.gray};
`;

const ButtonWrap = styled.View`
  flex-direction: row;
  border-top-width: 1px;
  border-top-color: #eeeeee;
  margin-top: 35px;
`;

const CustomModal: React.FC = () => {
  const { state, dispatch } = React.useContext(AppContext);
  const { modalInfos } = state;

  const onClose = () => {
    dispatch({ type: 'SET_MODAL_VISIBLE', payload: { modalVisible: false } });
  };

  return (
    <Modal
      isVisible={state.modalVisible}
      onBackButtonPress={onClose}
      onBackdropPress={onClose}
    >
      <ModalWrap>
        <InnerWrap>
          {modalInfos.titleImage && (
            <TitleImage source={modalInfos.titleImage} />
          )}
          {modalInfos.message && <Message>{modalInfos.message}</Message>}
          {modalInfos.subMessage && (
            <SubMessage>{modalInfos.subMessage}</SubMessage>
          )}
        </InnerWrap>
        <ButtonWrap>{modalInfos.buttons}</ButtonWrap>
      </ModalWrap>
    </Modal>
  );
};

export default CustomModal;
