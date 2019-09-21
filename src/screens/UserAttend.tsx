import React from 'react';
import styled from 'styled-components/native';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import ScreenWrap from '../components/ScreenWrap';
import MyMapView from '../components/MyMapView';

import { navigate } from '../navigators/NavigationService';
import { AppContext } from '../contexts/AppContext';

import { img_deprocheck_logo_2, baseline_place_24_px } from '../assets/images';



const Wrap = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Body = styled.View`
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SessionTextWrap = styled.View`
  width: 300px;
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
  display: flex;
  flex-direction: row;
  margin: 7px;
  align-items: flex-start;
  justify-content: flex-start;
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

const BottomButton = styled(DCTouchable)`
  background-color: ${({ theme }) => theme.background};
`

const LogoImage = styled.Image`
  width: 220px;
  height: 35px
  margin-bottom: 75px;
  margin-top: 50px;
  margin-left: 35px;
`;

const Footer = styled(DCTouchable)`
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  justify-content: center;
  align-items: center;
  height: 80px;
  background-color: ${({ theme }) => theme.reverseBackColor};
`;

// const Logo = styled.Image.attrs({ source: img_deprocheck_logo_2 })`
//   width: 220px;
//   height: 153px;
//   width: 100%;
//   height: 80px;
//   background-color: #222222;
// `;

const EnterText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.36px;
`;

const UserAttend: React.FC = () => {
  const onLogin = () => {
    navigate('UserStatus');
  };

  const { state } = React.useContext(AppContext);

  return (
    <ScreenWrap>
      <Wrap>
        <LogoImage
          source={img_deprocheck_logo_2}
        />

        <Body>
          <SessionTextWrap>
            <SessionText>오늘의 세션장소</SessionText>
          </SessionTextWrap>

          <LocationArea>
            <LocationIcon
              source={baseline_place_24_px}
            />
            <LocationText>서울시 강남구 논현로 22길</LocationText>
          </LocationArea>
          <Bar/>
          <HelpBox>
            <HelpText>
              현위치를 눌러 출석하기를 완료해주세요!
            </HelpText>
          </HelpBox>


        </Body>

        <MyMapView/>

        <Footer onPress={onLogin}>
            <EnterText>출석하기</EnterText>
        </Footer>
      </Wrap>
    </ScreenWrap>
  );
};

export default UserAttend;