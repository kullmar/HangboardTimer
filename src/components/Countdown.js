import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: this.props.seconds,
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      this.setState(prevState => ({
        counter: prevState.counter - 1,
      }));
      if (this.state.counter <= 0) {
        clearInterval(this.interval);
        if (this.props.onFinished) this.props.onFinished();
        return;
      }
    }, 1000);
  }

  componentWillUnmount() {
    if (this.interval) clearInterval(this.interval);
  }

  render() {
    const { counter } = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.countdownText}>{counter}</Text>
      </View>
    )
  }
}

export default Countdown;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  countdownText: {
    fontSize: 60,
    color: 'orange',
  },
});
