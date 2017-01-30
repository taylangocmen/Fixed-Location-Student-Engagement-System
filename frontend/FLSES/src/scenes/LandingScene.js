import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

import {config} from '../../config';
import {api} from '../app/api';
import * as colors from '../styling/Colors';
import {flow} from '../utils/Modals';
import {NavigationBar} from '../components/NavigationBar';
import {CoursesScroller} from '../components/CoursesScroller';
import {QuestionsScroller} from '../components/QuestionsScroller';
import {AnsweringCard} from '../components/AnsweringCard';
import {NavigationLoading} from '../components/NavigationComponents';


export class LandingScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO: change this to flow.a at the end
      title: flow.a.title,
      content: flow.a,
    };

    this.goToCourses = this.goToCourses.bind(this);
    this.goToQuestions = this.goToQuestions.bind(this);
    this.goToAnswering = this.goToAnswering.bind(this);
    this.getOnPressLeft = this.getOnPressLeft.bind(this);
    this.getOnPressRight = this.getOnPressRight.bind(this);
  }

  goToCourses() {
    this.setState({
      title: flow.a.title,
      content: flow.a,
    });
  }

  goToQuestions(questions, course_id) {
    this.props.doSetQuestions(questions, course_id);

    this.setState({
      title: flow.b.title,
      content: flow.b,
    });
  }

  goToAnswering(answering, question_id) {
    this.props.doSetAnswering(answering, question_id);

    this.setState({
      title: flow.c.title,
      content: flow.c,
    });
  }

  getOnPressLeft() {
    switch (this.state.title) {
      case flow.a.title:
        this.props.onLogout();
        break;
      case flow.b.title:
        this.goToCourses();
        break;
      case flow.c.title:
        this.goToQuestions();
        break;
      default:
        return null;
    }
  }

  getOnPressRight() {

  }

  renderCourses() {
    return !!this.props.courses ?
      <CoursesScroller
        onRightButtonPress={this.goToQuestions}
        onActivePress={this.goToAnswering}
        courses={this.props.courses}
      /> :
      <NavigationLoading />;
  }

  renderQuestions() {
    return !!this.props.questions ?
      <QuestionsScroller
        onRightButtonPress={this.goToAnswering}
        questions={this.props.questions}
      /> :
      <NavigationLoading />;
  }

  renderAnswering() {
    return !!this.props.answering ?
      <AnsweringCard
        answering={this.props.answering}
      /> :
      <NavigationLoading />;
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <NavigationBar
          left={this.state.content.left}
          onPressLeft={this.getOnPressLeft}
          right={this.state.content.right}
          onPressRight={this.getOnPressRight}
          title={this.state.content.title}
        />
        {
          (this.state.title === flow.a.title ?
            this.renderCourses() :
            (this.state.title === flow.b.title ?
                this.renderQuestions() :
                this.renderAnswering()
            ))
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: colors.basicWhite,
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: colors.basicWhite,
  },
});
