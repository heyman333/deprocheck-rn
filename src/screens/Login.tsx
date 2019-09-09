import React from 'react';
import styled from 'styled-components/native';

import DCTouchable from '../components/DCTouchable';
import DCText from '../components/DCText';
import ScreenWrap from '../components/ScreenWrap';
import SwitchToggle from '../components/SwitchToggle';
import { navigate } from '../navigators/NavigationService';
import { AppContext } from '../contexts/AppContext';
import { img_deprocheck_logo } from '../assets/images';

const Wrap = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.background};
`;

const Header = styled.View`
  padding: 38px;
`;

const Body = styled.View`
  justify-content: center;
  align-items: center;
`;

const BottomButton = styled(DCTouchable)`
  background-color: ${({ theme }) => theme.background};
`

const LogoImage = styled.Image`
  width: 220px;
  margin-bottom: 75px;
`;

//TODO: placeholder 스타일 적용 안됨
const NameInput = styled.TextInput`
  box-shadow: none;
  background-color: transparent;
  width: 300px;
  height: 50px;
  font-size: 14px;
  borderBottomColor: #222222;
  borderBottomWidth: 2px;
  
  ::placeholder {
    color: #222222;
    font-size: 14px;
  }
`;

const JobButtonContainer = styled.View`
  margin-top: 20px;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const JobButton = styled.TouchableOpacity`
  width: 150px;
  height: 50px;
  border: solid 1px #dddddd;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const JobText = styled.Text`
  color: #222222;
  font-weight: 500;
  font-size: 14px;
  letter-spacing: -0.3px;
`

const Footer = styled(DCTouchable)`
  display: flex;
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

const BottomText = styled(DCText)`
  color: ${({ theme }) => theme.background};
`;

const StyledToggle = styled(SwitchToggle).attrs(({ theme }) => ({
  circleColorOn: theme.background,
  circleColorOff: theme.background,
  backgroundColorOn: theme.reverseBackColor,
  backgroundColorOff: theme.reverseBackColor,
}))``;

const Logo = styled.Image.attrs({ source: img_deprocheck_logo })`
  width: 220px;
  height: 153px;
  width: 100%;
  height: 80px;
  background-color: #222222;
`;

const EnterText = styled.Text`
  color: #ffffff;
  font-size: 18px;
  font-weight: bold;
  letter-spacing: -0.36px;
`;

const Login: React.FC = () => {
  const onLogin = () => {
    navigate('UserStatus');
  };

  const { state, dispatch } = React.useContext(AppContext);

  const onPressToggle = () => {
    if (state.theme === 'ADMIN') {
      dispatch({ type: 'change-theme', payload: { theme: 'MEMBER' } });
      return;
    }

    dispatch({ type: 'change-theme', payload: { theme: 'ADMIN' } });
  };

  return (
    <ScreenWrap>
      <Wrap>
        <Header>
          <StyledToggle
            switchOn={state.theme === 'ADMIN'}
            onPress={onPressToggle}
          />
        </Header>
        <Body>{state.theme === 'MEMBER' && <Logo />}</Body>
        <BottomButton onPress={onLogin}>
          <BottomText>로그인하기</BottomText>
        </BottomButton>
        <LogoImage
          source={require('../assets/images/deprocheck-logo.png')}
          width={220}
        />

        <NameInput
          placeholder={`이름을 입력해주세요`}
        />

        <JobButtonContainer>
          <JobButton
            // onClick={onClickJob(true)}
            // active={deginerSelected === true}
          >
            <JobText>Designer</JobText>
          </JobButton>
          <JobButton
            // onClick={onClickJob(false)}
            // active={deginerSelected === false}
            style={{ borderLeftWidth: 0 }}
          >
            <JobText>Developer</JobText>
          </JobButton>
        </JobButtonContainer>


        <Footer onPress={onLogin}>
          <EnterText>입장하기</EnterText>
        </Footer>
      </Wrap>
    </ScreenWrap>
  );
};

export default Login;
