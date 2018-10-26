const uuidv4  = require('uuid/v4');
import { ROUTINE_ADD } from '../actions';

const initialState = {
  routineById: {

  },
};

const routine = (state = initialState, action) => {
  switch(action.type) {
    case ROUTINE_ADD:
      return {
        ...state,
        routineById: {
          [uuidv4()]: action.payload,
        },
      };
    default:
      return state;
  }
};
