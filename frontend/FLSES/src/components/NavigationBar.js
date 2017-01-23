import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity, Navigator} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';


export class NavigationBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Navigator.NavigationBar
        style={styles.navigationBarContainer}
        {...this.props}
      />
    );
  }
}

const styles = StyleSheet.create({
  navigationBarContainer: {
    backgroundColor: colors.officialPrussianBlue,
    height: 60,
  },
});
