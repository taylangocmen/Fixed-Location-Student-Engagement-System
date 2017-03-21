import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, Animated} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {opacity} from '../utils/Functions';
import {Uoft1024} from '../images/Images';
import {LoginCard} from '../components/LoginCard';
import {RegisterCard} from '../components/RegisterCard';


export class LoginScene extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bimodalLoginRegister: true,
      fadeAnim: new Animated.Value(0),
      error: 'Error: Default error message.'
    };

    this.alternateBimodal = this.alternateBimodal.bind(this);
    this.showError = this.showError.bind(this);
  }

  alternateBimodal() {
    const bimodalLoginRegister = !this.state.bimodalLoginRegister;

    this.setState({
      bimodalLoginRegister
    });
  }

  showError(error) {
    this.setState({error});
    setTimeout(() => Animated.timing(this.state.fadeAnim, {toValue: 1}).start(), 1000);
    setTimeout(() => Animated.timing(this.state.fadeAnim, {toValue: 0}).start(), 6000);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.showError === true){
      this.showError(nextProps.responseError);
      this.props.invalidateError();
    }
  }

  render() {
    return (
      <View style={styles.pageContainer}>
        <View style={styles.titleContainer}>
          <Uoft1024 />
          <Text style={styles.loginTitle}>
            Fixed Location Student Engagement System
          </Text>
        </View>
        <View style={styles.mainContainer}>
          {this.state.bimodalLoginRegister ?
            <LoginCard
              alternateBimodal={this.alternateBimodal}
              login={this.props.onCompleteLogin}
              showError={this.showError}
            />:
            <RegisterCard
              alternateBimodal={this.alternateBimodal}
              register={this.props.onCompleteRegister}
              showError={this.showError}
            />
          }
        </View>
        <View style={styles.errorContainerContainer}>
          <Animated.View style={[styles.errorContainer, {opacity: this.state.fadeAnim}]}>
            <Text style={styles.errorText}
                  ellipsizeMode='clip'
                  numberOfLines={1}
            >
              {this.state.error}
            </Text>
          </Animated.View>
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
  },
  errorContainerContainer:{
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    right: config.window.width/100,
    left: config.window.width/100,
    bottom: config.window.height/25,
  },
  errorContainer: {
    backgroundColor: opacity(colors.basicWhite, 0.5),
    padding: 10,
    borderRadius: 10
  },
  errorText: {
    textAlign: 'center',
  },
});
