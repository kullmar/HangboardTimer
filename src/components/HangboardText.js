import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HangboardText = ({ currentRep, currentSet, totalReps, totalSets }) => (
  <View style={styles.container}>
    <Text>Set: {currentSet}/{totalSets}</Text>
    <Text>Rep: {currentRep}/{totalReps}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
})

export default HangboardText;