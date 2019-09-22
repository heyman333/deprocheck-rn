import React from 'react';
import { FlatList, Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-safe-area-view';

// import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import { toFullTimeKR } from '../utils/timeUtils';

const { height: DEVICE_HEIGHT } = Dimensions.get('window');

const List = styled(FlatList)`
  min-height: ${DEVICE_HEIGHT - getStatusBarHeight() - 260};
`;

const Row = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  height: 52px;
`;

// const Footer = styled.View`
//   justify-content: center;
//   align-items: center;
// `;

// const MoreButton = styled(DCTouchable)`
//   border: 1px solid white;
//   justify-content: center;
//   align-items: center;
// `;

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

interface Props {
  members: any;
}

const AttendedMemberList: React.FC<Props> = ({ members }) => {
  const renderMembers = ({ item }: { item: any }) => (
    <Row>
      <MemberInfoText flex={1}>{`${item.order}기`}</MemberInfoText>
      <MemberInfoText flex={1}>{`${item.name}`}</MemberInfoText>
      <MemberInfoText flex={5}>{`${toFullTimeKR(item.time)}`}</MemberInfoText>
    </Row>
  );

  const keyExtractor = (item: any, index: number) => `${item.name}-${index}`;

  const renderSeparator = () => <Separator />;

  // const renderFooter = () => {
  //   return (
  //     <Footer>
  //       <MoreButton onPress>
  //         <MemberInfoText>더 보기</MemberInfoText>
  //       </MoreButton>
  //     </Footer>
  //   );
  // };

  return (
    <List
      data={members}
      renderItem={renderMembers}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={renderSeparator}
      contentContainerStyle={{ paddingBottom: 24 }}
      // ListFooterComponent={renderFooter}
    />
  );
};

export default AttendedMemberList;
