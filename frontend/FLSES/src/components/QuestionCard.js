import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {CardLeftColorBar, NavigationChevronRight} from './NavigationComponents';
import {questionStatusColors, questionStatusFontWeights} from '../utils/Modals';
import {alphabet} from '../utils/Functions';


export class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.renderAnswers = this.renderAnswers.bind(this);
  }

  renderAnswers(answers) {
    return answers.map((answer, index) => (alphabet(index) + ') ' + answer)).join('    ');
  }

  render() {
    const backgroundColor = questionStatusColors[this.props.status];
    const fontWeight = questionStatusFontWeights[this.props.status];
    return (
      <View style={styles.cardContainer}>
        <CardLeftColorBar backgroundColor={backgroundColor} width={4}/>
        <View style={styles.mainContainer}>
          <Text style={[styles.questionText, {fontWeight}]}>
            {this.props.question.title}
          </Text>
          <Text style={[styles.questionText, {fontWeight}]}>
            {this.props.question.body}
          </Text>
          <Text style={[styles.optionText, {fontWeight}]}>
            {this.renderAnswers(this.props.question.answers)}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.rightButton, {backgroundColor}]}
          onPress={()=>this.props.onRightButtonPress(this.props.question, this.props.question.question_id)}
        >
          <NavigationChevronRight backgroundColor={backgroundColor} width={24}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 4,
    height: (config.window.height/3.0),
    borderColor: colors.secondaryCocoaBrown,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rightButton: {
    width: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  questionText: {
    marginVertical: 5,
    fontSize: 20,
    color: colors.secondaryCocoaBrown,
  },
  optionText: {
    marginVertical: 1,
    fontSize: 18,
    color: colors.secondaryCocoaBrown,
  }
});
