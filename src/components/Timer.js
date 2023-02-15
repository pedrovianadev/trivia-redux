import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Timer extends React.Component {
/*   constructor(props) {
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
 */
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

const mapStateToProps = (state) => ({
  timer: state.time.timer,
});

export default connect(mapStateToProps)(Timer);
