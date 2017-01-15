import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';

import * as colors from '../styling/Colors';
import {QuestionMiniCard} from './QuestionMiniCard';

const keys=[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export class QuestionsScroller extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0
    };

    this.makeActive = this.makeActive.bind(this);
  }

  makeActive(visibleKey) {
    this.setState({
      activeIndex: visibleKey
    });
  }

  //TODO: visibleKey is a hack
  render() {
    return <ScrollView>
      {keys.map((e, i) => {
          return <QuestionMiniCard key={i} visibleKey={i} active={e == this.state.activeIndex} makeActive={this.makeActive}/>;
        }
      )}
    </ScrollView>;
  }
}

const styles = StyleSheet.create({
});
