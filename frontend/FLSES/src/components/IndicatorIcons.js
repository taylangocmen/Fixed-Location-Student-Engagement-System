import React, {Component} from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';

import * as colors from '../styling/Colors';


export const CourseGrey = ({style}) => <Image
  source={require('../material-design-icons/action/ios/ic_account_balance_48pt.imageset/ic_account_balance_48pt.png')}
  style={style}
/>;

export const CourseWhite = ({style}) => <Image
  source={require('../material-design-icons/action/ios/ic_account_balance_white_48pt.imageset/ic_account_balance_white_48pt.png')}
  style={style}
/>;


export const ChartGrey = ({style}) => <Image
  source={require('../material-design-icons/action/ios/ic_assessment_48pt.imageset/ic_assessment_48pt.png')}
  style={style}
/>;

export const ChartWhite = ({style}) => <Image
  source={require('../material-design-icons/action/ios/ic_assessment_white_48pt.imageset/ic_assessment_white_48pt.png')}
  style={style}
/>;


export const QuestionGrey = ({style}) => <Image
  source={require('../material-design-icons/action/ios/ic_assignment_48pt.imageset/ic_assignment_48pt.png')}
  style={style}
/>;

export const QuestionWhite = ({style}) => <Image
  source={require('../material-design-icons/action/ios/ic_assignment_white_48pt.imageset/ic_assignment_white_48pt.png')}
  style={style}
/>;


