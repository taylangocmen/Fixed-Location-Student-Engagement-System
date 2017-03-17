import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator, TouchableHighlight, StatusBar, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';

import {config} from '../../config';
import {api} from '../app/api';
import * as colors from '../styling/Colors';
import {LoginScene} from '../scenes/LoginScene';
import {LandingScene} from '../scenes/LandingScene';


export class EntryPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: make this true
      bimodalLoginLanding: true,
      courses: null,
      questions: null,
      answering: null,
      course_id: null,
    };

    this.doGetQuestions = this.doGetQuestions.bind(this);
    this.doSetQuestions = this.doSetQuestions.bind(this);
    this.doGetCourses = this.doGetCourses.bind(this);
    this.doSetCourses = this.doSetCourses.bind(this);
    this.doSetAnswering = this.doSetAnswering.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.goLanding = this.goLanding.bind(this);
    this.doAnswer = this.doAnswer.bind(this);
  }

  doGetQuestions(course_id) {
    api.get(`/questions`, {course_id})
      .then((questions)=>this.doSetQuestions(questions, course_id))
    ;
  }

  doGetCourses() {
    api.get(`/courses`)
      .then(this.doSetCourses)
    ;
  }

  //TODO: do a get request with questions
  doSetQuestions(questions, course_id) {
    // console.warn('doSetQuestions: course_id:', course_id, 'questions:', questions);
    this.setState({questions, course_id});
  }

  doSetCourses(courses) {
    // console.warn('doSetCourses');
    this.setState({courses, course_id: null});
  }

  doSetAnswering(answering, course_id) {
    // console.warn('doSetAnswering: course_id:', course_id, 'answering:', answering);
    this.setState({answering, course_id});
  }

  doLogin(loginData) {
    //TODO: fix this pretty much the commented out version
    api.post('/login', loginData)
    // api.sudo_post('/login', loginData)
      .then((response)=>api.setToken(response.session_token))
      .then(() => this.doGetCourses())
      .then(() => this.goLanding())
    ;
  }

  doRegister(registerData) {
    //TODO: do login after register
    api.post('/register', registerData)
      .then((response)=>console.error('Register response:', response));
      // .then((response)=>api.setToken(response.session_token))
      // .then()
    // console.error('This is doRegister: ', registerData);
  }

  doLogout() {
    this.setState({
      bimodalLoginLanding: true,
      courses: null,
      questions: null,
      answering: null,
    });
  }

  goLanding() {
    this.setState({bimodalLoginLanding: false});
  }

  //TODO: do the answering
  doAnswer(answerData) {
    api.post('/answer', answerData)
      .then((response)=>console.warn('Posted answer, response was:', response, 'answerData:', answerData));
  }

  render() {
    // console.warn('This is entry point', 'courxse_id was:', this.state.course_id);
    // console.warn('EntryPoint');
    // for(let key in this.state){
    //   console.warn(key, this.state[key]);
    // }

    return (
      this.state.bimodalLoginLanding ?
        <LoginScene
          onCompleteLogin={this.doLogin}
          onCompleteRegister={this.doRegister}
        /> :
        <LandingScene
          doGetQuestions={this.doGetQuestions}
          doSetQuestions={this.doSetQuestions}
          doGetCourses={this.doGetCourses}
          doSetCourses={this.doSetCourses}
          doSetAnswering={this.doSetAnswering}
          doLogout={this.doLogout}
          doAnswer={this.doAnswer}
          courses={this.state.courses}
          questions={this.state.questions}
          answering={this.state.answering}
          course_id={this.state.course_id}
        />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: config.os === 'ios' ? 20: 0,
    backgroundColor: colors.basicWhite,
  },
});