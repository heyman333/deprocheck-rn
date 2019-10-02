import React from 'react';
import styled from 'styled-components/native';
import { getInset } from 'react-native-safe-area-view';
import { Alert, BackHandler } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';
import { NavigationScreenComponent } from 'react-navigation';
import _partial from 'lodash/partial';

import {
  img_deprocheck_logo_2,
  baseline_place_24_px,
  icon_baseline_done,
  icon_baseline_close,
} from '../assets/images';
import { isSmallDeviceSize } from '../utils/styleUtils';
import { colors } from '../utils/theme';
import { AppContext, UserContext } from '../contexts';
import { reqeustAttend } from '../modules/attend';
import useLocation from '../hooks/useLocation';
import { getSessionInfos } from '../modules/session';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import ScreenWrap from '../components/ScreenWrap';
import MemberMapView from '../components/MemberMapView';

const HORIZONTAL_PADDING = isSmallDeviceSize() ? 16 : 38;

const Wrap = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Header = styled.View`
  flex: 1;
  padding: 40px ${HORIZONTAL_PADDING}px 0px ${HORIZONTAL_PADDING}px;
`;

const Body = styled.View`
  flex: 5;
`;

const SessionTextWrap = styled.View`
  margin: 0px ${HORIZONTAL_PADDING}px;
  margin-bottom: 8px;
`;

const SessionText = styled(DCText)`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: #222222;
  align-self: flex-start;
`;

//TODO: 중앙정렬 안되는 문제 해결하기
const LocationArea = styled.View`
  flex-direction: row;
  margin: 0px ${HORIZONTAL_PADDING}px 50px;
  border-bottom-width: 2px;
  border-bottom-color: ${colors.black};
  padding-bottom: 6px;
`;

const LocationIcon = styled.Image`
  width: 24px;
  align-self: flex-start;
`;

const LocationText = styled(DCText)`
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.36px;
  color: #222222;
  align-self: flex-start;
`;

const LogoImage = styled.Image`
  width: 220px;
  height: 35px;
`;

const Footer = styled(DCTouchable)`
  justify-content: center;
  align-items: center;
  height: 80px;
  height: ${getInset('bottom') + 80}px;
  background-color: ${({ theme }) => theme.reverseBackColor};
`;

const EnterText = styled(DCText)`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.36px;
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

const UserAttend: NavigationScreenComponent = () => {
  const currentLocation = useLocation({ latitude: 0, longitude: 0 });
  const [sessionAddress, setSessionAddress] = React.useState('');
  const { state: userState } = React.useContext(UserContext);
  const { dispatch } = React.useContext(AppContext);

  React.useEffect(() => {
    const getLastSession = async () => {
      try {
        const lastSession = await getSessionInfos();
        if (lastSession) {
          setSessionAddress(lastSession.address);
        }
      } catch (error) {
        console.log('error', error);
      }
    };
    getLastSession();
  });

  const onBackButtonPressAndroid = () => {
    Alert.alert('종료', '종료 할까요?', [
      { text: '네', onPress: BackHandler.exitApp },
      { text: '아니오' },
    ]);
    return true;
  };

  const toggleModal = (visible: boolean) => {
    dispatch({ type: 'SET_MODAL_VISIBLE', payload: { modalVisible: visible } });
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

  const onRequestAttend = async () => {
    const data = {
      latitude: currentLocation.latitude,
      longitude: currentLocation.longitude,
      name: userState.userInfo.name,
    };

    try {
      const result = await reqeustAttend(data);
      if (result) {
        modalOpen(true, '출석이 완료되었습니다.');
      }
    } catch (error) {
      console.log('error', error);
      if (error.response.status === 400) {
        modalOpen(false, '현재 출석할 수 있는 세션이 \n존재하지 않습니다');
        return;
      }
      if (error.response.status === 401) {
        modalOpen(false, '회원 정보가 정확하지 않습니다');
        return;
      }
      if (error.response.status === 403) {
        modalOpen(false, '아직 세션 장소 500m내에 \n위치해 있지 않습니다.');
      }
    }
  };

  return (
    <AndroidBackHandler onBackPress={onBackButtonPressAndroid}>
      <ScreenWrap forceInset={{ bottom: 'never' }}>
        <Wrap>
          <Header>
            <LogoImage source={img_deprocheck_logo_2} />
          </Header>

          <Body>
            <SessionTextWrap>
              <SessionText>오늘의 세션장소</SessionText>
            </SessionTextWrap>
            <LocationArea>
              <LocationIcon source={baseline_place_24_px} />
              <LocationText>{sessionAddress}</LocationText>
            </LocationArea>
            <MemberMapView />
          </Body>
          <Footer onPress={onRequestAttend}>
            <EnterText>출석하기</EnterText>
          </Footer>
        </Wrap>
      </ScreenWrap>
    </AndroidBackHandler>
  );
};

export default UserAttend;
