import React from 'react';
import PropTypes from 'prop-types';
import '../style/answers.css';

class Answers extends React.Component {
  componentDidMount() {
    console.log('aaa');
  }

  render() {
    const { answers, answered, testResponse, isDisabled, timer } = this.props;
    const result = answers().sort((a, b) => (a < b ? -1 : 1));
    return (
      <div data-testid="answer-options">
        {
          result && result
            .map((answer) => (
              <button
                data-testid={ answer.dataTest }
                key={ answer.answers }
                className={ (answered || timer === 0) ? answer.style : '' }
                onClick={ () => testResponse() }
                disabled={ isDisabled }
              >
                {answer.answers}
              </button>))
        }
      </div>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.shape([]).isRequired,
  answered: PropTypes.bool.isRequired,
  testResponse: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  timer: PropTypes.number.isRequired,
};

export default Answers;
