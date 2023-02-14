import { TIME, RUN_TIME, RESET_BUTTON } from '../action';

const INITIAL_STATE = {
  timer: 30,
  isDlisable: false,
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
  case RESET_BUTTON:
    return {
      ...state,
      isDlisable: false,
    };
  default:
    return state;
  }
};

export default time;
