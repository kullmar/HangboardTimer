import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

const HangboardControls = ({ onPreviousExercise, onNextExercise, onFailSet }) => (
  <View style={styles.outerContainer}>
    <View style={styles.container}>
      <Button
        onPress={onPreviousExercise}
        title="Previous exercise"
        buttonStyle={styles.exerciseButton}
      />
      <Button
        onPress={onNextExercise}
        title="Next exercise"
        buttonStyle={styles.exerciseButton}
      />
    </View>
    <View style={styles.container}>
      <Button onPress={onFailSet} title="Fail" buttonStyle={styles.failButton} />
    </View>
  </View>
);

export default HangboardControls;

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    alignItems: 'center',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  exerciseButton: {
    margin: 5,
    width: 150,
  },
  failButton: {
    width: 80,
  },
});
