import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

import * as colors from '../styling/Colors';


export class QuestionBigCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <View style={styles.cardContainer}>
      <View style={styles.courseNameContainer}>
        <Text style={{}}>Is this a question or not a question?</Text>
        <Text style={{}}>A) Yes B) No C) Maybe D) A potato</Text>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
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
