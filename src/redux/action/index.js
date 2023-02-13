export const LOGIN = 'LOGIN';
export const loginOk = (user) => ({ type: LOGIN, user });

export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const searchSuccess = (data) => (
  { type: 'SEARCH_SUCCESS',
    payload: data,
  }
);

export const QUESTIONS = 'QUESTIONS';
export const questions = (data) => (
  { type: 'QUESTIONS',
    payload: data,
  }
);

export const API_ERROR = 'API_ERROR';
export const apiError = (error) => ({
  type: API_ERROR, error,
});

export const TOKEN_INVALID = 'TOKEN_INVALID';
export const tokenInvalid = () => ({
  type: TOKEN_INVALID,
});

export const TOKEN_VALID = 'TOKEN_VALID';
export const tokenValid = () => ({
  type: TOKEN_VALID,
});

export const TIME = 'TIME';
export const time = () => ({
  type: TIME,
});

export const RUN_TIME = 'RUN_TIME';
export const runTime = (value) => ({
  type: RUN_TIME,
  value,
});

export function thunkToken() {
  return async (dispatch) => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      dispatch(searchSuccess(data.token));
      localStorage.setItem('token', data.token);
    } catch (error) {
      dispatch(apiError(error));
    }
  };
}

export function thunkQuestions(newToken) {
  const numberMax = 64;
  return async (dispatch) => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${newToken}`);
      if (newToken.length < numberMax) {
        return dispatch(tokenInvalid());
      }
      const data = await response.json();
      const token = localStorage.getItem('token');
      if (!token) {
        throw Error();
      }

      dispatch(questions(data.results));
    } catch (error) {
      dispatch(tokenInvalid());
    }
  };
}
