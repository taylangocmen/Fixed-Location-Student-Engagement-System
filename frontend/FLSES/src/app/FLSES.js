import React, {Component} from 'react';
import {AppRegistry, StyleSheet, Text, View, Navigator, TouchableHighlight, StatusBar, TouchableOpacity} from 'react-native';
import {Provider} from 'react-redux';

import {config} from '../../config';
import * as colors from '../styling/Colors';
import {scenesByIndex} from '../utils/Modals';
import {opacity} from '../utils/Functions';
import {LoginScene} from '../scenes/LoginScene';
import {LandingScene} from '../scenes/LandingScene';
import {QuestionsScene} from '../scenes/QuestionsScene';
import {AnsweringScene} from '../scenes/AnsweringScene';
import {Container} from '../components/Container';
import {NavigationBar} from '../components/NavigationBar';
import {NavigationClose, NavigationMenu, NavigationArrowBack, NavigationTitle} from '../components/NavigationComponents';


export class FLSES extends Component {
  //TODO: add the store
  //TODO: remove test component add the commented out rendering system
  //TODO: alert works

  constructor(props) {
    super(props);
    this.state = {
    };

    this.renderScene = this.renderScene.bind(this);
    // this.loginScene = this.loginScene.bind(this);
    // this.landingScene = this.landingScene.bind(this);
    // this.questionsScene = this.questionsScene.bind(this);
    // this.answeringScene = this.answeringScene.bind(this);
    // this.renderLeftButton = this.renderLeftButton.bind(this);
    // this.renderRightButton = this.renderRightButton.bind(this);
    // this.renderTitle = this.renderTitle.bind(this);
  }

  renderScene(route, navigator) {
    switch(route.index) {
      case 0:
        return <LoginScene />;
        break;
      case 1:
        return <LandingScene />;
        break;
      case 2:
        return <QuestionsScene />;
        break;
      case 3:
        return <AnsweringScene />;
        break;
      default:
        return <LoginScene />;
    }
  }


  // renderLeftButton(route, navigator, index, navState) {
  //   return <TouchableOpacity>
  //     <NavigationArrowBack />
  //   </TouchableOpacity>;
  // }
  //
  // renderRightButton(route, navigator, index, navState) {
  //   return <TouchableOpacity>
  //     <NavigationMenu />
  //   </TouchableOpacity>;
  // }
  //
  // renderTitle(route, navigator, index, navState) {
  //   return <NavigationTitle
  //     title={"Default Title"}
  //   />;
  // }

  render() {
    const routes = [
      {title: scenesByIndex[0], index: 0},
      {title: scenesByIndex[1], index: 1},
      {title: scenesByIndex[2], index: 2},
      {title: scenesByIndex[3], index: 3},
    ];
    return (
      <Container style={styles.container}>
        <StatusBar
          hidden={true}
          // animated={true}
          // translucent={true}
        />
        <Navigator
          style={styles.container}
          initialRoute={routes[0]}
          initialRouteStack={routes}
          renderScene={(route, navigator) =>
            <Container>
              {this.renderScene(route, navigator)}
            </Container>
          }
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});