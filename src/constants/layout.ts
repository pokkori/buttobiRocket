import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const LAYOUT = {
  screenWidth: width,
  screenHeight: height,
  gameAreaPadding: 0,
  hudHeight: 50,
  buttonSize: 48,
  stageGridColumns: 4,
  stageGridRows: 5,
} as const;
