import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, Modal } from 'react-native';
import PropTypes from 'prop-types';

class UpdateBaselineModal extends Component {
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
        <Modal
          animationType="slide"
          transparent={false}
          onRequestClose={() => onSave(this.state.newBaseline)}
        >
          <Text>Grip: {grip}</Text>
          <Text>Current baseline: {baseline}</Text>
          <View style={styles.adjustBaseline}>
            <Text>New baseline: </Text>
            <Button title="-" onPress={() => this.handleChange(-5)} />
            <Text style={styles.newBaselineText}>{this.state.newBaseline}</Text>
            <Button title="+" onPress={() => this.handleChange(5)}/>
          </View>
          <Button title="OK" onPress={() => onSave(this.state.newBaseline)} />
        </Modal>
      </View>
    );
  }
}

export default UpdateBaselineModal;

UpdateBaselineModal.propTypes = {
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
