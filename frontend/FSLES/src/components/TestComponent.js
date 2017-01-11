import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

import {config} from '../../config';
import {LoginPage} from '../scenes/LoginPage'


export class TestComponent extends Component {
  render() {
    return (
      // <View style={styles.container}>
      //   <Text style={styles.welcome}>
      //     This device's OS is {config.os}
      //   </Text>
      //   <Text style={styles.instructions}>
      //     The width: {config.window.width}, the height: {config.window.height}
      //   </Text>
      //   <Text style={styles.instructions}>
      //     The component is updated at 9:49
      //   </Text>
      // </View>
      <LoginPage />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
