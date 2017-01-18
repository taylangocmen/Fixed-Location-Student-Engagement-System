import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import * as colors from '../styling/Colors';


export const CourseCardRightArrowActive = () => {
  return <Image
    source={{uri: 'https://www.materialui.co/materialIcons/navigation/chevron_right_black_192x192.png'}}
    resizeMode='contain'
    style={{resizeMode: 'stretch', height: 40}}
  />;
};

export const CourseCardRightArrowInactive = () => {
  return <Image
    source={{uri: 'https://www.materialui.co/materialIcons/navigation/chevron_right_grey_192x192.png'}}
    resizeMode='contain'
    style={{resizeMode: 'stretch', height: 40}}
  />;
};

export const QuestionCardRightArrowActive = () => {
  return <Image
    source={{uri: 'https://www.materialui.co/materialIcons/navigation/chevron_right_black_192x192.png'}}
    resizeMode='contain'
    style={{resizeMode: 'stretch', height: 55}}
  />;
};

export const QuestionCardRightArrowInactive = () => {
  return <Image
    source={{uri: 'https://www.materialui.co/materialIcons/navigation/chevron_right_grey_192x192.png'}}
    resizeMode='contain'
    style={{resizeMode: 'stretch', height: 55}}
  />;
};

