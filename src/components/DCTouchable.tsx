import React from 'react';
import Touchable from 'react-native-platform-touchable';
import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  onPress: () => void;
  children: React.ReactElement;
  style?: StyleProp<ViewStyle>;
}

// TODO: 안드로이드 기기 확인 후 리플 등 필요한 버튼 기능 넣기
export const DCTouchable: React.FC<Props> = ({ children, onPress, style }) => {
  return (
    <Touchable style={style} onPress={onPress} activeOpacity={0.75}>
      {children}
    </Touchable>
  );
};

export default DCTouchable;
