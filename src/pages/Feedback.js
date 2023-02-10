import React from 'react';
import md5 from 'crypto-js';
import { useHistory } from 'react-router-dom';

function Feedback() {
  const history = useHistory();

  return (
    <div data-testid="feedback-text">
      <img
        alt="imagem de perfil"
        src={ `https://www.gravatar.com/avatar/${md5(email)}` }
        data-testid="header-profile-picture"
      />
      <p data-testid="header-player-name">
        {user.name}
      </p>
      <p data-testid="header-score">
        {user.score}
      </p>
      <button
        type="button"
        data-testid="btn-play-again"
        onClick={ () => history.push('/') }
      >
        Play Again
      </button>
      <button
        type="button"
        data-testid="btn-ranking"
        onClick={ () => history.push('/ranking') }
      >
        Ranking
      </button>
    </div>
  );
}

export default Feedback;
