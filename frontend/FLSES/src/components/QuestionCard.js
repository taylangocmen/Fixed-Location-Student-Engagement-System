import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {CardLeftColorBar, NavigationChevronRight} from './NavigationComponents';
import {questionStatusColors, questionStatusFontWeights} from '../utils/Modals';
import {alphabet} from '../utils/Functions';


export class QuestionCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const backgroundColor = questionStatusColors[this.props.status];
    const fontWeight = questionStatusFontWeights[this.props.status];
    return (
      <View style={styles.cardContainer}>
        <CardLeftColorBar style={[styles.leftBar, {backgroundColor}]}/>
        <View style={styles.mainContainer}>
          <Text style={[styles.questionText, {fontWeight}]}>
            {this.props.question.title}
          </Text>
          <Text style={[styles.questionText, {fontWeight}]}>
            {this.props.question.body}
          </Text>
          <View>
            {this.props.question.answers
              .map((e, i) =>
                (alphabet(i) + ') ' + e))
              .map((e, i) => <Text style={[styles.optionText, {fontWeight}]} key={i} numberOfLines={1} ellipseMode='tail'>
                  {e}
                </Text>)
            }
          </View>
        </View>
        <TouchableOpacity
          style={[styles.rightButton, {backgroundColor}]}
          onPress={()=>this.props.onRightButtonPress(this.props.question, this.props.course_id)}
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
    minHeight: (config.window.height/4.5),
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
  questionText: {
    marginVertical: 5,
    fontSize: 20,
    color: colors.secondaryCocoaBrown,
  },
  optionText: {
    marginVertical: 1,
    fontSize: 16,
    color: colors.secondaryCocoaBrown,
  },
  chevron: {
    width: 24
  },
  leftBar: {
    width: 4
  }
});
