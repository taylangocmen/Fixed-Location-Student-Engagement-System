import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {AnsweringOption} from '../components/AnsweringOption'


export class ClosingCard extends Component {
  constructor(props) {
    super(props);
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
                onPress={null}
                chosenAnswer={false}
                submittedAnswer={false}
                correctAnswer={this.props.answering.correct_answer !== undefined && (this.props.answering.correct_answer === index)}
                disabled={true}
                acceptedAnswer={!!this.props.answering.answer_accepted}
              />)
            }
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={()=>{
                this.props.doPutCloseQuestion({course_id: this.props.course_id, question_id: this.props.answering.question_id});
                this.props.createCallback();
              }}
              disabled={this.props.answering.correct_answer !== undefined}
              style={submitStyle}
            >
              <Text style={styles.submitText}>
                {
                  this.props.answering.correct_answer !== undefined ?
                    'Marked' :
                    'Close & Mark'
                }
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
