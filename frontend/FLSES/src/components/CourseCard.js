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
        <CardLeftColorBar backgroundColor={backgroundColor} width={4}/>
        <View style={styles.mainContainer}>
          <Text style={[styles.courseText, {fontWeight}]}>
            Winter-2017-CNH123S-H1
          </Text>
          <Text style={[styles.courseText, {fontWeight}]}>
            Course Description Here
          </Text>
          <QuestionMiniCard status={this.props.status}/>
        </View>
        <TouchableOpacity
          style={[styles.rightButton, {backgroundColor}]}
          onPress={this.props.onRightButtonPress}
        >
          <NavigationChevronRight backgroundColor={backgroundColor} width={24}/>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 4,
    height: (config.window.height/4.3),
    borderColor: colors.secondaryCocoaBrown,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
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
    marginVertical: 5,
    fontSize: 20,
    color: colors.secondaryCocoaBrown,
  }
});
