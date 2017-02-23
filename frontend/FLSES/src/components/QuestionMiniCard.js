import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {questionStatusFontWeights} from '../utils/Modals';
import {alphabet} from '../utils/Functions';


export class QuestionMiniCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.renderAnswers = this.renderAnswers.bind(this);
  }

  renderAnswers(answers) {
    return answers.map((answer, index) => (alphabet(index) + ') ' + answer)).join('    ');
  }

  render() {
    const fontWeight = questionStatusFontWeights[this.props.status];
    return (
      <View style={styles.cardContainer}>
        {
          this.props.status==='active' ?
            (<TouchableOpacity
              style={styles.questionContainer}
              onPress={()=>this.props.onActivePress(this.props.question)}
            >
              <Text style={[styles.questionText, {fontWeight}]}>
                {this.props.question.title}
              </Text>
              <Text style={[styles.questionText, {fontWeight}]}>
                {this.props.question.body}
              </Text>
              <Text style={[styles.questionText, {fontWeight}]}>
                {this.renderAnswers(this.props.question.answers)}
              </Text>
            </TouchableOpacity>):
            this.props.status==='inactive' ?
              (<View style={styles.inactiveContainer}>
                <Text style={styles.inactiveText}>
                  No active questions for this course at this time.
                </Text>
              </View>):
              (<View style={styles.inactiveContainer}>
                <Text style={styles.inactiveText}>
                  This course has expired.
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
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    marginHorizontal: -6,
  },
  questionContainer:{
    flex: 1,
    padding: 6,
    marginTop: 10,
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
