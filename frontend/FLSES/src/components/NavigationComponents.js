import React, {Component} from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';

import * as colors from '../styling/Colors';


//TODO: change this to style like the one below
export const CardLeftColorBar = ({backgroundColor, width}) => <View
  style={{backgroundColor, width}}
/>;

export const NavigationChevronRight = ({backgroundColor, width}) => <Image
  source={require('../material-design-icons/navigation/ios/ic_chevron_right_white_48pt.imageset/ic_chevron_right_white_48pt.png')}
  style={{backgroundColor, width}}
/>;

export const NavigationClose = ({style}) => <Image
  source={require('../material-design-icons/navigation/ios/ic_close_white_48pt.imageset/ic_close_white_48pt.png')}
  style={style}
/>;

export const NavigationArrowBack = ({style}) => <Image
  source={require('../material-design-icons/navigation/ios/ic_arrow_back_white_48pt.imageset/ic_arrow_back_white_48pt.png')}
  style={style}
/>;

export const NavigationMenu = ({style}) => <Image
  source={require('../material-design-icons/navigation/ios/ic_menu_white_48pt.imageset/ic_menu_white_48pt.png')}
  style={style}
/>;

export const NavigationLogout = ({style}) => <Image
  source={require('../material-design-icons/action/ios/ic_power_settings_new_white_48pt.imageset/ic_power_settings_new_white_48pt.png')}
  style={style}
/>;

export const NavigationRefresh = ({style}) => <Image
  source={require('../material-design-icons/action/ios/ic_cached_white_48pt.imageset/ic_cached_white_48pt.png')}
  style={style}
/>;

export const NavigationLoading = ({style}) => <View
  style={{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }}
>
  <ActivityIndicator
    size="large"
    color={colors.officialPrussianBlue}
  />
</View>;