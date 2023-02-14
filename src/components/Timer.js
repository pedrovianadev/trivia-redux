import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { time, runTime } from '../redux/action';

class Timer extends React.Component {
  constructor(props) {
    super(props);

    this.handleTimer = this.handleTimer.bind(this);
  }

  handleTimer() {
    const { timer, dispatch } = this.props;
    const magicNumber = 1000;
    setTimeout(() => {
      dispatch(time());
    }, magicNumber);
    if (timer === 0) {
      dispatch(runTime());
    }
    return timer;
  }

  render() {
    return (
      <div>
        <p>Timer</p>
        <p>{ this.handleTimer() }</p>
      </div>
    );
  }
}

Timer.propTypes = {

  timer: PropTypes.number.isRequired,
  dispatch: PropTypes.func.isRequired,

};

const mapStateToProps = (state) => ({
  timer: state.time.timer,
});

export default connect(mapStateToProps)(Timer);
