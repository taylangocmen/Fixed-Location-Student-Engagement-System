import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';

import * as colors from '../styling/Colors';


//TODO: change this to style like the one below
export const CardLeftColorBar = ({backgroundColor, width}) => <View
  style={{backgroundColor, width}}
/>;

export const NavigationChevronRight = ({backgroundColor, width}) => <Image
  source={require('../material-design-icons/navigation/ios/ic_chevron_right_white_48pt.imageset/ic_chevron_right_white_48pt.png')}
  style={{backgroundColor, width}}
  resizeMode={Image.resizeMode.contain}
/>;

export const NavigationClose = () => <View style={styles.iconContainer}><Image
  source={require('../material-design-icons/navigation/ios/ic_close_white_48pt.imageset/ic_close_white_48pt.png')}
  style={styles.icon}
/></View>;

export const NavigationArrowBack = () => <View style={styles.iconContainer}><Image
  source={require('../material-design-icons/navigation/ios/ic_arrow_back_white_48pt.imageset/ic_arrow_back_white_48pt.png')}
  style={styles.icon}
/></View>;

export const NavigationMenu = () => <View style={styles.iconContainer}><Image
  source={require('../material-design-icons/navigation/ios/ic_menu_white_48pt.imageset/ic_menu_white_48pt.png')}
  style={styles.icon}
/></View>;

export const NavigationTitle = ({title}) => <View style={styles.titleContainer}>
  <Text style={styles.titleText}>
    {title} 
  </Text>
</View>;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 30,
  },
  iconContainer:{
    flex: 1,
  },
  titleText: {
    backgroundColor: colors.officialPrussianBlue,
    color: colors.basicWhite,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center',
  },
  icon: {
    backgroundColor: colors.officialPrussianBlue,
    width: 30,
    height: 30,
    marginRight: 8,
    marginLeft: 8,
  }
});