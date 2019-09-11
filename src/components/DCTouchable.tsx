import React from 'react';
import { NativeScrollRectangle } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  onPress: () => void;
  children: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  hitSlop?: NativeScrollRectangle;
}

// TODO: 안드로이드 기기 확인 후 리플 등 필요한 버튼 기능 넣기
export const DCTouchable: React.FC<Props> = ({
  children,
  onPress,
  style,
  hitSlop,
}) => {
  return (
    <Touchable
      style={style}
      onPress={onPress}
      activeOpacity={0.75}
      hitSlop={hitSlop}
    >
      {children}
    </Touchable>
  );
};

export default DCTouchable;
