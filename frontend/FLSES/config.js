import {Platform, Dimensions} from 'react-native';

export const config = {
  os: Platform.OS,
  window: Dimensions.get('window'),
  apiBaseUrl: 'http://ec2-54-213-241-203.us-west-2.compute.amazonaws.com',
  // TODO: remove this test user
  testUser: {
    username: "blah",
    pass_hash: "1234",
    token: '8866dc3c469d1d5d3fcc8f684519ba35f0f059d777f6281f314d5373ababc07a'
  }
};