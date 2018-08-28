import React from 'react';
import { View, Text } from 'react-native';

const Set = ({ set }) => (
  <View>
    <Text>Grip: {set.grip}</Text>
    <Text>Hang time: {set.hangTime / 1000}</Text>
    <Text>Rest time: {set.restTime / 1000}</Text>
    <Text>Final rest: {set.finalRest / 1000}</Text>
    <Text>Reps: {set.reps}</Text>
    <Text>Baseline weight: {set.weight}</Text>
  </View>
);

export default Set;