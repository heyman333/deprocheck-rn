import React from 'react';
import styled from 'styled-components/native';
import { getInset } from 'react-native-safe-area-view';


import { Alert, BackHandler } from 'react-native';
import { AndroidBackHandler } from 'react-navigation-backhandler';

// import AppContext from '../contexts/AppContext';
import { navigate } from '../navigators/NavigationService';
import { img_deprocheck_logo_2, baseline_place_24_px } from '../assets/images';
import { isSmallDeviceSize } from '../utils/styleUtils';
import { colors } from '../utils/theme';

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

const Bar = styled.View`
  width: 300px;
  height: 0;
  border: solid 1.2px #222222;
`;

const HelpBox = styled.View`
  width: 226px;
  height: 26px;
  border-radius: 13px;
  background-color: #eeeeee;
  justify-content: center;
  align-items: center;
  margin-top: 48px;
`

const HelpText = styled(DCText)`
  font-size: 12px;
  letter-spacing: -0.24px;
  color: #222222;
`
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

const UserAttend: React.FC = () => {
  const onLogin = () => {
    navigate('UserStatus');
  };

  const onBackButtonPressAndroid = () => {
    Alert.alert('종료', '종료 할까요?', [
      { text: '네', onPress: BackHandler.exitApp },
      { text: '아니오' },
    ]);
    return true;
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
              <LocationText>서울시 강남구 논현로 22길</LocationText>
            </LocationArea>
            <Bar/>
            <HelpBox>
              <HelpText>
                현위치를 눌러 출석하기를 완료해주세요!
              </HelpText>
            </HelpBox>
            <MemberMapView />
          </Body>
          <Footer onPress={onLogin}>
            <EnterText>출석하기</EnterText>
          </Footer>
        </Wrap>
      </ScreenWrap>
    </AndroidBackHandler>
  );
};

export default UserAttend;
