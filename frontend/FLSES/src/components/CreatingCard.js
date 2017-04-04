import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, TouchableWithoutFeedback, ToastAndroid} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {alphabet} from '../utils/Functions';

export class CreatingCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      course_id: this.props.course_id,
      timeout: 0,
      question: {
        title: '',
        text: '',
        correct_answer: -1,
        answers: [
          '',
          '',
          '',
          ''
        ]
      }
    };

    this.sendQuestion = this.sendQuestion.bind(this);
    this.chooseOption = this.chooseOption.bind(this);
  }

  sendQuestion() {
    const {course_id, timeout, question} = this.state;

    this.props.doPostQuestion({
      course_id,
      timeout,
      question,
    });
    this.props.createCallback();
  }

  chooseOption(correct_answer) {
    const {question} = this.state;
    this.setState({question: {
      ...question,
      correct_answer
    }});
  }

  render() {
    const {question} = this.state;
    const disabled = ((question.correct_answer === -1) || (question.title === '') || (question.text === '') ||
      (question.answers[0] === '') || (question.answers[1] === '') || (question.answers[2] === '') || (question.answers[3] === '')
    );
    const submitStyle = disabled ? styles.disabledButton : styles.submitButton;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.questionContainer}>
            <View style={styles.bodyContainer}>
              <View style={styles.rowContainer}>
                <TextInput
                  value={this.state.question.title}
                  onChange={(e) => this.setState({question:{...question, title: e.nativeEvent.text}})}
                  placeholder='Question title'
                  placeholderTextColor={colors.basicBlack}
                  style={styles.cardInputTitle}
                />
              </View>
              <View style={styles.rowContainer}>
                <TextInput
                  value={this.state.question.text}
                  onChange={(e) => this.setState({question:{...question, text: e.nativeEvent.text}})}
                  multiline={true}
                  placeholder='Question text'
                  placeholderTextColor={colors.basicBlack}
                  style={styles.cardInputBody}
                />
              </View>
            </View>
            {
              this.state.question.answers.map((e, i) => {
                const rowCCTextStyle = (i === this.state.question.correct_answer) ?
                  styles.rowCCTextSelected : styles.rowCCText;

                return <View key={i} style={styles.rowContainerContainer}>
                    <TouchableWithoutFeedback onPress={()=>this.chooseOption(i)}>
                      <View style={styles.rowCCTextContainer}>
                        <Text style={rowCCTextStyle}>
                          {' '}{alphabet(i)}{')'}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                    <View style={[styles.rowContainer, {flex: 1}]}>
                      <TextInput
                        value={this.state.question.answers[i]}
                        onChange={(e) => {
                        let answers = question.answers;
                        answers[i] = e.nativeEvent.text;
                        this.setState({question:{...question, answers}})
                      }}
                        placeholder='Answer option text'
                        multiline={false}
                        placeholderTextColor={colors.basicBlack}
                        style={styles.cardInputOption}
                      />
                    </View>
                  </View>
                })
            }
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={this.sendQuestion}
              disabled={disabled}
              style={submitStyle}
            >
              <Text style={styles.submitText}>
                Create
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
  rowContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    borderColor: colors.accentGreyNurse,
    borderWidth: StyleSheet.hairlineWidth,
  },
  rowContainerContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    margin: 2,
  },
  rowCCTextContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 2,
    marginLeft: -1,
  },
  rowCCText: {
    borderColor: colors.basicWhite,
    fontSize: 24,
    borderWidth: 3,
  },
  rowCCTextSelected:{
    borderColor: colors.secondaryCrimson,
    fontSize: 24,
    borderWidth: 3,
  },
  cardInputTitle: {
    height: 50,
    fontSize: 24,
  },
  cardInputBody: {
    height: 125,
    fontSize: 22,
  },
  cardInputOption: {
    height: 40,
    fontSize: 20,
  },
});
