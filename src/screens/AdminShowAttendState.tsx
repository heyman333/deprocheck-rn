import React from 'react';
import styled from 'styled-components/native';
import { NavigationScreenComponent } from 'react-navigation';

import { toYYMMDDKR, toYYYYMMDD } from '../utils/timeUtils';
import { sessionDateInfos } from '../datas/SessionDateInfo';
import { AppContext } from '../contexts';
import {
  img_deprocheck_white,
  icon_menu_bar,
  icon_arrow_down,
} from '../assets/images';
import { isSmallDeviceSize } from '../utils/styleUtils';
import { colors } from '../utils/theme';
import { getAttendances } from '../modules/session';
import { getSessionDateInfos } from '../modules/firebase';

import ScreenWrap from '../components/ScreenWrap';
import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import DateSelectModal from '../components/DateSelectModal';
import AttendedMemberList from '../components/AttendedMemberList';
import AttendStateJobSelector from '../components/AttendStateJobSelector';
import {
  SessionDateType,
  ShowJobType,
  AttendeeType,
  FBSessionTimes,
} from '../interfaces';

const HORIZONTAL_PADDING = isSmallDeviceSize() ? 16 : 38;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 40px ${HORIZONTAL_PADDING}px 0px ${HORIZONTAL_PADDING}px;
`;

const ListWrap = styled.View`
  flex: 1;
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
  flex: 1;
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
  const [sessionDates, setSessionDates] = React.useState(sessionDateInfos);
  const [sessionDateInfo, setSessionDateInfo] = React.useState(sessionDates[0]);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [jobType, setJobType] = React.useState(ShowJobType.ALL);
  const [members, setMembers] = React.useState<AttendeeType[]>([]);
  const [errorMsg, setErrorMsg] = React.useState<string | undefined>(undefined);

  React.useEffect(() => {
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

    try {
      getSessionDateInfoFromFB();
    } catch (error) {
      console.log(error);
    }
  }, []);

  React.useEffect(() => {
    getAttendInfo(toYYYYMMDD(sessionDateInfo.startTime));
  }, [sessionDateInfo]);

  const getAttendInfo = async (date: string) => {
    try {
      const data: AttendeeType[] = await getAttendances(date);
      setMembers(data);
      setErrorMsg(undefined);
    } catch (error) {
      setMembers([]);
      if (error.response.status === 404) {
        setErrorMsg('해당날짜에 세션이 없습니다');
      }
    }
  };

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

  const filteredMembers = members.filter(({ member }) => {
    if (jobType === ShowJobType.ALL) {
      return true;
    }

    return member.jobGroup === jobType;
  });

  return (
    <ScreenWrap>
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
          <ListWrap>
            <AttendedMemberList members={filteredMembers} errorMsg={errorMsg} />
          </ListWrap>
        </Body>

        <DateSelectModal
          isVisible={isModalVisible}
          data={sessionDates}
          onConfirm={onConfirm}
          onClose={onClose}
        />
      </Wrap>
    </ScreenWrap>
  );
};

export default AdminShowAttendState;
