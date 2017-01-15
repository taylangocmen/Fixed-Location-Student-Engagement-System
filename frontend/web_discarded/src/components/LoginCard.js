import React from 'react';
import {StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';

import * as colors from '../styling/Colors';


export class LoginCard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {signIn} = this.props;

    return <View style={styles.cardContainer}>
      <View style={styles.card}>
        <TouchableOpacity onPress={signIn}>
          <View style={styles.titleTextContainer}>
            <Text style={styles.titleText}>Login</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.cardContent}>
          <View style={styles.cardRow}>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldText}>Student Number</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput placeholder="eg. 1234567890" style={styles.textInput} />
            </View>
          </View>
          <View style={styles.cardRow}>
            <View style={styles.fieldTextContainer}>
              <Text style={styles.fieldText}>Password</Text>
            </View>
            <View style={styles.textInputContainer}>
              <TextInput placeholder="eg. NOT 'password'" style={styles.textInput} secureTextEntry={true}/>
            </View>
          </View>
        </View>
      </View>
    </View>;
  }
}

const styles = StyleSheet.create({
  cardContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    width: '50%',
    minWidth: 400,
    backgroundColor: colors.cardBackground,
    paddingTop: 120,
    paddingBottom: 120,
  },
  card: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    borderRadius: 16,
    padding: 4,
    width: '60%',
    minWidth: 400,
    minHeight: 200,
    backgroundColor: colors.officialPrussianBlue,
  },
  titleTextContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
    padding: 8,
    borderRadius: 'inherit',
    backgroundColor: colors.officialPrussianBlue,
  },
  titleText: {
    fontSize: 30,
    color: colors.basicWhite,
  },
  cardContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'stretch',
    padding: 8,
    borderRadius: 'inherit',
    backgroundColor: colors.basicWhite,
  },
  cardRow: {
    paddingLeft: 30,
    paddingRight: 30,
  },
  fieldTextContainer:{
    padding: 4,
  },
  fieldText: {
    fontSize: 20,
    color: colors.secondaryBondiBlue,
  },
  textInputContainer:{
    padding: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: colors.accentGreyNurse,
  },
  textInput: {
    fontSize: 20,
    color: colors.accentJordyBlue,
  }
});
