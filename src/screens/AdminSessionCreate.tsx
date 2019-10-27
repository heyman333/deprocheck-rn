import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';
import { getInset } from 'react-native-safe-area-view';
import _partial from 'lodash/partial';
import _defaultTo from 'lodash/defaultTo';
import { FBSessionTimes } from '../interfaces';

import { toISOString } from '../utils/timeUtils';
import { SessionDateType } from '../interfaces';
import { AppContext, UserContext } from '../contexts';
import { colors } from '../utils/theme';
import { isSmallDeviceSize } from '../utils/styleUtils';
import { toYYMMDDKR, toAclockTime } from '../utils/timeUtils';
import {
  img_deprocheck_white,
  icon_menu_bar,
  icon_plus,
  icon_baseline_done,
  icon_baseline_close,
} from '../assets/images';
import { createSession } from '../modules/session';
import { getSessionDateInfos } from '../modules/firebase';

import ScreenWrap from '../components/ScreenWrap';
import DCText from '../components/DCText';
import DCTouchable from '../components/DCTouchable';
import DateSelectModal from '../components/DateSelectModal';
import AdminMapView from '../components/AdminMapView';
import LoadingCover from '../components/LoadingCover';

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
  const [sessionDates, setSessionDates] = React.useState([]);
  const [sessionDateInfo, setSessionDateInfo] = React.useState<SessionDateType>(
    sessionDates[0]
  );
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const currentWeek = _defaultTo(
    sessionDates.findIndex(
      item =>
        item.startTime === (sessionDateInfo ? sessionDateInfo.startTime : null)
    ),
    0
  );

  const getSessionDateInfoFromFB = async () => {
    const dateInfos = (await getSessionDateInfos()) as {
      dats: FBSessionTimes[];
    };

    const sessionDatesFB = dateInfos.dats.map(date => ({
      startTime: date.startTime.toDate(),
      endTime: date.endTime.toDate(),
    }));
    setSessionDates(sessionDatesFB);
    setSessionDateInfo(sessionDatesFB[0]);
  };

  React.useEffect(() => {
    try {
      getSessionDateInfoFromFB();
    } catch (error) {
      console.log(error);
    }
  }, []);

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
      date: toISOString(sessionDateInfo.startTime),
      from: toISOString(sessionDateInfo.startTime),
      latitude: sessionInfo.sessionLocation.latitude,
      longitude: sessionInfo.sessionLocation.longitude,
      name: '세션장소',
      to: toISOString(sessionDateInfo.endTime),
    };

    try {
      const result = await createSession(data);
      if (result) {
        modalOpen(true, '세선을 생성했습니다');
      }
    } catch (error) {
      modalOpen(false, error.response.data);
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
          <SessionDateTitle>{`${currentWeek +
            1}주차 세션일정`}</SessionDateTitle>
          <SessionDateInfoView>
            {sessionDateInfo && (
              <DateTimeView>
                <DateText>{`${toYYMMDDKR(
                  sessionDateInfo.startTime
                )}`}</DateText>
                <TimeText>
                  {`${toAclockTime(sessionDateInfo.startTime)} ~ ${toAclockTime(
                    sessionDateInfo.endTime
                  )}`}
                </TimeText>
              </DateTimeView>
            )}
            <PlusImageView onPress={onPressPlus}>
              <PlusImage />
            </PlusImageView>
          </SessionDateInfoView>
        </Body>
        <AdminMapView />
        <BottomButton onPress={openConfirmModal}>
          <BottomText>일정 생성하기</BottomText>
        </BottomButton>
      </Wrap>
      <DateSelectModal
        isVisible={isModalVisible}
        data={sessionDates}
        onConfirm={onConfirm}
        onClose={onClose}
      />
      {!sessionDateInfo && <LoadingCover />}
    </ScreenWrap>
  );
};

export default AdminSessionCreate;
