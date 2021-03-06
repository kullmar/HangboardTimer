import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import HangboardTimer from './src/containers/HangboardTimer';
import RoutineContainer from './src/containers/RoutineContainer';
import SoundPlayer from './src/containers/SoundPlayer';
import { createStackNavigator } from 'react-navigation';
import { createLogger } from 'redux-logger'

/**
 * Storybook removed from package.json until storybook can be enabled with env variables
 */
// import StorybookUI from './storybook';
// export default StorybookUI;

const middlewares = [];

if (process.env.NODE_ENV === `development`) {
  const logger = createLogger({
    diff: true,
  });

  middlewares.push(logger);
}

const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);

class Home extends React.Component {
  render() {
    return (
      <View>
        <ListItem
          key={'routine'}
          title={'Routine'}
          bottomDivider
          onPress={() => this.props.navigation.navigate('Routine')}
        />
        <ListItem
          key={'workout'}
          title={'Workout'}
          onPress={() => this.props.navigation.navigate('Workout')}
        />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: Home,
    Routine: RoutineContainer,
    Workout: HangboardTimer,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      title: 'Hangboard Timer',
    },
  }
);

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <View style={{ flex: 1 }}>
          <RootStack />
          <SoundPlayer />
        </View>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: 100,
  },
});
