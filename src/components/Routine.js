import React from 'react';
import { View, ScrollView, Text, StyleSheet } from 'react-native';
import Set from './Set';
import PropTypes from 'prop-types';

const Routine = ({ routine }) => {
  const sets = routine.sets.map((set, index) => (
    <Set set={set} key={index} />
  ));
  return (
    <ScrollView>
      <Text style={styles.title}>{routine.name}</Text>
      <Text style={styles.subtitle}>{routine.board}</Text>
      {sets}
    </ScrollView>
  );
};

export default Routine;

Routine.propTypes = {
  routine: PropTypes.shape({
    name: PropTypes.string,
    board: PropTypes.string,
    sets: PropTypes.array,
  })
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  set: {

  },
  title: {
    fontWeight: 'bold'
  }
});
