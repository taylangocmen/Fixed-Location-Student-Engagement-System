import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator, TouchableHighlight, StatusBar, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {EntryPoint} from '../scenes/EntryPoint';
import {Container} from '../components/Container';


export class FLSES extends Component {
  //TODO: add the store
  //TODO: remove test component add the commented out rendering system
  //TODO: alert works

  constructor(props) {
    super(props);
    this.state = {
      bimodalLoginHome: true,
    };

    this.onLogin = this.onLogin.bind(this);
  }

  onLogin() {
    this.setState({bimodalLoginHome: false});
  }

  render() {
    return (
      <Container style={styles.container}>
        <EntryPoint />
      </Container>
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