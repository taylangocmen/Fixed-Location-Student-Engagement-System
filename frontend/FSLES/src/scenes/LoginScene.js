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
      bimodalLoginRegister: false
    };

    this.alternateBimodal = this.alternateBimodal.bind(this);
  }

  alternateBimodal() {
    const bimodalLoginRegister = !this.state.bimodalLoginRegister;

    this.setState({
      bimodalLoginRegister
    });
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
        <View style={styles.mainContainer}>
          {this.state.bimodalLoginRegister ?
            <LoginCard alternateBimodal={this.alternateBimodal} />:
            <RegisterCard alternateBimodal={this.alternateBimodal} />
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
    justifyContent: 'space-between',
    alignItems: 'stretch',
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
    fontSize: 22,
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
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    marginBottom: 40,
  }
});
