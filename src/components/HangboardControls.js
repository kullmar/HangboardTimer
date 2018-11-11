import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HangboardControls = ({ onpreviousExercise, onNextSet, onFailSet }) => (
  <View style={styles.container}>
    <Button onPress={onpreviousExercise} title="Previous exercise"></Button>
    <Button onPress={onNextSet} title="Next exercise"></Button>
    <Button onPress={onFailSet} title="Fail"></Button>
  </View>
);

export default HangboardControls;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  }
});
