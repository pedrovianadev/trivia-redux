import React from 'react';
import PropTypes from 'prop-types';
import '../style/answers.css';

class Answers extends React.Component {
  render() {
    const { answers, answered, testResponse, isDisabled, timer } = this.props;
    return (
      <div data-testid="answer-options">
        {
          answers && answers
            .map((answer) => (
              <button
                data-testid={ answer.dataTest }
                key={ answer.answers }
                className={ (answered || timer === 0) ? answer.style : '' }
                onClick={ () => testResponse(answer.dataTest) }
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
