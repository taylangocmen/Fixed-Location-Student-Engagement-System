import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
// var bcrypt = require('bcrypt');
// var scrypt = require('scrypt');


import {config} from '../../config';
import * as colors from '../styling/Colors';


export class LoginCard extends Component {
  constructor(props) {
    super(props);
    const username = config.testUser !== undefined ? config.testUser.username : '';
    const pass_hash = config.testUser !== undefined ? config.testUser.pass_hash : '';
    this.state = {
      username,
      pass_hash,
    };

    this.handleLogin = this.handleLogin.bind(this);
  }

  handleLogin() {
    const {username, pass_hash} = this.state;

    this.props.login({username, pass_hash});
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <TextInput
            value={this.state.username}
            onChange={(e) => this.setState({username: e.nativeEvent.text})}
            autoFocus={false}
            autoCorrect={false}
            secureTextEntry={false}
            placeholder='student #'
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            value={this.state.pass_hash}
            onChange={(e) => this.setState({pass_hash: e.nativeEvent.text})}
            autoFocus={false}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder='password'
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.handleLogin}
            style={styles.submitButton}
          >
            <Text style={styles.buttonText}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.props.alternateBimodal}
            style={styles.alternateButton}
          >
            <Text style={styles.alternateText}>
              Don't have an account? Register.
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    marginHorizontal: 40,
    marginVertical: 30,
    backgroundColor: colors.basicWhite,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.officialPrussianBlue,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.accentJordyBlue,
    shadowRadius: 12,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  rowContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    borderColor: colors.accentGreyNurse,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: 4,
    margin: 4,
  },
  cardInput: {
    height: 40,
  },
  buttonContainer: {
    marginTop: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  submitButton: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: 200,
    backgroundColor: colors.secondaryCrimson,
    borderRadius: 16,
    shadowColor: colors.secondaryCocoaBrown,
    shadowRadius: 4,
    shadowOpacity: 0.2,
  },
  buttonText: {
    color: colors.basicWhite,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
  },
  alternateButton: {

  },
  alternateText: {
    color: colors.secondaryBondiBlue,
    textAlign: 'center',
    fontSize: 14,
    textDecorationLine: 'underline',
  }
});
