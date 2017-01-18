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
    return (
      <ScrollView style={styles.scrollView}>
        <CourseCard status='active' onRightButtonPress={this.props.onRightButtonPress}/>
        <CourseCard status='inactive' onRightButtonPress={null}/>
        <CourseCard status='inactive' onRightButtonPress={null}/>
        <CourseCard status='inactive' onRightButtonPress={null}/>
        <CourseCard status='inactive' onRightButtonPress={null}/>
        <CourseCard status='inactive' onRightButtonPress={null}/>
        <CourseCard status='inactive' onRightButtonPress={null}/>
        <CourseCard status='inactive' onRightButtonPress={null}/>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    margin: 1,
    // padding: 6,
    paddingHorizontal: 6,
    // borderColor: colors.secondaryCocoaBrown,
    // borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.basicWhite,
  },
});
