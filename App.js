/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import { createStackNavigator, createAppContainer } from "react-navigation";
import React, { Component } from "react";
import Home from "./components/Home";
import Details from "./components/Details";

const RootStack = createStackNavigator(
  {
    Home: Home,
    Details: Details
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}
