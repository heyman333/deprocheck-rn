import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';

import { toFullTimeKR } from '../utils/timeUtils';
import { AttendeeType } from '../interfaces';

import DCText from '../components/DCText';

const List = styled(FlatList as new () => FlatList<AttendeeType>).attrs({
  contentContainerStyle: { paddingBottom: 14 },
})``;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 52px;
`;

const MemberInfoText = styled(DCText)<{ flex: number }>`
  color: white;
  font-size: 14px;
  flex: ${({ flex }) => flex};
  text-align: center;
`;

const Separator = styled.View`
  height: 1px;
  background-color: white;
`;

const EmptyView = styled.View`
  justify-content: center;
  align-items: center;
  padding-top: 30px;
`;

const Desc = styled(DCText)`
  margin-bottom: 12px;
  color: white;
`;

interface Props {
  members: AttendeeType[];
  errorMsg?: string;
}

const AttendedMemberList: React.FC<Props> = ({ members, errorMsg }) => {
  const renderMembers = ({ item }: { item: AttendeeType }) => (
    <Row>
      <MemberInfoText flex={1}>{`${item.member.termNumber}기`}</MemberInfoText>
      <MemberInfoText flex={1}>{`${item.member.name}`}</MemberInfoText>
      <MemberInfoText flex={5}>{`${toFullTimeKR(
        item.createdAt
      )}`}</MemberInfoText>
    </Row>
  );

  const keyExtractor = (item: AttendeeType) => `${item.id}`;

  const renderSeparator = () => <Separator />;

  const renderEmpty = () => {
    let msg = errorMsg || '출석체크 한 회원이 없습니다';

    return (
      <EmptyView>
        <Desc>{msg}</Desc>
      </EmptyView>
    );
  };

  return (
    <List
      data={members}
      renderItem={renderMembers}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      ListEmptyComponent={renderEmpty}
    />
  );
};

export default AttendedMemberList;
