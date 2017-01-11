import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

import {config} from '../../config';
import {TestIos} from '../components/TestIos';
import {TestAndroid} from '../components/TestAndroid';


export class FSLES extends Component {
  render() {
    return config.OS === 'ios' ?
      <TestIos />:
      <TestAndroid />;
  }
}
