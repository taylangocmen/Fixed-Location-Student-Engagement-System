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
  }

  doGetQuestions(course_id) {
    api.get(`/questions`, {...api.getTokenObj(), course_id})
      .then(this.doSetQuestions)
    ;
  }

  doGetCourses() {
    api.get(`/courses`, api.getTokenObj())
      .then(this.doSetCourses)
    ;
  }

  //TODO: do a get request with questions
  doSetQuestions(questions) {
    this.setState({questions});
  }

  doSetCourses(courses) {
    this.setState({courses});
  }

  doSetAnswering(answering) {
    this.setState({answering});
  }

  doLogin(loginData) {
    //TODO: fix this pretty much the commented out version
    // api.post('/login', loginData)
    api.sudo_post('/login', loginData)
      .then((response)=>api.setToken(response.session_token))
      .then(() => this.doGetCourses())
      .then(() => this.goLanding())
    ;
  }

  doRegister() {
    console.error('This is doRegister');
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

  render() {
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
          courses={this.state.courses}
          questions={this.state.questions}
          answering={this.state.answering}
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