import React from 'react';
import PropTypes from 'prop-types';

class Answers extends React.Component {
  render() {
    const { answers } = this.props;
    return (
      <div data-testid="answer-options">
        {
          answers && answers
            .map((answer) => (
              <button
                data-testid={ answer.dataTest }
                key={ answer.answers }
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
};

export default Answers;
