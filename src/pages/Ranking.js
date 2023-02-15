import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  render() {
    const { history } = this.props;

    return (
      <div>
        <h1>Ranking</h1>
        <button
          data-testid="btn-go-home"
          onClick={ () => history.push('/') }
        >
          Go Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

const mapStateToProps = (globalState) => ({
  player: globalState.player,
  name: globalState.user.name,
});

export default connect(mapStateToProps)(Ranking);
