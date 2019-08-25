import React from 'react';
import { StyleProp, ViewStyle, Platform, Text } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: string | React.ReactElement;
}

const DCText: React.FC<Props> = ({ style, children }: Props) => {
  const defaultStyle = Platform.select({
    ios: { fontFamily: 'AppleSDGothicNeo-Regular' },
    android: {
      fontFamily: 'sans-serif',
      includeFontPadding: false,
    },
  });

  return (
    <Text allowFontScaling={false} style={[defaultStyle, style]}>
      {children}
    </Text>
  );
};

export default DCText;
