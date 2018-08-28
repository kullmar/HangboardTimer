import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HangboardText = ({
  currentRep,
  currentSet,
  grip,
  totalReps,
  totalSets,
  weight
}) => (
  <View style={styles.container}>
    <Text>Grip: {grip}</Text>
    <Text>
      Set: {currentSet}/{totalSets}
    </Text>
    <Text>
      Rep: {currentRep}/{totalReps}
    </Text>
    <Text>Weight: {weight}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});

export default HangboardText;
