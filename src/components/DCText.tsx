import React from 'react';
import { StyleProp, ViewStyle, Platform, Text } from 'react-native';

interface Props {
  style?: StyleProp<ViewStyle>;
  children: string | React.ReactElement;
  isLight?: boolean;
  numberOfLines?: number;
}

const DCText: React.FC<Props> = ({
  style,
  children,
  numberOfLines,
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
    <Text
      allowFontScaling={false}
      style={[defaultStyle, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
};

export default DCText;
