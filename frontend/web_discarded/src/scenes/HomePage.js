import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

import * as colors from '../styling/Colors';
import {PageContainer} from '../containers/PageContainer';
import {CoursesScroller} from '../components/CoursesScroller';
import {QuestionsScroller} from '../components/QuestionsScroller';
import {QuestionBigCard} from '../components/QuestionBigCard';
import {VerticalDivider} from '../components/Dividers';


export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bimodalStudentInstructor: true
    };
  }

  render() {
    const {signOut} = this.props;

    return <PageContainer bimodalLoginRegistration={null} signOut={signOut}>
      <View style={styles.mainContainer}>
        <View style={styles.classesContainer}>
          <Text style={styles.classesHeaderText}>Your Classes</Text>
          <CoursesScroller />
        </View>
        <VerticalDivider />
        <View style={styles.questionsContainer}>
          <Text style={styles.questionsHeaderText}>Questions for /*class name here*/</Text>
          <QuestionsScroller />
        </View>
        <VerticalDivider />
        <View style={styles.activeContainer}>
          <QuestionBigCard />
        </View>
      </View>
    </PageContainer>;
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  classesContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  classesHeaderText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 4,
    color: colors.officialPrussianBlue,
    backgroundColor: colors.accentGreyNurse,
  },
  questionsContainer: {
    // flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  questionsHeaderText: {
    textAlign: 'center',
    fontSize: 20,
    padding: 4,
    color: colors.officialPrussianBlue,
    backgroundColor: colors.accentGreyNurse,
  },
  activeContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
});
