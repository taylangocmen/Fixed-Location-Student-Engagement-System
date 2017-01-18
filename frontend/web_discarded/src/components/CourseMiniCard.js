import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import * as colors from '../styling/Colors';
import {CourseCardRightArrowActive, CourseCardRightArrowInactive} from '../images/NavigationIcons';


export class CourseMiniCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TouchableOpacity disabled={this.props.active} onPress={() => this.props.makeActive(this.props.visibleKey)}>
      <View style={this.props.active? styles.cardContainerActive: styles.cardContainerInactive}>
        <View style={styles.courseNameContainer}>
          <Text style={{}}>CNH123</Text>
          <Text style={{}}>This is course {this.props.visibleKey}</Text>
        </View>
        <View style={styles.rightButtonContainer}>
          {this.props.active ?
            <CourseCardRightArrowActive />:
            <CourseCardRightArrowInactive />}
        </View>
      </View>
    </TouchableOpacity>;
  }
}

const styles = StyleSheet.create({
  cardContainerActive: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 80,
    borderWidth: 4,
    borderColor: colors.secondaryCocoaBrown,
    backgroundColor: colors.backgroundCocoaBrown,
    margin: 1,
    padding: 10,
  },
  cardContainerInactive: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 80,
    borderWidth: 2,
    borderColor: colors.accentPaleRose,
    backgroundColor: colors.backgroundPaleRose,
    margin: 1,
    padding: 10,
  },
  courseNameContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
  },
  rightButtonContainer: {
    paddingLeft: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  }
});
