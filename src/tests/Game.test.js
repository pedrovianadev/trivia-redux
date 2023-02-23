import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const INITIAL_STATE = {
  player: {
    name: '',
    assertions: 0,
    score: 0,
    gravatarEmail: '',
  }
};


const INITAL_SIMULATION = {
  trivia: {
    questions: [
      {
        category: 'Entertainment: Video Games',
        type: 'multiple',
        difficulty: 'hard',
        question: 'In the original &quot;Super Mario Bros.&quot;, what is the acceleration of Mario if he was in free fall?',
        correct_answer: '91.28 m/s^2',
        incorrect_answers: [
          '110  m/s^2',
          '9.42  m/s^2',
          '4.4  m/s^2'
        ]
      },
      {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What is the code name for the mobile operating system Android 7.0?',
        correct_answer: 'Nougat',
        incorrect_answers: [
          'Ice Cream Sandwich',
          'Jelly Bean',
          'Marshmallow'
        ]
      },
      {
        category: 'Science: Computers',
        type: 'multiple',
        difficulty: 'medium',
        question: 'In HTML, which non-standard tag used to be be used to make elements scroll across the viewport?',
        correct_answer: '&lt;marquee&gt;&lt;/marquee&gt;',
        incorrect_answers: [
          '&lt;scroll&gt;&lt;/scroll&gt;',
          '&lt;move&gt;&lt;/move&gt;',
          '&lt;slide&gt;&lt;/slide&gt;'
        ]
      },
      {
        category: 'Entertainment: Cartoon & Animations',
        type: 'multiple',
        difficulty: 'easy',
        question: 'In the show &quot;Steven Universe&quot;, who are the main two employees of The Big Donut?',
        correct_answer: 'Sadie and Lars',
        incorrect_answers: [
          'Steven and James',
          'Erik and Julie',
          'Bob and May'
        ]
      },
      {
        category: 'Science & Nature',
        type: 'multiple',
        difficulty: 'easy',
        question: 'What animal takes part in Schr&ouml;dinger&#039;s most famous thought experiment?',
        correct_answer: 'Cat',
        incorrect_answers: [
          'Dog',
          'Bat',
          'Butterfly'
        ]
      }
    ],
    current_question: 0,
  }
}

describe('Verifica a page de Game', () => {
  it('testa se renderiza na tela o header', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');

    const gravatar = screen.getByTestId('header-profile-picture');
    const name = screen.getByTestId('header-player-name');
    const points = screen.getByTestId('header-score');

    expect(gravatar).toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(points).toBeInTheDocument();
  });
  it('testa se renderiza na tela a categoria, a pergunta e as alternativas são renderizadas na tela', () => {
    renderWithRouterAndRedux(<App />, INITIAL_STATE, '/game');
    const category = screen.getByTestId('question-category');
    const question = screen.getByTestId('question-text');
    const answers = screen.getByTestId('correct-answer');
    expect(category).toBeInTheDocument();
    expect(question).toBeInTheDocument();
    expect(answers).toBeInTheDocument();
  
  });
});