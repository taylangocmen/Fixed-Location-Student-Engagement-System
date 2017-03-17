import {Platform, Dimensions} from 'react-native';

export const config = {
  os: Platform.OS,
  window: Dimensions.get('window'),
  apiBaseUrl: 'http://ec2-54-213-241-203.us-west-2.compute.amazonaws.com',
  // TODO: remove this test user
  testUser: {
    username: "blah",
    pass_hash: "1234",
    token: '29f47c51cff22333914c11122e5f8a3547bbe5adffb43f8192e079cb5b9e6a2f'
  }
};