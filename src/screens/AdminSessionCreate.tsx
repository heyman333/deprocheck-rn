import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';
import { getInset } from 'react-native-safe-area-view';
import _partial from 'lodash/partial';

import { SessionDateType } from '../interfaces';
import { AppContext, UserContext } from '../contexts';
import { colors } from '../utils/theme';
import { isSmallDeviceSize } from '../utils/styleUtils';
import { toYYMMDDKR, toAclockTime } from '../utils/timeUtils';
import { sessionDateInfos } from '../datas/SessionDateInfo';
import {
  img_deprocheck_white,
  icon_menu_bar,
  icon_plus,
  icon_baseline_done,
  icon_baseline_close,
} from '../assets/images';
import { createSession } from '../modules/session';

import ScreenWrap from '../components/ScreenWrap';
import DCText from '../components/DCText';
import DCTouchable from '../components/DCTouchable';
import DateSelectModal from '../components/DateSelectModal';
import AdminMapView from '../components/AdminMapView';

interface LatLng {
  latitude: number;
  longitude: number;
}

const HORIZONTAL_PADDING = isSmallDeviceSize() ? 16 : 38;

const Wrap = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px ${HORIZONTAL_PADDING}px 0px ${HORIZONTAL_PADDING}px;
`;

const Body = styled.View`
  padding: ${HORIZONTAL_PADDING}px;
`;

const SessionDateTitle = styled(DCText)`
  font-weight: bold;
  margin-bottom: 12px;
  color: white;
`;

const SessionDateInfoView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 2px;
  padding-bottom: 13px;
`;

const Logo = styled.Image.attrs({ source: img_deprocheck_white })`
  width: 200px;
  height: 32px;
`;

const MenuBar = styled.Image.attrs({ source: icon_menu_bar })``;

const MenuButton = styled(DCTouchable).attrs({
  hitSlop: { top: 10, right: 10, bottom: 10, left: 10 },
})``;

const DateTimeView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DateText = styled(DCText)`
  color: white;
  font-size: 16px;
  color: white;
  margin-right: 20px;
`;

const TimeText = styled(DCText)`
  color: white;
  font-size: 16px;
  color: #999999;
`;

const PlusImageView = styled(DCTouchable).attrs({
  hitSlop: { top: 10, left: 10, bottom: 10, right: 10 },
})`
  border-radius: 8px;
  width: 16px;
  height: 16px;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const PlusImage = styled.Image.attrs({ source: icon_plus })``;

const BottomButton = styled(DCTouchable)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  height: ${getInset('bottom') + 80}px;
  background-color: white;
`;

const BottomText = styled(DCText)`
  color: ${colors.black};
  font-weight: bold;
`;

const OkButton = styled(DCTouchable)`
  flex: 1;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
`;

const RetryButton = styled(DCTouchable)`
  flex: 1;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
  border-right-width: 1px;
  border-right-color: #eeeeee;
`;

const OkText = styled(DCText)`
  color: ${colors.blue};
  font-weight: bold;
`;

const RetryText = styled(DCText)`
  color: ${colors.gray};
  font-weight: bold;
`;

const ModalButton = styled(DCTouchable)`
  flex: 1;
  padding: 15px 0;
  justify-content: center;
  align-items: center;
`;

const ModalText = styled(DCText)`
  color: ${colors.blue};
  font-weight: bold;
`;

