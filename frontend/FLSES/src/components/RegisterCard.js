import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';


export class RegisterCard extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.cardContainer}>
        <View style={styles.rowContainer}>
          <TextInput
            autoFocus={false}
            autoCorrect={false}
            placeholder="given name(s)"
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            autoFocus={false}
            autoCorrect={false}
            placeholder="last name(s)"
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            autoFocus={false}
            autoCorrect={false}
            placeholder="student #"
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            autoFocus={false}
            autoCorrect={false}
            placeholder="password"
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.rowContainer}>
          <TextInput
            autoFocus={false}
            autoCorrect={false}
            placeholder="confirm password"
            placeholderTextColor={colors.secondaryBondiBlue}
            style={styles.cardInput}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={this.props.register}
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
