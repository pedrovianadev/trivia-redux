import { LOGIN } from '../action';

const INICIAL_STATE = {

  name: '',
  email: '',

};

function user(state = INICIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      name: action.user.name,
      email: action.user.email,
    };
  default:
    return state;
  }
}

export default user;
