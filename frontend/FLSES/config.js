import {Platform, Dimensions} from 'react-native';

export const config = {
  os: Platform.OS,
  window: Dimensions.get('window'),
  // apiBaseUrl: 'http://ece496.cgaqufxgrmkh.us-west-2.rds.amazonaws.com/',
  // apiBaseUrl: 'ec2-54-213-241-203.us-west-2.compute.amazonaws.com/',
  apiBaseUrl: 'http://ec2-54-213-241-203.us-west-2.compute.amazonaws.com/',
};