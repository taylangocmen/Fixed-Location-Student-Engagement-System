import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ToastAndroid} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {AnsweringOption} from '../components/AnsweringOption'
import BluetoothModule from '../bluetooth/BluetoothModule';


export class AnsweringCard extends Component {
  constructor(props) {
    super(props);

    const answer = props.answering.answer !== undefined ? (props.answering.answer): -1;

    this.state = {
      answer,
      device_id: '',
      neighbours: [],
    };
    this.chooseOption = this.chooseOption.bind(this);
    this.doAnswer = this.doAnswer.bind(this);
    
  }

  componentWillMount () {
    if((config.os === "android") && ((this.props.answering.correct_answer === undefined))) {
      BluetoothModule.setDiscoverable(300);
      BluetoothModule.getMAC((device_id)=>{
        this.setState({device_id});
      });
    }
  }

  chooseOption(newanswer) {
    let answer = newanswer;

    if(newanswer === this.state.answer)
      answer = -1;

    this.setState({
      answer,
    });
  }

  doAnswer() {
    const {course_id, answering, doAnswer} = this.props;
    const {answer, device_id} = this.state;
    const {question_id} = answering;




    if(config.os === "android"){
      BluetoothModule.getNearbyDevices((newNeighbours)=>{
        if(answer !== -1) {
          let neighbours = newNeighbours.concat(this.state.neighbours);

          if(neighbours.length >= 2)
            neighbours = neighbours.filter((e, p)=>(neighbours.indexOf(e) === p));

          const answerObj = {
            course_id,
            question_id,
            answer,
            neighbours,
            device_id,
          };

          doAnswer(answerObj);

          // ToastAndroid.show(JSON.stringify(neighbours), ToastAndroid.LONG);

          if(neighbours.length > 0)
            this.setState({neighbours});
        }
      });
      // setTimeout(BluetoothModule.cancelScan, 20000);

    } else {
      const answerObj = {
        course_id,
        question_id,
        answer,
        neighbours: ['fake_neighbour_1', 'fake_neighbour_2', 'fake_neighbour_3'],
        device_id: 'FC:58:FA:10:66:60',
      };
      doAnswer(answerObj);

    }
  }

  render() {
    // console.warn("AnsweringCard: answering", JSON.stringify(this.props.answering));

    const submitStyle = this.props.answering.correct_answer !== undefined ?
      styles.disabledButton: styles.submitButton;

    return (
      <View style={styles.cardContainer}>
        <View style={styles.mainContainer}>
          <View style={styles.questionContainer}>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>
                {this.props.answering.title}
              </Text>
              <Text style={styles.bodyText}>
                {this.props.answering.body}
              </Text>
            </View>
            {
              this.props.answering.answers.map((option, index)=><AnsweringOption
                key={index}
                index={index}
                optionText={option}
                onPress={()=>this.chooseOption(index)}
                chosenAnswer={index === this.state.answer}
                submittedAnswer={this.props.answering.answer !== undefined && (this.props.answering.answer === index)}
                correctAnswer={this.props.answering.correct_answer !== undefined && (this.props.answering.correct_answer === index)}
                disabled={this.props.answering.correct_answer !== undefined}
                acceptedAnswer={!!this.props.answering.answer_accepted}
              />)
            }
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity
              onPress={this.doAnswer}
              disabled={(this.props.answering.correct_answer !== undefined) || (this.state.answer === -1)}
              style={submitStyle}
            >
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
    fontWeight: '600',
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
  disabledButton: {
    borderRadius: 16,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.basicGray,
    backgroundColor: colors.accentGreyNurse,
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
