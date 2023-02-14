import { TIME, RUN_TIME } from '../action';

const INITIAL_STATE = {
  timer: 30,
  running: false,
};

const time = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIME:
    return {
      ...state,
      timer: state.timer - 1,
    };
  case RUN_TIME:
    return {
      ...state,
      timer: 30,
    };
  default:
    return state;
  }
};

export default time;
