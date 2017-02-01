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

    // TODO: When index is fixed remove answer-1
    const optionChosen = !!props.answering.answer_accepted ? (props.answering.answer-1): -1;

    this.state = {
      optionChosen,
    };

    this.chooseOption = this.chooseOption.bind(this);
  }

  chooseOption(newOptionChosen) {
    let optionChosen = newOptionChosen;

    if(newOptionChosen === this.state.optionChosen)
      optionChosen = -1;

    this.setState({
      optionChosen,
    });
  }

  render() {
    //TODO: do  the inactive questions and answered questions
    const fontWeight = questionStatusFontWeights[this.props.status];

    // console.warn('AnsweringCard: ', this.props.answering);

    // TODO: When index is fixed remove answer-1
    return (
      <View style={styles.cardContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.questionContainer}>
            <View style={styles.bodyContainer}>
              <Text style={[styles.bodyText, {fontWeight}]}>
                {this.props.answering.title}
              </Text>
              <Text style={[styles.bodyText, {fontWeight}]}>
                {this.props.answering.body}
              </Text>
            </View>
            {
              this.props.answering.answers.map((option, index)=><AnsweringOption
                key={index}
                optionText={option}
                status={this.props.status}
                onPress={()=>this.chooseOption(index)}
                chosenAnswer={this.state.optionChosen === index}
                submittedAnswer={!!this.props.answering.answer_accepted && ((this.props.answering.answer-1) === index)}
                correctAnswer={!!this.props.answering.correct_answer && ((this.props.answering.correct_answer-1) === index)}
                disabled={!!this.props.answering.correct_answer}
              />)
            }
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 1,
    padding: 16,
  },
  mainContainer: {
    flex: 1,
  },
  questionContainer:{
    flex: 1,
  },
  bodyContainer: {
    marginBottom: 15,
  },
  bottomContainer:{
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionButton: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
    padding: 8,
    marginVertical: 4,
  },
  bodyText: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 20,
  },
  submitButton: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
    backgroundColor: colors.secondaryCrimson,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
  },
  submitText: {
    color: colors.basicWhite,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
});
