import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {CardLeftColorBar} from '../utils/Auxilary';
import {courseStatusColors} from '../utils/Modals';


export class CourseCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    const color = courseStatusColors[this.props.status];

    return (
      <View style={styles.cardContainer}>
        <CardLeftColorBar color={color}/>
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
    flexDirection: 'column',
  }
});
