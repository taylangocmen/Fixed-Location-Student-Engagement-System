import React from 'react';
import {StyleSheet, View} from 'react-native';

import * as colors from '../styling/Colors';


export class VerticalDivider extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={styles.vertical}/>;
  }
}

const styles = StyleSheet.create({
  vertical: {
    // marginHorizontal: 2,
    borderWidth: 1,
    borderColor: colors.accentJordyBlue,
  }
});
