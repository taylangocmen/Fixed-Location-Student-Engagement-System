import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';


export class EditingCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View>
        <Text>
          This is empty EditingCard.
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({

});
