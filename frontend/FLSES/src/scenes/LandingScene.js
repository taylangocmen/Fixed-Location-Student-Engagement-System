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

  goToQuestions() {
    this.setState({
      title: flow.b.title,
      content: flow.b,
    });
  }

  goToAnswering() {
    this.setState({
      title: flow.c.title,
      content: flow.c,
    });
  }

  getOnPressLeft() {
    switch (this.state.title) {
      case 'flow':
        return <NavigationArrowBack style={styles.icon}/>;
      case 'close':
        return <NavigationClose style={styles.icon}/>;
      case 'menu':
        return <NavigationMenu style={styles.icon}/>;
      case 'logout':
        return <NavigationLogout style={styles.icon}/>;
      default:
        return <View />;
    }
  }

  getOnPressRight() {

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
          (this.state.title === flow.a.title?
            <CoursesScroller onRightButtonPress={this.goToQuestions} /> :
            (this.state.title === flow.b.title?
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
