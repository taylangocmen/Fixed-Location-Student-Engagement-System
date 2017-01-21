import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';

import * as colors from '../styling/Colors';
import {PageContainer} from '../containers/PageContainer';
import {BackgroundLogin, BackgroundRegistration} from '../images/BackgroundsImages';
import {LoginCard} from '../components/LoginCard';
import {RegistrationCard} from '../components/RegistrationCard';


export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      bimodalLoginRegistration: true,
    };
    this.bimodalToggle = this.bimodalToggle.bind(this);
  }

  bimodalToggle() {
    const nextBimodal = !this.state.bimodalLoginRegistration;

    this.setState({
      bimodalLoginRegistration: nextBimodal,
    });
  }

  render() {
    const {signIn, registerUser} = this.props;

    return <PageContainer
      bimodalLoginRegistration={this.state.bimodalLoginRegistration}
      bimodalToggle={this.bimodalToggle}
    >
      {
        this.state.bimodalLoginRegistration ?
          <BackgroundLogin>
            <LoginCard signIn={signIn}/>
          </BackgroundLogin>:
          <BackgroundRegistration>
            <RegistrationCard registerUser={registerUser}/>
          </BackgroundRegistration>
      }
    </PageContainer>;
  }
}

const styles = StyleSheet.create({
});
