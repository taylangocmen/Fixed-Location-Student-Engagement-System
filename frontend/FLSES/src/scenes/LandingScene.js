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
import {CreatingCard} from '../components/CreatingCard';
import {ClosingCard} from '../components/ClosingCard';
import {NavigationLoading} from '../components/NavigationComponents';


export class LandingScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prev: flow.a.title,
      title: flow.a.title,
      content: flow.a,
      is_prof: false,
    };

    this.goToCourses = this.goToCourses.bind(this);
    this.goToQuestions = this.goToQuestions.bind(this);
    this.goToAnswering = this.goToAnswering.bind(this);
    this.getOnPressLeft = this.getOnPressLeft.bind(this);
    this.getOnPressRight = this.getOnPressRight.bind(this);
    this.renderCourses = this.renderCourses.bind(this);
    this.renderQuestions = this.renderQuestions.bind(this);
    this.renderAnswering = this.renderAnswering.bind(this);
    // this.renderEditing = this.renderEditing.bind(this);
    this.renderCreating = this.renderCreating.bind(this);
  }

  goToCourses() {
    const prev = this.state.title;
    this.setState({
      prev,
      title: flow.a.title,
      content: flow.a,
    });
  }

  goToQuestions(course_id, keep, is_prof) {
    !keep && this.props.doGetQuestions(course_id);

    const content = {...flow.b, right: is_prof ? 'plus': 'menu'};

    const prev = this.state.title;
    this.setState({
      prev,
      title: flow.b.title,
      content,
      is_prof: !!is_prof
    });
  }

  goToAnswering(answering, course_id) {

    // console.warn("goToAnswering: ");
    // console.warn("answering: ", answering);
    // console.warn("course_id: ", course_id);
    // console.warn("goToAnswering: this.state.is_prof: ", this.state.is_prof);

    this.props.doSetAnswering(answering, course_id);

    const title = !!this.state.is_prof ? flow.d.title: flow.c.title;
    const content = !!this.state.is_prof ? flow.d: flow.c;

    const prev = this.state.title;
    this.setState({
      prev,
      title,
      content,
    });
  }

  getOnPressLeft() {
    switch (this.state.title) {
      case flow.a.title:
        this.props.doLogout();
        break;
      case flow.b.title:
        this.goToCourses();
        break;
      case flow.c.title:
        this.state.prev === flow.a.title ?
          this.goToCourses():
          this.goToQuestions({}, true, this.state.is_prof);
        break;
      case flow.d.title:
        this.state.prev === flow.a.title ?
          this.goToCourses():
          this.goToQuestions({}, true, this.state.is_prof);
        break;
      default:
        return null;
    }
  }

  getOnPressRight() {
    switch (this.state.title) {
      case flow.a.title:
        this.props.doGetCourses();
        break;
      case flow.b.title:
        // this.goToCourses();
        if(!!this.state.is_prof)
          this.goToAnswering(null, this.props.course_id);
        break;
      case flow.c.title:
        // this.state.prev === flow.a.title ?
        //   this.goToCourses():
        //   this.goToQuestions({}, true);
        break;
      case flow.d.title:
        break;
      default:
        return null;
    }
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
        course_id={this.props.course_id}
      /> :
      <NavigationLoading />;
  }

  renderAnswering() {
    return !!this.props.answering ?
      <AnsweringCard
        doAnswer={this.props.doAnswer}
        answering={this.props.answering}
        course_id={this.props.course_id}
      /> :
      <NavigationLoading />;
  }

  //TODO: this
  renderCreating() {
    return !!this.props.answering ?
      <ClosingCard
        doPutCloseQuestion={this.props.doPutCloseQuestion}
        answering={this.props.answering}
        course_id={this.props.course_id}
        createCallback={()=>this.goToQuestions({}, true, this.state.is_prof)}
      /> :
      <CreatingCard
        doPostQuestion={this.props.doPostQuestion}
        answering={this.props.answering}
        course_id={this.props.course_id}
        createCallback={()=>this.goToQuestions({}, true, this.state.is_prof)}
      />;
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <NavigationBar
          left={this.state.content.left}
          onPressLeft={this.getOnPressLeft}
          right={this.state.content.right}
          onPressRight={this.getOnPressRight}
          title={this.state.title}
        />
        {
          (this.state.title === flow.a.title ?
            this.renderCourses() :
            (this.state.title === flow.b.title ?
                this.renderQuestions() :
                (this.state.title === flow.c.title ?
                  this.renderAnswering() :
                  this.renderCreating()
                )
            )
          )
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
