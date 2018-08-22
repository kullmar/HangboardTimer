import { combineReducers } from 'redux';
import timer from './timer';
import training from './training';
import routine from './routine';

export default combineReducers({
  routine,
  timer,
  training,
});
