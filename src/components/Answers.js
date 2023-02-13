import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Answers extends React.Component {
  render() {
    const { answers } = this.props;
    return (
      <div data-testid="answer-options">
        {
          answers && answers
            .map((answer, index) => <button key={ index }>{answer}</button>)
        }
      </div>
    );
  }
}

Answers.propTypes = {
  answers: PropTypes.shape([]).isRequired,
};

const mapStateToProps = (state) => ({
});

export default connect(mapStateToProps)(Answers);
