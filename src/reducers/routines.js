import { ROUTINE_ADD, ROUTINE_DELETE } from '../actions';

const routines = (state = [], action) => {
  switch(action.type) {
    case ROUTINE_ADD:
      return {
        [...state, action.id],
      };
    case ROUTINE_DELETE:
      return {

      };
    default:
      return state;
  }
};
