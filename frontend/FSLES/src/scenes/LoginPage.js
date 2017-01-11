import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {opacity} from '../utils/Functions'


export class LoginPage extends Component {
  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.cardContainer}>
          <Text style={styles.cardTitle}>
            Login
          </Text>
          <Text>
            Student #
          </Text>
          <Text>
            Password
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    paddingVertical: 70,
    paddingHorizontal: 40,
    backgroundColor: colors.backgroundJordyBlue
  },
  cardContainer: {
    flex: 1,
    backgroundColor: colors.basicWhite
  },
});
