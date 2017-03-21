import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {NavigationArrowBack, NavigationClose, NavigationMenu, NavigationLogout, NavigationRefresh} from '../components/NavigationComponents';


export class NavigationBar extends Component {
  constructor(props) {
    super(props);
    this.renderIcon = this.renderIcon.bind(this);
  }

  renderIcon(icon) {
    switch (icon) {
      case 'back':
        return <NavigationArrowBack style={styles.icon}/>;
      case 'close':
        return <NavigationClose style={styles.icon}/>;
      case 'menu':
        return <NavigationMenu style={styles.icon}/>;
      case 'logout':
        return <NavigationLogout style={styles.icon}/>;
      case 'refresh':
        return <NavigationRefresh style={styles.icon}/>;
      default:
        return <View />;
    }
  }

  render() {
    return (
      <View style={styles.navigationBarContainer}>
        <TouchableOpacity
          style={styles.leftContainer}
          onPress={this.props.onPressLeft}
        >
          {this.renderIcon(this.props.left)}
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>
            {this.props.title}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.rightContainer}
          onPress={this.props.onPressRight}
        >
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
    // backgroundColor: colors.basicRed,
    width: 30,
    height: 30,
  }
});