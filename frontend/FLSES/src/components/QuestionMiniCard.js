import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {questionStatusFontWeights} from '../utils/Modals';


export class QuestionMiniCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

  }

  render() {
    const fontWeight = questionStatusFontWeights[this.props.status];
    return (
      <View style={styles.cardContainer}>
        {
          this.props.status==='active' ?
            (<TouchableOpacity
              onPress={this.props.onActivePress}
              >
                <View style={styles.questionContainer}>
                <Text style={[styles.questionText, {fontWeight}]}>
                  Is this a question, or is not a question, maybe that is the question itself?
                </Text>
                <Text style={[styles.questionText, {fontWeight}]}>
                  A. Yes    B. No    C. Maybe     D. Kappa
                </Text>
              </View>
            </TouchableOpacity>):
            (<View style={styles.inactiveContainer}>
              <Text style={styles.inactiveText}>
                No active questions for this course at this time.
              </Text>
            </View>)
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginHorizontal: -6,
  },
  questionContainer:{
    flex: 1,
    padding: 6,
    flexDirection: 'column',
    justifyContent: 'center',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
  },
  questionText: {
    marginVertical: 2,
    fontSize: 14,
  },
  inactiveContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  inactiveText: {
    fontStyle: 'italic',
    fontSize: 10,
  }
});
