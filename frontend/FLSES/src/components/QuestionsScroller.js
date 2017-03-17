import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {QuestionCard} from '../components/QuestionCard';


export class QuestionsScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {
          (!!this.props.questions.active_questions &&
            this.props.questions.active_questions.map((question)=> <QuestionCard
              key={question.question_id}
              question={question}
              status={'active'}
              onRightButtonPress={this.props.onRightButtonPress}
              course_id={this.props.course_id}
            />))
        }
        {
          (!!this.props.questions.inactive_questions &&
          this.props.questions.inactive_questions.map((question)=> <QuestionCard
            key={question.question_id}
            question={question}
            status={'inactive'}
            onRightButtonPress={this.props.onRightButtonPress}
            course_id={this.props.course_id}
          />))
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    margin: 1,
    paddingHorizontal: 6,
    backgroundColor: colors.basicWhite,
  },
});
