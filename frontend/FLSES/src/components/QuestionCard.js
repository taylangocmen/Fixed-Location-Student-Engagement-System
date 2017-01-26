import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {CardLeftColorBar, NavigationChevronRight} from './NavigationComponents';
import {questionStatusColors, questionStatusFontWeights} from '../utils/Modals';


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
        <CardLeftColorBar backgroundColor={backgroundColor} width={4}/>
        <View style={styles.mainContainer}>
          <Text style={[styles.questionText, {fontWeight}]}>
            Is this a question, or is not a question, maybe that is the question itself?
          </Text>
          <Text style={[styles.optionText, {fontWeight}]}>
            A. Yes
          </Text>
          <Text style={[styles.optionText, {fontWeight}]}>
            B. No
          </Text>
          <Text style={[styles.optionText, {fontWeight}]}>
            C. Maybe
          </Text>
          <Text style={[styles.optionText, {fontWeight}]}>
            D. Kappa
          </Text>
          {this.props.status === 'active' ?
            <Text>

            </Text> :
            <Text>

            </Text>
          }
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
    height: (config.window.height/3.0),
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
    fontSize: 18,
    color: colors.secondaryCocoaBrown,
  }
});
