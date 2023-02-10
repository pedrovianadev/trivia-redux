import { LOGIN, SEARCH_SUCCESS, API_ERROR, QUESTIONS } from '../action';

const INITIAL_STATE = {
  name: '',
  email: '',
  questions: [],
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.user.name,
      email: action.user.email,
    };
  case API_ERROR:
    return {
      ...state,
      error: action.error,
    };
  case SEARCH_SUCCESS:
    return {
      ...state,
      token: action.payload,
    };
  case QUESTIONS:
    return {
      ...state,
      questions: action.payload,
    };
  default:
    return state;
  }
}

export default user;
