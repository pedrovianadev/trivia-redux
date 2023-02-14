import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../style/answers.css';
import { runTime } from '../redux/action';

class Answers extends React.Component {
  state = {
    answered: false,
    isDisabled: false,
  };

  testResponse = () => {
    const { dispatch } = this.props;
    this.setState({
      answered: true,
      isDisabled: true,
    });
    dispatch(runTime());
  };

  render() {
    const { answers, timer } = this.props;
    const { answered, isDisabled } = this.state;
    if (timer === 0) {
      this.setState({
        isDisabled: true,
      });
    }

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
  dispatch: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  timer: state.time.timer,
});

export default connect(mapStateToProps)(Answers);
