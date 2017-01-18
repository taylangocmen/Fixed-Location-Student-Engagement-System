import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {NavigationArrowBack, NavigationClose, NavigationMenu} from '../images/Icons';


export class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.renderIcon = this.renderIcon.bind(this);
  }

  renderIcon(icon) {
    return (icon === 'back' ?
      <NavigationArrowBack style={styles.icon}/>:
      (icon === 'close' ?
          <NavigationClose style={styles.icon}/>:
          (icon === 'menu' ?
              <NavigationMenu style={styles.icon}/>:
              <View />
          )));
  }

  render() {
    return (
      <View style={styles.navigationBarContainer}>
        <TouchableOpacity style={styles.leftContainer}>
          {this.renderIcon(this.props.left)}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {this.props.title}
          </Text>
        </View>
        <TouchableOpacity style={styles.rightContainer}>
          {this.renderIcon(this.props.right)}
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  navigationBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.officialPrussianBlue,
    height: 50,
  },
  titleContainer: {
    flex: 1,
  },
  leftContainer: {
    paddingHorizontal: 8
  },
  rightContainer: {
    paddingHorizontal: 8
  },
  titleText: {
    color: colors.basicWhite,
    fontSize: 26,
    fontWeight: '700',
    textAlign: 'center',
    alignSelf: 'center'
  },
  icon: {
    backgroundColor: colors.officialPrussianBlue,
    width: 32,
    height: 32,
  }
});