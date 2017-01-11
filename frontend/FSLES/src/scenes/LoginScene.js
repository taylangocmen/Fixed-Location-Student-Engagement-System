import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {Uoft1024} from '../images/Images';
import {LoginCard} from '../components/LoginCard';
import {RegisterCard} from '../components/RegisterCard';

export class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bimodalLoginRegister: true
    }
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Uoft1024 />
          <Text style={styles.loginTitle}>
            Fixed Student Location Engagement System
          </Text>
        </View>
        <View style={styles.cardContainer}>
          {this.state.bimodalLoginRegister ?
            <LoginCard />:
            <RegisterCard />
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: colors.officialPrussianBlue,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 5,
    marginRight: 10,
    marginLeft: 5,
    marginTop: 20,
  },
  loginTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: '600',
    paddingLeft: 5,
    color: colors.basicWhite,
    textAlign: 'left',
    textShadowColor: colors.secondaryBondiBlue,
    textShadowRadius: 10,
    textShadowOffset: {
      width: 1,
      height: 1,
    },
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginHorizontal: 40,
    marginVertical: 30,
    backgroundColor: colors.basicWhite,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.officialPrussianBlue,
    borderRadius: 16,
    padding: 16,
    shadowColor: colors.secondaryBondiBlue,
    shadowRadius: 12,
    shadowOpacity: 0.6,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
});
