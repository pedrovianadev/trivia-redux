import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../components/Header';
import { thunkToken, thunkQuestions } from '../redux/action';

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answered: false,
    };
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const { dispatch, token } = this.props;
    dispatch(thunkQuestions(token));
  }

  handleClick() {
    const { dispatch } = this.props;
    thunkToken();
    dispatch(thunkToken());
  }

  render() {
    const { answered } = this.state;
    return (
      <div>
        <Header />
        <p data-testid="question-category"> </p>
        <p data-testid="question-text">
          {/* { question } */}
        </p>
        <div data-testid="answer-options">
          {/* { answer.map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid={ answer.correct ? 'correct-answer' : `wrong-answer-${index}` }
              onClick={ this.handleClick }
              style={
                answered ? { border: answer.correct ? '3px solid rgb(6,240,15)' : '3px solid red'}
                : { border: '3px solid black' }
              }
            >
              { answer.correct ? { answer.correct_answer } : {incorrect_answers.find((incorrect, index) => index === answer.index)}}
            </button>
          ))} */}
        </div>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Buscar

        </button>
      </div>

    );
  }
}

const mapStateToProps = (state) => ({
  token: state.user.token,
});

Game.propTypes = {
  dispatch: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Game);
