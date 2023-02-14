import React from 'react';
import PropTypes from 'prop-types';
import '../style/answers.css';

class Answers extends React.Component {
  state = {
    answered: false,
  };

  testResponse = () => {
    this.setState({
      answered: true,
    });
  };

  render() {
    const { answers } = this.props;
    const { answered } = this.state;
    return (
      <div data-testid="answer-options">
        {
          answers && answers
            .map((answer) => (
              <button
                data-testid={ answer.dataTest }
                key={ answer.answers }
                className={ answered ? answer.style : '' }
                onClick={ () => this.testResponse() }
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
