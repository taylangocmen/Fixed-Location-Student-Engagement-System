import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView} from 'react-native';


export const CardLeftColorBar = ({color}) => <View
  style={{backgroundColor: color, flex: 1, width: 4}}
/>;