import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

class EditSet extends Component {
  constructor(props) {
    super(props);
    const { grip, hangTime, restTime, finalRest, reps, weight } = this.props.set;
    this.state = {
      grip,
      hangTime,
      restTime,
      finalRest,
      reps,
      weight,
    };
  }

  render() {
    const { grip, hangTime, restTime, finalRest, reps, weight } = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text>Grip: </Text>
          <TextInput style={styles.input} onChangeText={(text) => this.setState({ grip: text })} value={grip} />
        </View>
        <View style={styles.inputContainer}>
          <Text>Hang time: </Text>
          <TextInput style={styles.input} keyboardType="numeric" onChangeText={(text) => this.setState({ grip: text })} value={hangTime} />
        </View>
        <Text>Rest time: {restTime / 1000}</Text>
        <Text>Final rest: {finalRest / 1000}</Text>
        <Text>Reps: {reps}</Text>
        <Text>Baseline weight: {weight}</Text>
      </View>
    )
  }
}
export default EditSet;

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
