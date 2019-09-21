import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';

import { toYYMMDDKR } from '../utils/timeUtils';
import { sessionDateInfos } from '../datas/SessionDateInfo';
import { AppContext } from '../contexts';
import {
  img_deprocheck_white,
  icon_menu_bar,
  icon_arrow_down,
} from '../assets/images';
import { isSmallDeviceSize } from '../utils/styleUtils';
import { colors } from '../utils/theme';

import ScreenWrap from '../components/ScreenWrap';
import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import DateSelectModal from '../components/DateSelectModal';
import AttendStateJobSelector from '../components/AttendStateJobSelector';
import { SessionDateType, ShowJobType } from '../interfaces';

const HORIZONTAL_PADDING = isSmallDeviceSize() ? 16 : 38;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px ${HORIZONTAL_PADDING}px 0px ${HORIZONTAL_PADDING}px;
`;

const Logo = styled.Image.attrs({ source: img_deprocheck_white })`
  width: 200px;
  height: 32px;
`;

const MenuBar = styled.Image.attrs({ source: icon_menu_bar })``;

const MenuButton = styled(DCTouchable).attrs({
  hitSlop: { top: 10, right: 10, bottom: 10, left: 10 },
})``;

const Wrap = styled.View`
  flex: 1;
  background-color: ${colors.black};
`;

const Body = styled.View`
  padding: ${HORIZONTAL_PADDING}px;
`;

const Title = styled(DCText)`
  font-weight: bold;
  margin-bottom: 12px;
  color: white;
`;

const SessionDateInfoView = styled(DCTouchable).attrs({ noEffect: true })`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-bottom-color: #e5e5e5;
  border-bottom-width: 2px;
  padding-bottom: 13px;
  margin-bottom: 31px;
`;

const DateText = styled(DCText)`
  color: white;
  font-size: 16px;
  color: white;
  margin-right: 8px;
`;

const ArrowDownImage = styled.Image.attrs({ source: icon_arrow_down })`
  width: 11px;
  height: 7px;
  margin-top: 5px;
`;

const AdminShowAttendState: NavigationScreenComponent = () => {
  const { dispatch } = React.useContext(AppContext);
  const [sessionDateInfo, setSessionDateInfo] = React.useState(
    sessionDateInfos[0]
  );
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [jobType, setJobType] = React.useState(ShowJobType.ALL);

  const curretWeek = sessionDateInfos.findIndex(
    item => item.startTime === sessionDateInfo.startTime
  );

  const onPressTime = () => {
    setIsModalVisible(true);
  };

  const onConfirm = (item: SessionDateType) => {
    setSessionDateInfo(item);
    setIsModalVisible(false);
  };

  const onClose = () => {
    setIsModalVisible(false);
  };

  const onPressMenu = () => {
    dispatch({ type: 'SET_TAB_VISIBLE', payload: { tabVisible: true } });
  };

  const onPressType = (type: ShowJobType) => {
    setJobType(type);
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
          <Title>출석현황</Title>
          <SessionDateInfoView onPress={onPressTime}>
            <DateText>{`${curretWeek + 1}주차 ${toYYMMDDKR(
              sessionDateInfo.startTime
            )}`}</DateText>
            <ArrowDownImage />
          </SessionDateInfoView>
          <AttendStateJobSelector onPressType={onPressType} type={jobType} />
        </Body>
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

export default AdminShowAttendState;
