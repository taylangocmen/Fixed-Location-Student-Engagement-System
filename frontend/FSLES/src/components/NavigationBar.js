import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';


export class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    return (
      <View style={styles.navigationBarContainer}>
        <View style={styles.leftContainer}>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {this.props.title}
          </Text>
        </View>
        <View style={styles.rightContainer}>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.officialPrussianBlue,
    height: 50,
  },
  titleContainer: {

  },
  leftContainer: {

  },
  rightContainer: {

  },
  titleText: {
    color: colors.basicWhite,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center'
  },
});
