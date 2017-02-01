import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {CourseCard} from '../components/CourseCard';


export class CoursesScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    // console.warn('CoursesScroller, courses', this.props.courses);
    //TODO: do the expired courses right now its just the regular current courses, and status is inactive

    return (
      <ScrollView style={styles.scrollView}>
        {
          (!!this.props.courses.courses_registered &&
            this.props.courses.courses_registered.map((course) => <CourseCard
              key={course.course_id}
              course={course}
              status={(!!course.active_questions) && (course.active_questions.length > 0) ? 'active': 'inactive'}
              onRightButtonPress={this.props.onRightButtonPress}
              onActivePress={this.props.onActivePress}
            />))
        }
        {
          (!!this.props.courses.courses_expired &&
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

// <CourseCard status='active' onRightButtonPress={this.props.onRightButtonPress} onActivePress={this.props.onActivePress}/>
// <CourseCard status='inactive' onRightButtonPress={null} onActivePress={null}/>
