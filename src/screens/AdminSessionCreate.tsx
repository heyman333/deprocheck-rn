import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';

import { SessionDateType } from '../interfaces/sessionDate';
import { AppContext } from '../contexts';
import { colors } from '../utils/theme';
import { isSmallDeviceSize } from '../utils/styleUtils';
import { toYYMMDDKR, toAclockTime } from '../utils/timeUtils';
import { sessionDateInfos } from '../datas/SessionDateInfo';
import {
  img_deprocheck_white,
  icon_menu_bar,
  icon_plus,
} from '../assets/images';
import ScreenWrap from '../components/ScreenWrap';
import DCText from '../components/DCText';
import DCTouchable from '../components/DCTouchable';
import DateSelectModal from '../components/DateSelectModal';

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
  height: 80px;
  background-color: white;
`;

const BottomText = styled(DCText)`
  color: ${colors.black};
  font-weight: bold;
`;

const AdminSessionCreate: NavigationScreenComponent = () => {
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

  const onPressBottomButton = () => {
    // TODO: API 콜
  };

  const onConfirm = (item: SessionDateType) => {
    setSessionDateInfo(item);
    setIsModalVisible(false);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  return (
    <ScreenWrap mode="ADMIN">
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
        <BottomButton onPress={onPressBottomButton}>
          <BottomText>일정 생성하기</BottomText>
        </BottomButton>
        <DateSelectModal
          isVisible={isModalVisible}
          data={sessionDateInfos}
          onConfirm={onConfirm}
          onClose={onClose}
        />
      </Wrap>
    </ScreenWrap>
  );
};

export default AdminSessionCreate;
