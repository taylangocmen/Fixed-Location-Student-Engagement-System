import React, {Component} from 'react';
import {ActivityIndicator, AppRegistry, StyleSheet, Text, View, TextInput, ScrollView, Image} from 'react-native';

import * as colors from '../styling/Colors';


export const CardLeftColorBar = ({style}) => <View
  style={style}
/>;

export const NavigationChevronRight = ({style}) => <Image
  source={require('../material-design-icons/ic_chevron_right_white_48pt/ic_chevron_right_white_48pt.png')}
  style={style}
/>;

export const NavigationClose = ({style}) => <Image
  source={require('../material-design-icons/ic_close_white_48pt/ic_close_white_48pt.png')}
  style={style}
/>;

export const NavigationArrowBack = ({style}) => <Image
  source={require('../material-design-icons/ic_arrow_back_white_48pt/ic_arrow_back_white_48pt.png')}
  style={style}
/>;

export const NavigationMenu = ({style}) => <Image
  source={require('../material-design-icons/ic_menu_white_48pt/ic_menu_white_48pt.png')}
  style={style}
/>;

export const NavigationLogout = ({style}) => <Image
  source={require('../material-design-icons/ic_power_settings_new_white_48pt/ic_power_settings_new_white_48pt.png')}
  style={style}
/>;

export const NavigationRefresh = ({style}) => <Image
  source={require('../material-design-icons/ic_cached_white_48pt/ic_cached_white_48pt.png')}
  style={style}
/>;

export const NavigationPlus = ({style}) => <Image
  source={require('../material-design-icons/ic_note_add_white_48pt/ic_note_add_white_48pt.png')}
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