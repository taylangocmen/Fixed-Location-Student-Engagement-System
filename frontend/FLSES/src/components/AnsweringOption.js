import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {questionStatusColors, questionStatusFontWeights} from '../utils/Modals';
import {opacity} from '../utils/Functions';


export class AnsweringOption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const fontWeight = questionStatusFontWeights[this.props.status];
    return (
      <TouchableOpacity style={styles.optionButton}>
        <Text style={[styles.optionText, {fontWeight}]}>
          {this.props.optionText}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 15,
  },
  optionButton: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  questionText: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 20,
  },
});
