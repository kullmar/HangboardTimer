import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const HangboardText = ({
  currentRep,
  currentSet,
  grip,
  nextGrip,
  nextWeight,
  totalReps,
  totalSets,
  weight
}) => (
  <View style={styles.outerContainer}>
    <View style={styles.innerContainerPrimary}>
      <Text style={styles.title}>Current set</Text>
      <Text>Grip: {grip}</Text>
      <Text>
        Set: {currentSet}/{totalSets}
      </Text>
      <Text>
        Rep: {currentRep}/{totalReps}
      </Text>
      <Text>Weight: {weight}</Text>
    </View>
    <View style={styles.innerContainerSecondary}>
      <Text style={styles.title}>Next set</Text>
      <Text>Grip: {nextGrip}</Text>
      <Text>Weight: {nextWeight}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerContainerPrimary: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainerSecondary: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default HangboardText;
