import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator, TouchableHighlight, StatusBar, TouchableOpacity} from 'react-native';
// import {Provider} from 'react-redux';

import {config} from '../../config';
import {api} from '../app/api';
import * as colors from '../styling/Colors';
import {LoginScene} from '../scenes/LoginScene';
import {LandingScene} from '../scenes/LandingScene';


export class EntryPoint extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bimodalLoginLanding: true,
      courses: null,
      questions: null,
      answering: null,
      course_id: null,
      responseError: 'Error: Something went wrong.',
    };

    this.doGetQuestions = this.doGetQuestions.bind(this);
    this.doSetQuestions = this.doSetQuestions.bind(this);
    this.doGetCourses = this.doGetCourses.bind(this);
    this.doSetCourses = this.doSetCourses.bind(this);
    this.doSetAnswering = this.doSetAnswering.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.invalidateError = this.invalidateError.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.goLanding = this.goLanding.bind(this);
    this.doAnswer = this.doAnswer.bind(this);
    this.doPostQuestion = this.doPostQuestion.bind(this);
    this.doPutQuestion = this.doPutQuestion.bind(this);
    this.doPutCloseQuestion = this.doPutCloseQuestion.bind(this);
    this.doUpdateAnswering = this.doUpdateAnswering.bind(this);
  }

  doGetQuestions(course_id) {
    api.get(`/questions`, {course_id})
      .then((questions)=>this.doSetQuestions(questions, course_id))
    ;
  }

  doGetCourses() {
    this.setState({courses: null});

    api.get(`/courses`)
      .then(this.doSetCourses)
      .then(() => this.goLanding())
    ;
  }

  doSetCourses(courses) {
    this.setState({courses, course_id: null});
  }

  doSetQuestions(questions, course_id) {
    this.setState({questions, course_id});
  }

  doSetAnswering(answering, course_id) {
    this.setState({answering, course_id});
  }

  doLogin(loginData) {
    api.post('/login', loginData)
      .then((response) => {
        if(response.session_token !== undefined) {
          api.setToken(response.session_token);
          this.doGetCourses();
        } else if(response.error !== undefined){
          const responseError = 'Error: ' +  response.error + '.';
          this.setState({responseError, showError: true});
        } else {
          const responseError = 'Error: Could not login.';
          this.setState({responseError, showError: true});
        }
      })
    ;
  }

  doRegister(registerData) {
    api.post('/register', registerData)
      .then((response) => {
        if(response.error !== undefined){
          const responseError = 'Error: ' +  response.error + '.';
          this.setState({responseError, showError: true});
        } else {
          const loginData = {username: registerData.utorid, pass_hash: registerData.pass_hash};
          const enrolData = {course_id: 50};
          api.post('/login', loginData)
            .then((response) => {
              if(response.session_token !== undefined) {
                api.setToken(response.session_token);
                this.doGetCourses();
              } else if(response.error !== undefined){
                const responseError = 'Error: ' +  response.error + '.';
                this.setState({responseError, showError: true});
              } else {
                const responseError = 'Error: Could not login.';
                this.setState({responseError, showError: true});
              }
            })
            .then(()=>api.post('/enrol', enrolData))
            .then(()=>this.doGetCourses())
          ;
        }
      })
    ;
  }

  invalidateError() {
    this.setState({showError: false});
  }


  doLogout() {
    this.setState({
      bimodalLoginLanding: true,
      courses: null,
      questions: null,
      answering: null,
    });

    api.clearToken();
  }

  goLanding() {
    this.setState({bimodalLoginLanding: false});
  }

  doAnswer(answerData) {
    api.post('/answer', answerData)
      .then(()=>this.doGetQuestions(answerData.course_id))
      .then(()=>this.doUpdateAnswering(answerData))
    ;
  }

  //TODO: this return {"course_id":XX,"question_id":XXX}
  doPostQuestion(questionData) {
    // console.warn("doPostQuestion: ", JSON.stringify(questionData));

    api.post('/question', questionData)
      .then((response)=>this.doPutQuestion(response))
      .then(()=>this.doGetQuestions(questionData.course_id))
    ;
  }

  //TODO: this returns no response
  doPutQuestion(questionData) {
    api.put('/question', questionData)
    ;
  }

  //TODO: this returns no response
  doPutCloseQuestion(questionData) {
    api.put('/close_question', questionData)
      .then(()=>this.doGetQuestions(questionData.course_id))
    ;
  }

  doUpdateAnswering(answerData) {
    for(let i = 0; i < this.state.questions.active_questions.length; i++){
      if(this.state.questions.active_questions[i].question_id === answerData.question_id) {
        this.doSetAnswering({...this.state.questions.active_questions[i], answer: answerData.answer}, answerData.course_id);
      }
    }
  }

  render() {
    return (
      this.state.bimodalLoginLanding ?
        <LoginScene
          onCompleteLogin={this.doLogin}
          onCompleteRegister={this.doRegister}
          responseError={this.state.responseError}
          showError={this.state.showError}
          invalidateError={this.invalidateError}
        /> :
        <LandingScene
          doGetQuestions={this.doGetQuestions}
          doSetQuestions={this.doSetQuestions}
          doGetCourses={this.doGetCourses}
          doSetCourses={this.doSetCourses}
          doSetAnswering={this.doSetAnswering}
          doLogout={this.doLogout}
          doAnswer={this.doAnswer}

          doPostQuestion = {this.doPostQuestion}
          doPutQuestion = {this.doPutQuestion}
          doPutCloseQuestion = {this.doPutCloseQuestion}

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