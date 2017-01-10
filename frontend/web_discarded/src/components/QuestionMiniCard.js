import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import * as colors from '../styling/Colors';
import {QuestionCardRightArrowActive, QuestionCardRightArrowInactive} from '../images/NavigationIcons';


export class QuestionMiniCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <TouchableOpacity disabled={this.props.active} onPress={() => this.props.makeActive(this.props.visibleKey)}>
      <View style={this.props.active? styles.cardContainerActive: styles.cardContainerInactive}>
        <View style={styles.courseNameContainer}>
          <Text style={{}}>Is this a question or not a question {this.props.visibleKey} ?</Text>
          <Text style={{}}>A) Yes B) No C) Maybe D) A potato</Text>
        </View>
        <View style={styles.rightButtonContainer}>
          {this.props.active ?
            <QuestionCardRightArrowActive /> :
            <QuestionCardRightArrowInactive />}
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
    height: 115,
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
    height: 115,
    borderWidth: 2,
    borderColor: colors.accentFrostee,
    backgroundColor: colors.backgroundFrostee,
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
