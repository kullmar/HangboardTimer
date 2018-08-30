import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

class UpdateBaseline extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newBaseline: this.props.baseline
    };
  }

  handleChange = value =>
    this.setState(prevState => ({
      newBaseline: prevState.newBaseline + value
    }));

  render() {
    const { grip, baseline, onSave } = this.props;
    return (
      <View style={styles.container}>
        <Text>Grip: {grip}</Text>
        <Text>Current baseline: {baseline}</Text>
        <View style={styles.adjustBaseline}>
          <Text>New baseline: </Text>
          <Button title="-" onPress={() => this.handleChange(-5)} />
          <Text style={styles.newBaselineText}>{this.state.newBaseline}</Text>
          <Button title="+" onPress={() => this.handleChange(5)}/>
        </View>
      </View>
    );
  }
}

export default UpdateBaseline;

UpdateBaseline.propTypes = {
  grip: PropTypes.string,
  baseline: PropTypes.number,
  onSave: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  adjustBaseline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  newBaselineText: {
    fontWeight: 'bold'
  }
});
