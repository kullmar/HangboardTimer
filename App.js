import React from 'react';
import { compose, createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/reducers';
import HangboardTimer from './src/containers/HangboardTimer';
import HangboardTimerLocal from './src/containers/HangboardTimerLocal';
import RoutineContainer from './src/containers/RoutineContainer';
import StorybookUI from './storybook';

export default StorybookUI;
//
// const middlewares = [];
//
// if (process.env.NODE_ENV === `development`) {
//   const { logger } = require(`redux-logger`);
//
//   middlewares.push(logger);
// }
//
// const store = compose(applyMiddleware(...middlewares))(createStore)(rootReducer);
//
// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store={store}>
//         {/* <RoutineContainer /> */}
//         <HangboardTimerLocal />
//       </Provider>
//     );
//   }
// }
