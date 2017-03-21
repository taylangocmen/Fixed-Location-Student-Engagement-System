import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {CourseCard} from '../components/CourseCard';


export class CoursesScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.reorderRegisteredCourses = this.reorderRegisteredCourses.bind(this);
  }

  reorderRegisteredCourses() {
    let returnCourses = [];
    const {courses_registered} = this.props.courses;
    for(let i = 0; i < courses_registered.length; i++){
      if(courses_registered[i].active_questions.length > 0){
        returnCourses.push(courses_registered[i]);
      }
    }
    for(let j = 0; j < courses_registered.length; j++){
      if(courses_registered[j].active_questions.length === 0){
        returnCourses.push(courses_registered[j]);
      }
    }
    return returnCourses;
  }

  render() {
    //TODO: do the expired courses right now its just the regular current courses, and status is inactive
    return (
      <ScrollView style={styles.scrollView}>
        {
          ((this.props.courses.courses_registered !== undefined) &&
            this.reorderRegisteredCourses().map((course) => <CourseCard
              key={course.course_id}
              course={course}
              status={(course.active_questions !== undefined) && (course.active_questions.length > 0) ? 'active': 'inactive'}
              onRightButtonPress={this.props.onRightButtonPress}
              onActivePress={this.props.onActivePress}
            />))
        }
        {
          ((this.props.courses.courses_expired !== undefined) &&
            this.props.courses.courses_expired.map((course) => <CourseCard
              key={course.course_id}
              course={course}
              status={'expired'}
              onRightButtonPress={null}
              onActivePress={null}
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

