import React, {Component, PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';

import {config} from '../../config';


const propTypes = {
  children: PropTypes.node,
};

export class Container extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  
  render() {
    // const marginTop = (config.os === 'ios' ? 20: 0);
    const style = {flex: 1};

    return (
      <View style={style}>
        {this.props.children}
      </View>
    );
  }
}

Container.propTypes = propTypes;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1
//   },
// });