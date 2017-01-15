import React from 'react';
import {Image, StyleSheet, View} from 'react-native';

import * as colors from '../styling/Colors';


export class BackgroundLogin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Image
      source={{uri: 'https://exitbooted.files.wordpress.com/2014/08/uoft-9.jpg'}}
      style={styles.right}
      resizeMode="cover"
    >
      {this.props.children}
    </Image>;
  }
}

export class BackgroundRegistration extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return <Image
      source={{uri: 'https://exitbooted.files.wordpress.com/2014/08/uoft-5.jpg'}}
      style={styles.left}
      resizeMode="cover"
    >
      {this.props.children}
    </Image>;
  }
}

const styles = StyleSheet.create({
  right: {
    flex: 1,
    resizeMode: 'cover',
    // opacity: 0.7,
  },
  left: {
    flex: 1,
    // flexDirection: 'row',
    resizeMode: 'cover',
    // opacity: 0.7,
  },
});
