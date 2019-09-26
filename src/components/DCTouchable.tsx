import React from 'react';
import { NativeScrollRectangle, TouchableOpacity } from 'react-native';
import Touchable from 'react-native-platform-touchable';

import { StyleProp, ViewStyle } from 'react-native';

interface Props {
  onPress: () => void;
  children: React.ReactElement[] | React.ReactElement;
  style?: StyleProp<ViewStyle>;
  hitSlop?: NativeScrollRectangle;
  noEffect?: boolean;
}

export const DCTouchable: React.FC<Props> = ({
  children,
  onPress,
  style,
  hitSlop,
  noEffect,
}) => {
  const _onPress = () => {
    requestAnimationFrame(onPress);
  };

  if (noEffect) {
    return (
      <TouchableOpacity
        style={style}
        onPress={_onPress}
        activeOpacity={0.75}
        hitSlop={hitSlop}
      >
        {children}
      </TouchableOpacity>
    );
  }

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
