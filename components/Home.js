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
import { getSchools } from "../data";
import { BorderlessButton } from "react-native-gesture-handler";

export default class Home extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    // get list of NYC schools, and store in state
    getSchools().then(data =>
      this.setState({
        data,
        isLoading: false
      })
    );
  }

  render() {
    const { isLoading, data } = this.state;

    return (
      <View style={styles.container}>
        <Text style={styles.header}>NYC Schools</Text>
        {isLoading ? (
          <Text>Loading Schools...</Text>
        ) : (
          <View style={styles.container}>
            <Text style={styles.instructions}>
              Click on the name for more details, and SAT results
            </Text>
            <FlatList
              data={data}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.detailsContainer}
                  onPress={() => {
                    // pass school details down as props so it does not need to make additional call to get school details
                    this.props.navigation.navigate("Details", {
                      dbn: item.dbn,
                      email: item.school_email,
                      name: item.school_name,
                      phone: item.phone_number,
                      website: item.website
                    });
                  }}
                >
                  <Text style={styles.name}>{item.school_name}</Text>
                </TouchableOpacity>
              )}
              keyExtractor={item => item.dbn}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "white",
    flex: 1,
    justifyContent: "center"
  },
  header: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center"
  },
  name: {
    fontSize: 20,
    margin: 10,
    textAlign: "center"
  },
  instructions: {
    color: "#333333",
    marginBottom: 5,
    textAlign: "center"
  },
  detailsContainer: {
    alignItems: "center",
    backgroundColor: "#e8f4f8",
    borderRadius: 10,
    margin: 10,
    width: "90%"
  }
});
