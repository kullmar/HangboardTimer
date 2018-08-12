import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import HangboardTimer from './src/containers/HangboardTimer';

const store = createStore(rootReducer);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <HangboardTimer />
      </Provider>
    );
  }
}
