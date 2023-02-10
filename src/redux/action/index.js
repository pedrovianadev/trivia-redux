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

export function thunkQuestions(newToken) {
  return async (dispatch) => {
    try {
      const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${newToken}`);
      const data = await response.json();
      dispatch(questions(data.results));
      console.log(data.results);
    } catch (error) {
      dispatch(apiError(error));
    }
  };
}
