import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/answers.css';

class Answers extends React.Component {
  render() {
    const { answers, answered, testResponse, isDisabled } = this.props;
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
  answers: PropTypes.objectOf.isRequired,
  answered: PropTypes.bool.isRequired,
  testResponse: PropTypes.func.isRequired,
  isDisabled: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.time.timer,
});

export default connect(mapStateToProps)(Answers);
