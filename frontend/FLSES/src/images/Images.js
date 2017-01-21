import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';

import * as colors from '../styling/Colors';


export const Uoft1024 = () => <Image
  source={require('./Uoftlogo1024.png')}
  style={styles.Uoft1024}
/>;

const styles = StyleSheet.create({
  Uoft1024: {
    width: 80,
    height: 80,
    shadowColor: colors.secondaryBondiBlue,
    shadowRadius: 4,
    shadowOpacity: 0.6,
  }
});