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
    const { isLoading, response } = this.state;
    const { navigation } = this.props;
    const email = navigation.getParam("email");
    const website = navigation.getParam("website");
    const phone = navigation.getParam("phone");
    const name = navigation.getParam("name");

    return (
      <View style={styles.container}>
        <Text style={styles.detailsHeader}>{name}</Text>
        <Text style={styles.detailsText}>Email: {email}</Text>
        <Text style={styles.detailsText}>Phone: {phone}</Text>
        {/*TODO: make the website a link */}
        <Text style={styles.detailsText}>Website: {website}</Text>

        {/* TODO: display a loading spinner */}
        {isLoading ? (
          <Text>Loading....</Text>
        ) : // check if there is SAT data for the school, if not display message to user
        response && response.length > 0 ? (
          <FlatList
            data={response}
            renderItem={({ item }) => (
              <View>
                <Text style={styles.results}>SAT Results</Text>
                <Text style={styles.detailsText}>
                  Num of SAT test takers: {item.num_of_sat_test_takers}
                </Text>
                <Text style={styles.detailsText}>
                  Writing average ccore: {item.sat_writing_avg_score}
                </Text>
                <Text style={styles.detailsText}>
                  Math average score: {item.sat_math_avg_score}
                </Text>
                <Text style={styles.detailsText}>
                  Critical reading average score:
                  {item.sat_critical_reading_avg_score}
                </Text>
              </View>
            )}
            keyExtractor={item => item.dbn}
          />
        ) : (
          <Text style={styles.results}>No SAT results</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F5FCFF",
    flex: 1
  },
  detailsHeader: {
    fontSize: 26,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center"
  },
  results: {
    margin: 20,
    fontSize: 20,
    textAlign: "center"
  },
  detailsText: {
    color: "#333333",
    marginBottom: 5,
    textAlign: "center"
  }
});
