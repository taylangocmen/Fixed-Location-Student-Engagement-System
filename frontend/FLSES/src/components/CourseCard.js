import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {CardLeftColorBar, NavigationChevronRight} from './NavigationComponents';
import {courseStatusColors, courseStatusFontWeights} from '../utils/Modals';
import {QuestionMiniCard} from '../components/QuestionMiniCard';


export class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const backgroundColor = courseStatusColors[this.props.status];
    const fontWeight = courseStatusFontWeights[this.props.status];

    return (
      <View style={styles.cardContainer}>
        <CardLeftColorBar style={[styles.leftBar, {backgroundColor}]}/>
        <View style={styles.mainContainer}>
          <Text style={[styles.courseText, {fontWeight}]}>
            {this.props.course.course_name}
          </Text>
          <Text style={[styles.courseText, {fontWeight}]}>
            {this.props.course.course_desc}
          </Text>
          <QuestionMiniCard
            onActivePress={this.props.onActivePress}
            status={this.props.status}
            course_id={this.props.course.course_id}
            question={this.props.status === 'active' ? this.props.course.active_questions[0]: null}
          />
        </View>
        <TouchableOpacity
          style={[styles.rightButton, {backgroundColor}]}
          onPress={()=>this.props.onRightButtonPress(this.props.course.course_id)}
        >
          <NavigationChevronRight style={[styles.chevron, {backgroundColor}]}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 4,
    minHeight: (config.window.height/4.3),
    borderColor: colors.secondaryCocoaBrown,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  rightButton: {
    width: 24,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  courseText: {
    marginTop: 5,
    fontSize: 20,
    color: colors.secondaryCocoaBrown,
  },
  chevron: {
    width: 24
  },
  leftBar: {
    width: 4
  }
});
