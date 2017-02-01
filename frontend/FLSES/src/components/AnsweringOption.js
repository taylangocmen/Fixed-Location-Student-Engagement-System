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

    const optionStyle = !!this.props.correctAnswer ?
        styles.optionCorrect :
        !!this.props.submittedAnswer ?
          styles.optionSubmitted:
          !!this.props.chosenAnswer ?
            styles.optionChosen :
            styles.optionFree;

    return (
      <View
        style={[styles.optionBaseStyle, optionStyle]}
      >
        <TouchableOpacity
          onPress={this.props.onPress}
          disabled={this.props.disabled}
        >
          <View>
            <Text style={[styles.optionText, {fontWeight}]}>
              {this.props.optionText}
            </Text>
            <View>

            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  questionContainer: {
    marginBottom: 15,
  },
  optionBaseStyle: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
  },
  optionCorrect: {
    backgroundColor: opacity(colors.accentFrostee, 0.5),
  },
  optionSubmitted: {
    backgroundColor: opacity(colors.accentJordyBlue, 0.5),
  },
  optionChosen: {
    backgroundColor: opacity(colors.accentGreyNurse, 0.5),
  },
  optionFree: {
  },
  questionText: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 20,
  },
});
