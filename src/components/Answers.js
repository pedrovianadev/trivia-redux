import React from 'react';
import PropTypes from 'prop-types';
import '../style/answers.css';

class Answers extends React.Component {
  render() {
    const { answers, answered, testResponse } = this.props;
    return (
      <div data-testid="answer-options">
        {
          answers && answers
            .map((answer) => (
              <button
                data-testid={ answer.dataTest }
                key={ answer.answers }
                className={ answered ? answer.style : '' }
                onClick={ () => testResponse() }
              >
                {answer.answers}
              </button>))
        }
      </div>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.objectOf.isRequired,
  answered: PropTypes.bool.isRequired,
  testResponse: PropTypes.func.isRequired,
};

export default Answers;
