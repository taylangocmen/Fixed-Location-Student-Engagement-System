import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {AnsweringOption} from '../components/AnsweringOption'


export class AnsweringCard extends Component {
  constructor(props) {
    super(props);

    const optionChosen = props.answering.answer !== undefined ? (props.answering.answer): -1;

    this.state = {
      optionChosen,
    };
    this.chooseOption = this.chooseOption.bind(this);
    this.doAnswer = this.doAnswer.bind(this);
    
  }
  

  chooseOption(newOptionChosen) {
    let optionChosen = newOptionChosen;

    if(newOptionChosen === this.state.optionChosen)
      optionChosen = -1;

    this.setState({
      optionChosen,
    });
  }

  //TODO: check if answer is chosen -1 and prompt answer not submitted
  //TODO: do the device and the neighbours
  //TODO: do the option check
  doAnswer() {
    if(this.state.optionChosen === -1){
      console.warn("CHOOSE AN OPTION");
    } else {
      const answerObj = {
        course_id: this.props.course_id,
        question_id: this.props.answering.question_id,
        answer: this.state.optionChosen,
        neighbours: [],
        device_id: "device",
      };
      this.props.doAnswer(answerObj);
    }
  }

  render() {
    const submitStyle = this.props.answering.correct_answer !== undefined ?
      styles.disabledButton: styles.submitButton;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.questionContainer}>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>
                {this.props.answering.title}
              </Text>
              <Text style={styles.bodyText}>
                {this.props.answering.body}
              </Text>
            </View>
            {
              this.props.answering.answers.map((option, index)=><AnsweringOption
                key={index}
                index={index}
                optionText={option}
                onPress={()=>this.chooseOption(index)}
                chosenAnswer={index === this.state.optionChosen}
                submittedAnswer={this.props.answering.answer !== undefined && (this.props.answering.answer === index)}
                correctAnswer={this.props.answering.correct_answer !== undefined && (this.props.answering.correct_answer === index)}
                disabled={this.props.answering.correct_answer !== undefined}
              />)
            }
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={this.doAnswer}
              disabled={this.props.answering.correct_answer !== undefined}
              style={submitStyle}
            >
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
    fontWeight: '600',
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
  disabledButton: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.basicGray,
    backgroundColor: colors.accentGreyNurse,
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
