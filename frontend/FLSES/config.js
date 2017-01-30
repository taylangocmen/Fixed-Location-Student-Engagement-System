import {Platform, Dimensions} from 'react-native';

export const config = {
  os: Platform.OS,
  window: Dimensions.get('window'),
  apiBaseUrl: 'http://ec2-54-213-241-203.us-west-2.compute.amazonaws.com',
  // TODO: remove this test user
  testUser: {
    username: "blah",
    pass_hash: "1234",
    token: '311f3c38003b92ca304f29da76489b71d02d6cf8d2dd6bef32266faff7b98331'
  }
};