const AdminSessionCreate: NavigationScreenComponent = () => {
  const { state } = React.useContext(UserContext);
  const { dispatch } = React.useContext(AppContext);
  const [sessionDateInfo, setSessionDateInfo] = React.useState(
    sessionDateInfos[0]
  );
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const { startTime, endTime } = sessionDateInfo;
  const curretWeek = sessionDateInfos.findIndex(
    item => item.startTime === sessionDateInfo.startTime
  );

  const onPressMenu = () => {
    dispatch({ type: 'SET_TAB_VISIBLE', payload: { tabVisible: true } });
  };

  const onPressPlus = () => {
    setIsModalVisible(true);
  };

  const toggleModal = (visible: boolean) => {
    dispatch({ type: 'SET_MODAL_VISIBLE', payload: { modalVisible: visible } });
  };

  const openConfirmModal = () => {
    const {
      userInfo: { sessionInfo },
    } = state;

    if (!sessionInfo) {
      modalOpen(false, '세션위치를 정해주세요');
      return;
    }

    dispatch({
      type: 'SET_MODAL_INFO',
      payload: {
        modalInfos: {
          titleImage: icon_baseline_done,
          message: `${toYYMMDDKR(sessionDateInfo.startTime)} 세션장소는 
${sessionInfo.sessionAddress} 입니다`,
          buttons: [
            <RetryButton
              onPress={_partial(toggleModal, false)}
              key="RetryButton"
            >
              <RetryText>다시하기</RetryText>
            </RetryButton>,
            <OkButton onPress={onCreateSession} key="OkButton">
              <OkText>맞아요!</OkText>
            </OkButton>,
          ],
        },
      },
    });
    toggleModal(true);
  };

  const modalOpen = (suc: boolean = true, message: string) => {
    let titleImage = icon_baseline_done;

    if (!suc) {
      titleImage = icon_baseline_close;
    }

    dispatch({
      type: 'SET_MODAL_INFO',
      payload: {
        modalInfos: {
          titleImage,
          message,
          buttons: (
            <ModalButton onPress={_partial(toggleModal, false)}>
              <ModalText>확인</ModalText>
            </ModalButton>
          ),
        },
      },
    });
    toggleModal(true);
  };

  const onCreateSession = async () => {
    if (!state.userInfo.sessionInfo) {
      modalOpen(false, '세션위치가 정확하지 않습니다');
      return;
    }

    const {
      userInfo: { sessionInfo },
    } = state;

    const data = {
      address: sessionInfo.sessionAddress,
      date: sessionDateInfo.startTime.toISOString(),
      from: sessionDateInfo.startTime.toISOString(),
      latitude: sessionInfo.sessionLocation.latitude,
      longitude: sessionInfo.sessionLocation.longitude,
      name: '세션장소',
      to: sessionDateInfo.endTime.toISOString(),
    };

    try {
      const result = await createSession(data);
      if (result) {
        modalOpen(true, '세선을 생성했습니다');
      }
    } catch (error) {
      modalOpen(false, '세선생성에 실패 했습니다');
      console.log('error', error);
    }
  };

  const onConfirm = (item: SessionDateType) => {
    setSessionDateInfo(item);
    setIsModalVisible(false);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  return (
    <ScreenWrap forceInset={{ bottom: 'never' }}>
      <Wrap>
        <Header>
          <Logo />
          <MenuButton onPress={onPressMenu}>
            <MenuBar />
          </MenuButton>
        </Header>
        <Body>
          <SessionDateTitle>{`${curretWeek +
            1}주차 세션일정`}</SessionDateTitle>
          <SessionDateInfoView>
            <DateTimeView>
              <DateText>{`${toYYMMDDKR(startTime)}`}</DateText>
              <TimeText>
                {`${toAclockTime(startTime)} ~ ${toAclockTime(endTime)}`}
              </TimeText>
            </DateTimeView>
            <PlusImageView onPress={onPressPlus}>
              <PlusImage />
            </PlusImageView>
          </SessionDateInfoView>
        </Body>
        <BottomButton onPress={openConfirmModal}>
          <BottomText>일정 생성하기</BottomText>
        </BottomButton>
        <AdminMapView />
      </Wrap>
      <DateSelectModal
        isVisible={isModalVisible}
        data={sessionDateInfos}
        onConfirm={onConfirm}
        onClose={onClose}
      />
    </ScreenWrap>
  );
};

export default AdminSessionCreate;
