import { SCORE } from '../action';

const INITIAL_STATE = {
  score: 0,
};

function player(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SCORE:
    return {
      ...state,
      score: state.score + action.payload,
    };
  default:
    return state;
  }
}

export default player;
