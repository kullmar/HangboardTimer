import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Input } from 'react-native-elements';

class EditExercise extends Component {
  constructor(props) {
    super(props);
    const { grip, hangTime, restTime, finalRest, reps, sets, baseline } = this.props;
    this.state = {
      grip,
      hangTime,
      restTime,
      finalRest,
      reps,
      sets,
      baseline,
    };
  }

  render() {
    const { grip, hangTime, restTime, finalRest, reps, baseline } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>Grip: </Text>
          <Input
            style={styles.input}
            onChangeText={(text) => this.setState({ grip: text })}
            value={grip}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text>Hang time: </Text>
          <Input
            style={styles.input}
            keyboardType="numeric"
            onChangeText={(text) => this.setState({ grip: text })}
            value={hangTime}
          />
        </View>
        <Text>Rest time: {restTime / 1000}</Text>
        <Text>Final rest: {finalRest / 1000}</Text>
        <Text>Reps: {reps}</Text>
        <Text>Baseline weight: {baseline}</Text>
      </View>
    )
  }
}
export default EditExercise;

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    padding: 0,
    margin: 0,
  },
});
