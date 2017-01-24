// import React, {Component} from 'react';
// import {AppRegistry, StyleSheet, Text, View} from 'react-native';
//
// import {config} from '../../config';
// import {LoginScene} from '../scenes/LoginScene'
// import {LandingScene} from '../scenes/LandingScene'
//
//
// export class TestComponent extends Component {
//   constructor(props) {
//     super(props);
//     //TODO: change this to true when testing the flow
//     this.state = {
//       bimodalLoginHome: true
//     }
//   }
//
//   render() {
//     return (
//       this.state.bimodalLoginHome ?
//         <LoginScene onComplete={()=>this.setState({bimodalLoginHome: false})}/>:
//         <LandingScene />
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
