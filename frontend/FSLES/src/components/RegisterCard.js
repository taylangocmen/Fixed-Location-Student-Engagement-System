import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';

export class RegisterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <Text>
          RegisterCard
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {

  }
});
