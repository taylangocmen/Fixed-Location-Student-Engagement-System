import React, {Component} from 'react';
import {Navigator, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {COLOR, ThemeProvider} from 'react-native-material-ui';

import {config} from '../../config';
import {} from '../components/Container';
import {TestIos} from '../components/TestIos';
import {TestAndroid} from '../components/TestAndroid';
import {TestComponent} from '../components/TestComponent';


const uiTheme = {
  palette: {
    primaryColor: COLOR.green500,
  },
  toolbar: {
    container: {
      height: 50,
    },
  },
};

export class FSLES extends Component {
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
    return <ThemeProvider uiTheme={uiTheme}>
      <TestComponent />
    </ThemeProvider>
  }
}

const styles = StyleSheet.create({
  navigator: {
    flex: 1
  }
});