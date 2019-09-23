import React from 'react';
import styled from 'styled-components/native';
import { Dimensions } from 'react-native';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import ScreenWrap from '../components/ScreenWrap';
import AttendStatus from '../components/AttendStatus';
import { navigate } from '../navigators/NavigationService';

import { img_deprocheck_logo_2 } from '../assets/images';

const Wrap = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Body = styled.View`
  justify-content: center;
  flex-direction: column;
  align-items: center;
`;

//TODO: 중앙정렬 안되는 문제 해결하기
const UserNameArea = styled.View`
  display: flex;
  flex-direction: row;
  margin: 6px;
  align-items: flex-start;
  justify-content: flex-start;
  width: 300px;
`;

const UserNameText = styled(DCText)`
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
  margin-bottom: 33px;
`;

const LogoImage = styled.Image`
  width: 220px;
  align-self: flex-start;
  margin-bottom: 58px;
  margin-top: 45px;
  margin-left: ${(Dimensions.get('window').width - 300) / 2};
  height: 35px;
`;

const MoreButton = styled(DCTouchable)`
  width: 130px;
  height: 50px;
  background-color: #222222;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 50px;
`;

const MoreButtonText = styled(DCText)`
  font-size: 14px;
  font-weight: bold;
  letter-spacing: -0.28px;
  color: #ffffff;
`;

const UserAttend: React.FC = () => {
  const onLogin = () => {
    navigate('Home');
  };

  return (
    <ScreenWrap>
      <Wrap>
        <Body>
          <LogoImage source={img_deprocheck_logo_2} />

          <UserNameArea>
            <UserNameText>김프만님의 출석현황</UserNameText>
          </UserNameArea>
          <Bar />

          <AttendStatus
            attendWeek="1주차"
            attendTime="2019년 5월 4일 14시 03분 37초"
          />
          <AttendStatus
            attendWeek="2주차"
            attendTime="2019년 5월 4일 14시 03분 37초"
          />
          <AttendStatus
            attendWeek="3주차"
            attendTime="2019년 5월 18일 14시 03분 37초"
          />
          <AttendStatus
            attendWeek="4주차"
            attendTime="2019년 5월 4일 14시 03분 37초"
          />
          <AttendStatus
            attendWeek="5주차"
            attendTime="2019년 5월 4일 14시 03분 37초"
          />
          <AttendStatus
            attendWeek="6주차"
            attendTime="2019년 5월 18일 14시 03분 37초"
          />
          <AttendStatus
            attendWeek="7주차"
            attendTime="2019년 5월 18일 14시 03분 37초"
          />

          <MoreButton onPress={onLogin}>
            <MoreButtonText>더보기</MoreButtonText>
          </MoreButton>
        </Body>
      </Wrap>
    </ScreenWrap>
  );
};

export default UserAttend;
