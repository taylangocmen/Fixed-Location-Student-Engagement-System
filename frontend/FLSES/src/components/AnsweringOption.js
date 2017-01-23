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
    const optionStyle = this.props.chosen? styles.optionChosen: styles.optionFree;

    return (
      <TouchableOpacity
        style={optionStyle}
        onPress={this.props.onPress}
      >
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
  optionFree: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
optionChosen: {
    borderRadius: 16,
    borderWidth: 2,
    borderColor: colors.secondaryCocoaBrown,
    backgroundColor: opacity(colors.basicGreen, 0.1),
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
