import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends React.Component {
  constructor() {
    super();

    this.state = {
      ranking: [],
    };
    this.ranking = this.ranking.bind(this);
  }

  componentDidMount() {
    this.ranking();
  }

  ranking() {
    const ranking = JSON.parse(localStorage.getItem('ranking'))
      .sort((a, b) => b.score - a.score);
    this.setState({
      ranking,
    });
  }

  render() {
    const { history } = this.props;
    const { ranking } = this.state;
    console.log(ranking);

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking</h1>
        {
          ranking.map((rank, index) => (
            <div key={ index }>
              <img src={ rank.gravatar } alt={ rank.name } />
              <p data-testid={ `player-name-${index}` }>{rank.name}</p>
              <p data-testid={ `player-score-${index}` }>{rank.score}</p>
            </div>
          ))
        }
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
