import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {QuestionCard} from '../components/QuestionCard';


export class QuestionsScroller extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView style={styles.scrollView}>
        {

          // <View>
          //   <QuestionCard status='active' onRightButtonPress={this.props.onRightButtonPress}/>
          //   <QuestionCard status='inactive' onRightButtonPress={null}/>
          // </View>
        }
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    margin: 1,
    // padding: 6,
    paddingHorizontal: 6,
    // borderColor: colors.secondaryCocoaBrown,
    // borderWidth: StyleSheet.hairlineWidth,
    backgroundColor: colors.basicWhite,
  },
});
