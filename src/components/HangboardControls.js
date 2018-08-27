import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

const HangboardControls = ({ onPreviousSet, onNextSet }) => (
  <View style={styles.container}>
    <Button onPress={onPreviousSet} title="Previous set"></Button>
    <Button onPress={onNextSet} title="Next set"></Button>
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
