import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {flow} from '../utils/Modals';
import {NavigationBar} from '../components/NavigationBar';
import {CoursesScroller} from '../components/CoursesScroller';
import {QuestionsScroller} from '../components/QuestionsScroller';
import {AnsweringCard} from '../components/AnsweringCard';


export class LandingScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //TODO: change this to flow.a at the end
      content: flow.a
    };

    this.goToCourses = this.goToCourses.bind(this);
    this.goToQuestions = this.goToQuestions.bind(this);
    this.goToAnswering = this.goToAnswering.bind(this);
  }

  goToCourses() {
    this.setState({
      content: flow.a
    });
  }

  goToQuestions() {
    this.setState({
      content: flow.b
    });
  }

  goToAnswering() {
    this.setState({
      content: flow.c
    });
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <NavigationBar
          left="back"
          right="menu"
          title={this.state.content}
        />
        {
          (this.state.content === flow.a ?
            <CoursesScroller onRightButtonPress={this.goToQuestions} /> :
            (this.state.content === flow.b ?
              <QuestionsScroller onRightButtonPress={this.goToAnswering} />:
              <AnsweringCard status='active'/>))
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
  }
});
