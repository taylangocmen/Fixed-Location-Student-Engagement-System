import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator, TouchableHighlight, StatusBar, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';

import {config} from '../../config';
import {api} from '../app/api';
import * as colors from '../styling/Colors';
import {scenesByIndex} from '../utils/Modals';
import {opacity} from '../utils/Functions';
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

    this.doGetCourses = this.doGetCourses.bind(this);
    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.goLanding = this.goLanding.bind(this);
  }

  doGetCourses() {
    api.get(`/courses`, api.returnToken())
      .then((response) => this.setState({courses: {...response}}))
    ;
  }

  doLogin(loginData) {
    api.post('/login', loginData)
      .then((response)=>api.setToken(response.session_token))
      .then(() => this.doGetCourses())
      .then(() => this.goLanding())
    ;
  }

  doRegister() {
    console.warn('This is doRegister');
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
    console.warn('EntryPoint token is: ', api.returnToken().session_token, api.session_token());

    return (
      this.state.bimodalLoginLanding ?
        <LoginScene
          onCompleteLogin={this.doLogin}
          onCompleteRegister={this.doRegister}
        /> :
        <LandingScene
          doLogout={()=>this.doLogout()}
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