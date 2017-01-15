import {Platform, Dimensions} from 'react-native';

export const config = {
  os: Platform.OS,
  window: Dimensions.get('window'),
};