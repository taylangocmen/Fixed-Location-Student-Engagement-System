import React, {Component, PropTypes} from 'react';
import {View, StyleSheet} from 'react-native';


const propTypes = {
  children: PropTypes.node,
};

export class Container extends Component {
  render() {
    return (
      <View style={styles.container}>
        {this.props.children}
      </View>
    );
  }
}

Container.propTypes = propTypes;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});