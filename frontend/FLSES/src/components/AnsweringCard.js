import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {questionStatusColors, questionStatusFontWeights} from '../utils/Modals';
import {opacity} from '../utils/Functions';
import {AnsweringOption} from '../components/AnsweringOption'

export class AnsweringCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      optionChosen: -1,
    };

    this.chooseOption = this.chooseOption.bind(this);
  }

  chooseOption(optionChosen) {
    this.setState({
      optionChosen,
    });
  }

  render() {
    const borderColor = opacity(questionStatusColors[this.props.status], 0.6);
    const fontWeight = questionStatusFontWeights[this.props.status];
    const optionStyles = {

    };

    //TODO: make this from props
    return (
      <View style={[styles.cardContainer, {borderColor}]}>
        <View style={styles.mainContainer}>
          <View style={styles.questionContainer}>
            <View style={styles.bodyContainer}>
              <Text style={[styles.bodyText, {fontWeight}]}>
                Is this a question, or is not a question, maybe that is the question itself?
              </Text>
            </View>
            <AnsweringOption
              optionText="A. Yes"
              status={this.props.status}
              onPress={()=>this.chooseOption(0)}
              chosen={this.state.optionChosen === 0}
            />
            <AnsweringOption
              optionText="B. No"
              status={this.props.status}
              onPress={()=>this.chooseOption(1)}
              chosen={this.state.optionChosen === 1}
            />
            <AnsweringOption
              optionText="C. Maybe"
              status={this.props.status}
              onPress={()=>this.chooseOption(2)}
              chosen={this.state.optionChosen === 2}
            />
            <AnsweringOption
              optionText="D. Kappa"
              status={this.props.status}
              onPress={()=>this.chooseOption(3)}
              chosen={this.state.optionChosen === 3}
            />
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity style={styles.submitButton}>
              <Text style={styles.submitText}>
                Submit
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    // borderWidth: 6,
    borderWidth: 1,
    padding: 16,
  },
  mainContainer: {
    flex: 1,
  },
  questionContainer:{
    flex: 1,
  },
  bodyContainer: {
    marginBottom: 15,
  },
  bottomContainer:{
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  optionButton: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
    padding: 8,
    marginVertical: 4,
  },
  bodyText: {
    fontSize: 24,
  },
  optionText: {
    fontSize: 20,
  },
  submitButton: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.secondaryCocoaBrown,
    backgroundColor: colors.secondaryCrimson,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
  },
  submitText: {
    color: colors.basicWhite,
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
});
