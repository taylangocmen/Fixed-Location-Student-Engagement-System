import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import * as indicator from '../components/IndicatorIcons';
import {answerStatusColors, answerStatusFontWeight} from '../utils/Modals';
import {opacity} from '../utils/Functions';


export class AnsweringOption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const mode =
      this.props.correctAnswer ? 'correct' :
        this.props.submittedAnswer ? 'submitted' :
          this.props.chosenAnswer ? 'chosen' : 'free';

    const fontWeight = answerStatusFontWeight[mode];
    const backgroundColor = answerStatusColors[mode];

    return (
      <View
        style={[styles.optionBaseStyle, {backgroundColor}]}
      >
        <TouchableOpacity
          onPress={this.props.onPress}
          disabled={this.props.disabled}
          style={styles.optionButtonStyle}
        >
          <Text style={[styles.optionText, {fontWeight}]}>
            {this.props.optionText}
          </Text>
          <View style={styles.indicatorsContainerContainer}>
            {!this.props.submittedAnswer && this.props.chosenAnswer && !this.props.disabled &&
              <View style={styles.indicatorsContainer}>{indicator.TickWhite(styles.indicatorStyle)}</View>}

            {this.props.submittedAnswer && !this.props.acceptedAnswer && this.props.disabled &&
              <View style={styles.indicatorsContainer}>{indicator.BtBadWhite(styles.indicatorStyle)}</View>}

            {this.props.submittedAnswer && this.props.acceptedAnswer && this.props.disabled &&
              <View style={styles.indicatorsContainer}>{indicator.BtGoodWhite(styles.indicatorStyle)}</View>}

            {this.props.submittedAnswer && !this.props.disabled &&
              <View style={styles.indicatorsContainer}>{indicator.DoubleTickWhite(styles.indicatorStyle)}</View>}

            {this.props.submittedAnswer && !this.props.correctAnswer && this.props.disabled &&
              <View style={styles.indicatorsContainer}>{indicator.MinusWhite(styles.indicatorStyle)}</View>}

            {this.props.submittedAnswer && this.props.correctAnswer && this.props.disabled &&
              <View style={styles.indicatorsContainer}>{indicator.PlusWhite(styles.indicatorStyle)}</View>}

            {this.props.correctAnswer &&
              <View style={styles.indicatorsContainer}>{indicator.StarWhite(styles.indicatorStyle)}</View>}
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
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginVertical: 4,
    minHeight: 60,
  },
  optionButtonStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 20,
    flex: 1,
  },
  indicatorsContainerContainer: {
    minWidth: 22,
    marginRight: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  indicatorsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: opacity(colors.secondaryCocoaBrown, 0.5),
    borderRadius: 22,
    borderWidth: StyleSheet.hairlineWidth,
    padding: 1,
  },
  indicatorStyle: {
    width: 20,
    height: 20,
  }
});
