import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import {LoginPage} from './scenes/LoginPage';
import {HomePage} from './scenes/HomePage';

// // non laoreet tortor . Pellentesque habitant morbi tristique senectus et netus et malesuada
// // fames ac turpis egestas. Cras in urna eu libero laoreet lobortis et vel mauris. Fusce ac ligula orci. Fusce hendrerit
// // volutpat augue, id elementum lorem commodo vel. Praesent sit amet erat elit. Nunc a sem sed odio vulputate dictum vel
// // in eros. Aenean mi neque, aliquam eu lacus ac, tincidunt varius dui. Proin ultrices gravida iaculis. Nulla tristique,
// //   libero ut tincidunt malesuada, urna tellus dictum turpis, fringilla eleifend ligula libero vitae nulla. Sed malesuada
// // lobortis elit tempor ultricies. Sed sapien orci, finibus quis elementum mollis, mattis at nibh. Quisque facilisis in
// // urna quis vulputate. Quisque placerat eros at ultricies rutrum. Phasellus lobortis felis id felis aliquam hendrerit.
// //
// //   Donec sed scelerisque felis, et pretium velit. Mauris interdum ornare arcu elementum vulputate. Pellentesque dictum,
// //   felis at condimentum cursus, eros neque gravida ex, eget elementum dolor eros eu tellus. Nulla venenatis fermentum
// // blandit. Integer augue ipsum, porta non felis a, blandit elementum quam. Quisque ipsum dolor, porttitor ac odio quis,
// //   egestas fringilla turpis. Nullam sed erat ut lectus convallis tempus. Phasellus nec aliquet libero. Sed velit leo,
// //   vulputate sed fermentum dignissim, egestas ornare velit. Aliquam erat volutpat. Mauris dictum lectus eget orci sagittis
// // vehicula. Proin lectus purus, tempor sed nisi sed, euismod consequat dolor. Nullam pharetra diam mauris, a gravida sem
// // vulputate et. Nulla fringilla augue at elit viverra convallis consectetur quis lorem. In hac habitasse platea dictumst.
// //
// //   Proin tincidunt nibh id nulla ornare cursus. Nunc vel scelerisque eros, et interdum elit. Donec sed neque nulla.
// //   Aenean vel enim mi. Quisque pulvinar leo sapien, a feugiat nulla convallis eu. Maecenas feugiat est massa, at gravida
// // libero volutpat vel. Vivamus eu euismod enim. Vivamus at pulvinar neque. Duis enim odio, pellentesque in vulputate
// // ullamcorper, porta vitae nisi. Aenean molestie nibh nisi, quis ullamcorper urna cursus eu. Duis varius id nisl eget
// // lobortis. Praesent quis condimentum nisi. Integer vel dui a augue efficitur semper at eget libero.
// //
// //   Pellentesque et dui posuere, aliquam enim sit amet, placerat nibh. In eget lectus est. Phasellus at nisi non est congue
// // laoreet. Curabitur facilisis, nulla nec ultricies faucibus, elit massa accumsan mauris, sagittis congue sem metus nec
// // velit. Nam diam dui, scelerisque id gravida ut, maximus in mauris. Proin cursus lacus vel dui ultricies, posuere auctor
// // odio porta. Phasellus sapien sapien, lobortis sit amet felis non, lobortis elementum nulla.
//
// // TODO: fix the static object with API calls
// const classes = {
//   ABC123: {
//     description: "Donec sit amet suscipit lacus",
//     activeQuestions: [
//       {},
//       {}
//     ],
//     inactiveQuestions: [
//       {},
//       {}
//     ],
//   },
//   DEF456: {
//
//   },
//   GHI789: {
//
//   },
//   JKL101: {
//
//   },
//   MNO112: {
//
//   },
//   PQR131: {
//
//   }
// };


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // TODO: change this to false in the final version
      loggedIn: false,
    };
    this.signOut = this.signOut.bind(this);
    this.signIn = this.signIn.bind(this);
    this.registerUser = this.registerUser.bind(this);
  }

  // TODO: add objects to this
  signOut() {
    this.setState({
      loggedIn: false,
    });
  }

  // TODO: add user check
  signIn() {
    this.setState({
      loggedIn: true,
    });
  }

  registerUser() {
    this.setState({
      loggedIn: true,
    });
  }

  render() {
    return (
      this.state.loggedIn ?
        <HomePage signOut={this.signOut}/>:
        <LoginPage signIn={this.signIn} registerUser={this.registerUser}/>
    );
  }
}

const styles = StyleSheet.create({

});
