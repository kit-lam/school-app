import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { getSatScores } from "../data";

export default class Details extends Component {
  state = {
    isLoading: true
  };

  componentDidMount() {
    const dbn = this.props.navigation.getParam("dbn");

    getSatScores(dbn).then(response =>
      this.setState({
        response,
        isLoading: false
      })
    );
  }

  render() {
    console.log(this.state.response && this.state.response.length);
    return (
      <View style={styles.container}>
        {this.state.isLoading ? (
          <Text>Loading....</Text>
        ) : this.state.response && this.state.response.length > 0 ? (
          <FlatList
            data={this.state.response}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.welcome}>{item.school_name}</Text>
                <Text>SATS</Text>
                <Text>Writing Average Score: {item.sat_writing_avg_score}</Text>
                <Text>Math Average Score: {item.sat_math_avg_score}</Text>
                <Text>
                  Critical Reading Average Score:
                  {item.sat_critical_reading_avg_score}
                </Text>
              </View>
            )}
            keyExtractor={item => item.dbn}
          />
        ) : (
          <Text>No SAT results</Text>
        )}
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
