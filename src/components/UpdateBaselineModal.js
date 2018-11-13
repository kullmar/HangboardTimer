import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Overlay} from 'react-native-elements';
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
        <Overlay
          isVisible
          onBackdropPress={() => onSave(this.state.newBaseline)}
        >
          <Text>Grip: {grip}</Text>
          <Text>Current baseline: {baseline}</Text>
          <View style={styles.adjustBaseline}>
            <Text>New baseline: </Text>
            <Button title="-" onPress={() => this.handleChange(-5)} />
            <Text style={styles.newBaselineText}>{this.state.newBaseline}</Text>
            <Button title="+" onPress={() => this.handleChange(5)}/>
          </View>
          <Button
            title="Save"
            buttonStyle={styles.saveButton}
            onPress={() => onSave(this.state.newBaseline)}
          />
        </Overlay>
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
    flex: 1,
  },
  adjustBaseline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  newBaselineText: {
    fontWeight: 'bold'
  },
  saveButton: {
    width: 100,
  },
});
