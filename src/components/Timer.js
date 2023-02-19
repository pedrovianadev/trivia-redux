import React from 'react';
import PropTypes from 'prop-types';

class Timer extends React.Component {
  render() {
    const { handleTimer } = this.props;
    return (
      <div>
        <p>Timer</p>
        <p>{ handleTimer }</p>
      </div>
    );
  }
}

Timer.propTypes = {
  handleTimer: PropTypes.number.isRequired,
};

export default Timer;
