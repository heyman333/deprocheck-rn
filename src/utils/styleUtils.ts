import { Dimensions, StyleProp, ViewStyle, Platform } from 'react-native';

export const isSmallDeviceSize = () => {
  const SE_WIDTH = 320;
  const SE_HEIGHT = 568;

  const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

  return D_WIDTH <= SE_WIDTH || D_HEIGHT <= SE_HEIGHT;
};

export const isIPhoneX = () => {
  // See https://mydevice.io/devices/ for device dimensions
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  const XSMAX_WIDTH = 414;
  const XSMAX_HEIGHT = 896;

  const { height: D_HEIGHT, width: D_WIDTH } = Dimensions.get('window');

  return (
    (Platform.OS === 'ios' &&
      ((D_HEIGHT === X_HEIGHT && D_WIDTH === X_WIDTH) ||
        (D_HEIGHT === X_WIDTH && D_WIDTH === X_HEIGHT))) ||
    ((D_HEIGHT === XSMAX_HEIGHT && D_WIDTH === XSMAX_WIDTH) ||
      (D_HEIGHT === XSMAX_WIDTH && D_WIDTH === XSMAX_HEIGHT))
  );
};

export function ifIPhoneX(
  iphoneXStyle: StyleProp<ViewStyle>,
  regularStyle: StyleProp<ViewStyle>
) {
  if (isIPhoneX()) {
    return iphoneXStyle;
  }
  return regularStyle;
}
