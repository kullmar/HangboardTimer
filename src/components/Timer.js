import React from 'react';
import { Text, View, Button, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

const formatTime = (time) => {
  if (time < 0) {
    time = 0;
  }
  let minutes = Math.floor((time) / 1000 / 60);
  minutes = minutes === 0 ? '' : `${minutes}:`;
  let seconds = Math.floor((time / 1000) % 60);
  const milliseconds = Math.floor((time / 100) % 10);
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }
  return `${minutes}${seconds}:${milliseconds}`;
}

export default function Timer({ time, active, onToggle }) {
  const timeFormatted = formatTime(time);

  return (
    <View style={styles.container}>
      <Text style={[styles.text, !active && styles.resting]}>
        {timeFormatted}
      </Text>
      <Button onPress={onToggle} title={active ? "Pause" : "Start"} />
    </View>
  );
}

Timer.propTypes = {
  time: PropTypes.number,
  active: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    color: 'green',
  },
  resting: {
    color: 'red',
  },
});
