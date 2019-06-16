/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity
} from "react-native";
import { createAppContainer } from "react-navigation";
import { getSchools } from "../data";

export default class Home extends Component {
  state = {
    isLoading: true,
    error: null
  };

  componentDidMount() {
    getSchools().then(data =>
      this.setState({
        data
      })
    );
  }

  render() {
    const { isLoading, data } = this.state;

    console.log(this.state);
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>NYC Schools</Text>
        <Text style={styles.instructions}>
          Click on the links for more information
        </Text>

        <FlatList
          data={data}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate("Details", { dbn: item.dbn });
              }}
            >
              <Text style={styles.welcome}>{item.school_name}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});