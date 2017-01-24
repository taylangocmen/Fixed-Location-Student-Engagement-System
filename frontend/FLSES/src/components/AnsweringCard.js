import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {questionStatusColors, questionStatusFontWeights} from '../utils/Modals';
import {opacity} from '../utils/Functions';
import {AnsweringOption} from '../components/AnsweringOption'

export class AnsweringCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionChosen: -1,
    };

    this.chooseOption = this.chooseOption.bind(this);
  }

  chooseOption(optionChosen) {
    this.setState({
      optionChosen,
    });
  }

  render() {
    const borderColor = opacity(questionStatusColors[this.props.status], 0.6);
    const fontWeight = questionStatusFontWeights[this.props.status];
    const optionStyles = {

    };

    return (
      <View style={[styles.cardContainer, {borderColor}]}>
        <View style={styles.mainContainer}>
          <View style={styles.questionContainer}>
            <Text style={[styles.questionText, {fontWeight}]}>
              Is this a question, or is not a question, maybe that is the question itself?
            </Text>
          </View>
          <AnsweringOption
            optionText="A. Yes"
            status={this.props.status}
            onPress={()=>this.chooseOption(0)}
            chosen={this.state.optionChosen === 0}
          />
          <AnsweringOption
            optionText="B. No"
            status={this.props.status}
            onPress={()=>this.chooseOption(1)}
            chosen={this.state.optionChosen === 1}
          />
          <AnsweringOption
            optionText="C. Maybe"
            status={this.props.status}
            onPress={()=>this.chooseOption(2)}
            chosen={this.state.optionChosen === 2}
          />
          <AnsweringOption
            optionText="D. Kappa"
            status={this.props.status}
            onPress={()=>this.chooseOption(3)}
            chosen={this.state.optionChosen === 3}
          />
          {this.props.status === 'active' ?
            <Text>

            </Text> :
            <Text>

            </Text>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 6,
    borderWidth: 1,
    padding: 16,
  },
  mainContainer: {
    flex: 1,
  },
  questionContainer: {
    marginBottom: 15,
  },
  optionButton: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
    padding: 8,
    marginVertical: 4,
  },
  questionText: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 20,
  },
});
