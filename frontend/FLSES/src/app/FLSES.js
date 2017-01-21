import React, {Component} from 'react';
import {Navigator, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';

import {config} from '../../config';
import {Container} from '../components/Container';
import {TestComponent} from '../components/TestComponent';


export class FLSES extends Component {
  render() {
    //TODO: add the store
    //TODO: remove test component add the commented out rendering system
    //TODO: alert works
    // return <Provider store={{}}>
    //   <Navigator
    //     style={styles.navigator}
    //     renderScene={() =>
    //       <TestComponent />
    //     }
    //   />
    // </Provider>;
    return <Container>
      <TestComponent />
    </Container>;
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});