import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import * as colors from '../styling/Colors';
import {UofTSignatureBlue} from '../images/UofTSignatures';


export class NavigationBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {bimodalLoginRegistration, bimodalToggle, signOut} = this.props;

    return (<View style={styles.navBar}>
      <View style={styles.navBarLogoContainer}>
        <UofTSignatureBlue />
      </View>
      <View style={styles.navBarTextContainer}>
        <Text style={styles.navBarText}>
          Fixed Student Location Engagement System
        </Text>
      </View>
      <TouchableOpacity
        onPress={bimodalLoginRegistration !== null ? bimodalToggle: signOut}
        style={styles.rightButton}
      >
        {
          bimodalLoginRegistration !== null ?
            (bimodalLoginRegistration === true ?
              <Text style={styles.rightButtonText}>Don't have an account? Register.</Text>:
              <Text style={styles.rightButtonText}>Already have an account? Log in.</Text>):
            <Text style={styles.rightButtonText}>Welcome /*username here*/. Sign out.</Text>
        }
      </TouchableOpacity>
    </View>);
  }
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    height: 60,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: colors.navBarColor,
  },
  navBarLogoContainer:{
    flexDirection: 'row',
  },
  navBarTextContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 10,
    paddingLeft: 15,
  },
  navBarText: {
    fontSize: 20,
    color: colors.basicWhite,
  },
  rightButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 20,
  },
  rightButtonText: {
    fontSize: 14,
    color: colors.basicWhite,
  }
});
