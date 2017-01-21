import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import * as colors from '../styling/Colors';
import {NavigationBar} from '../components/NavigationBar';


export class PageContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {children, bimodalLoginRegistration, bimodalToggle, signOut} = this.props;

    return (<View style={styles.pageContainer}>
      <NavigationBar
        bimodalLoginRegistration={bimodalLoginRegistration}
        bimodalToggle={bimodalToggle}
        signOut={signOut}
      />
      <View style={styles.innerContainer}>
        {children}
      </View>
    </View>);
  }
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    overflow: 'hidden',
    height: '100%',
  },
  innerContainer: {
    flex: 1,
  },
});
