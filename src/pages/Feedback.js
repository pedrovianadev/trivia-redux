import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Feedback extends React.Component {
  constructor() {
    super();
    this.state = {
      message: '',
    };
    this.scoreFeedback = this.scoreFeedback.bind(this);
  }

  componentDidMount() {
    this.scoreFeedback();
  }

  scoreFeedback = () => {
    const { player: {
      assertions,
    } } = this.props;

    const scoreCouldBeBetter = 3;
    if (assertions < scoreCouldBeBetter) {
      this.setState({ message: 'Could be better...' });
    } else {
      this.setState({ message: 'Well Done!' });
    }
  };

  render() {
    const { player: {
      assertions,
      score,
      gravatarEmail,
    },
    history, name } = this.props;

    const { message } = this.state;

    const avatar = md5(gravatarEmail).toString();

    return (
      <div>
        <p data-testid="header-score">{ score }</p>
        <img
          data-testid="header-profile-picture"
          alt="imagem de perfil"
          src={ `https://www.gravatar.com/avatar/${avatar}` }
        />
        <h2 data-testid="header-player-name">{ name }</h2>
        <h2
          data-testid="feedback-text"
        >
          { message }
        </h2>
        <h2 data-testid="feedback-total-question">
          { assertions }
        </h2>
        <h2 data-testid="feedback-total-score">
          { score }
        </h2>
        <button
          data-testid="btn-play-again"
          onClick={ () => history.push('/') }
        >
          Play Again
        </button>
        <button
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  player: PropTypes.shape({
    assertions: PropTypes.number,
    score: PropTypes.number,
    gravatarEmail: PropTypes.string,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  name: PropTypes.string.isRequired,
};

const mapStateToProps = (globalState) => ({
  player: globalState.player,
  name: globalState.user.name,
});

export default connect(mapStateToProps)(Feedback);
