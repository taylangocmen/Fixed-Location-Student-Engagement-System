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
  //TODO: add the store
  //TODO: remove test component add the commented out rendering system
  //TODO: alert works

  constructor(props) {
    super(props);
    this.state = {
      // TODO: make this true
      bimodalLoginHome: true,
    };

    this.onLogin = this.onLogin.bind(this);
    this.onRegister = this.onRegister.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }

  onLogin(obj) {
    console.warn('This is onLogin, obj');

    // api.post('/login', {
    //   ...obj,
    // });

    this.setState({bimodalLoginHome: false});
  }

  onRegister() {
    console.warn('This is onRegister');

    // api.post('register', {
    //   'first_name': 'test_name',
    //   'last_name': 'test_last_name',
    //   'email': 'test.user@mail.utoronto.ca',
    //   'utorid': '1234567890',
    //   'pass_hash': 'testtesttesttest',
    // });
    //
    this.setState({bimodalLoginHome: false});
  }

  onLogout() {
    this.setState({bimodalLoginHome: true});
  }

  render() {
    return (
      this.state.bimodalLoginHome ?
        <LoginScene
          onCompleteLogin={this.onLogin}
          onCompleteRegister={this.onRegister}
        /> :
        <LandingScene onLogout={()=>this.onLogout()}/>
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