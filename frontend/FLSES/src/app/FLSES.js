import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator, TouchableHighlight, StatusBar, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {EntryPoint} from '../scenes/EntryPoint';
import {Container} from '../components/Container';
import {EmptyComponent} from '../components/EmptyComponent';
import {BluetoothTest} from '../bluetooth/BluetoothTest';


export class FLSES extends Component {
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
        {
          <EntryPoint />
          // <EmptyComponent />
          // <BluetoothTest />
        }
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