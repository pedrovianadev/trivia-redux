import React from 'react';
import md5 from 'crypto-js';
import { useHistory } from 'react-router-dom';

function Feedback() {
  const history = useHistory();
  const avatar = md5(email).toString();

  return (
    <div data-testid="feedback-text">
      <img
        alt="imagem de perfil"
        src={ `https://www.gravatar.com/avatar/${avatar}` }
        data-testid="header-profile-picture"
      />
      <p data-testid="header-player-name">
        {user.name}
      </p>
      <p data-testid="header-score">
        {user.score}
      </p>
      <h1 data-testid="feedback-total-score">
        {user.score}
      </h1>

      {/* Abaixo eu preciso que seja feito a contabilidade de quantas o usuário acertou para que funcione, por isso está comentada */}
      {/* <h2 data-testid="feedback-total-question">
        {user.corrects}
      </h2> */}
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
