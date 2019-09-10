import React from 'react';
import { StyleProp, ViewStyle, Platform, Text } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: string | React.ReactElement;
  isLight?: boolean;
}

const DCText: React.FC<Props> = ({
  style,
  children,
  isLight = false,
}: Props) => {
  const defaultStyle = Platform.select({
    ios: {
      fontFamily: isLight ? 'NotoSansCJKkr-Light' : 'NotoSansCJKkr-Regular',
    },
    android: {
      fontFamily: isLight ? 'NotoSansKR-Light' : 'NotoSansKR-Regular',
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
