import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import DCText from '../components/DCText';

const AttendBox = styled.View`
  width: 300px;
  height: 50px;
  justify-content: space-around;
  align-items: center;
  flex-direction: row;
`;

const AttendWeek = styled(DCText)`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: #222222;
`;

const AttendTime = styled(DCText)`
  font-size: 14px;
  letter-spacing: -0.28px;
  color: #222222;
`;

const LightBar = styled.View`
  width: 300px;
  height: 0;
  border: solid 1px #eeeeee;
`;

export default class AttendStatus extends Component {
  static defaultProps = {
    attendWeek: '1주차',
    attendTime: '2019년 5월 4일 14시 03분 37초',
  };

  render() {
    const { attendWeek, attendTime } = this.props;

    return (
      <View>
        <AttendBox>
          <AttendWeek>{attendWeek}</AttendWeek>
          <AttendTime>{attendTime}</AttendTime>
        </AttendBox>
        <LightBar/>
      </View>
    );
  }
}
