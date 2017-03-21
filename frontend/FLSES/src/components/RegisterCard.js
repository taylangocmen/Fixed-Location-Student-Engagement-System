import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';


export class RegisterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      email: '',
      utorid: '',
      pass_hash: '',
      pass_hash_confirm: '',
    };
    this.doRegister = this.doRegister.bind(this);
  }

  doRegister() {
    if (this.state.first_name === '')
      this.props.showError('Error: Cannot leave given name(s) empty.');

    else if (this.state.last_name === '')
      this.props.showError('Error: Cannot leave last name empty.');

    else if (this.state.email === '')
      this.props.showError('Error: Cannot leave email empty.');

    else if (this.state.utorid === '')
      this.props.showError('Error: Cannot leave utorid empty.');

    else if (this.state.pass_hash === '')
      this.props.showError('Error: Cannot leave password empty.');

    else if (this.state.pass_hash_confirm === '')
      this.props.showError('Error: Cannot leave confirm password empty.');

    else if(this.state.pass_hash === this.state.pass_hash_confirm)
      this.props.showError('Error: Passwords do not match.');

    else if(this.state.pass_hash.length < 8)
      this.props.showError('Error: Password cannot be less than 8 character.');

    else {
      const registerData = {
        first_name: this.state.first_name,
        last_name: this.state.last_name,
        email: this.state.email,
        utorid: this.state.utorid,
        pass_hash: this.state.pass_hash
      };
      this.props.register(registerData);
    }
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <TextInput
            value={this.state.first_name}
            onChange={(e) => this.setState({first_name: e.nativeEvent.text})}
            autoFocus={false}
            autoCorrect={false}
            secureTextEntry={false}
            placeholder='given name(s)'
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            value={this.state.last_name}
            onChange={(e) => this.setState({last_name: e.nativeEvent.text})}
            autoFocus={false}
            autoCorrect={false}
            secureTextEntry={false}
            placeholder='last name(s)'
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            value={this.state.email}
            onChange={(e) => this.setState({email: e.nativeEvent.text})}
            autoFocus={false}
            autoCorrect={false}
            secureTextEntry={false}
            placeholder='email'
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            value={this.state.utorid}
            onChange={(e) => this.setState({utorid: e.nativeEvent.text})}
            autoFocus={false}
            autoCorrect={false}
            secureTextEntry={false}
            placeholder='utorid'
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
        <View style={styles.rowContainer}>
          <TextInput
            value={this.state.pass_hash_confirm}
            onChange={(e) => this.setState({pass_hash_confirm: e.nativeEvent.text})}
            autoFocus={false}
            autoCorrect={false}
            secureTextEntry={true}
            placeholder='confirm password'
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={()=>this.doRegister()}
            style={styles.submitButton}
          >
            <Text style={styles.buttonText}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.props.alternateBimodal}
            style={styles.alternateButton}
          >
            <Text style={styles.alternateText}>
              Already have an account? Login instead.
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
