import { TIME, RUN_TIME } from '../action';

const INITIAL_STATE = {
  time: 30,
  runTime: true,
};

const time = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TIME:
    return {
      ...state,
      time: state.time - 1,
    };
  case RUN_TIME:
    if (action.value) {
      return {
        ...state,
        runTime: action.value,
        time: 30,
      };
    }
    break;
  default:
    return state;
  }
};

export default time;
