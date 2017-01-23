import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator, TouchableHighlight, StatusBar, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';

import {config} from '../../config';
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
      bimodalLoginHome: true,
    };

    this.onLogin = this.onLogin.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    this.setState({bimodalLoginHome: false});
  }

  onLogout() {
    this.setState({bimodalLoginHome: true});
  }

  render() {
    return (
      this.state.bimodalLoginHome ?
        <LoginScene onComplete={()=>this.onLogin()}/> :
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