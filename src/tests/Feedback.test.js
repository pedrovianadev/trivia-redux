import React from "react";
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
// import Feedback from '../pages/Feedback.jsx';
import App from '../App';

const INITAL_SIMULATION = {
  player: {
      name: "Alguem",
      assertions: 0,
      score: 0,
      email: "alguem@algum.com",
      imgURL: "https://www.gravatar.com/avatar/be343b5e35028635a6cd02ee72655332",
      token: "0b03b51ebc8a17ff01e33b0f60bea081d328ec13ae8caaba9fb2b6e660b09ddd",
  },
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
      current_question: 0
    },
}

const INITAL_STORE = {
  player: {
      name: "Player",
      email: "player@trybe.com",
      token: "0b03b51ebc8a17ff01e33b0f60bea081d328ec13ae8caaba9fb2b6e660b09ddd",
  },
}

describe('Verifica a tela de feedback', () => {
    it('se tem os botões na tela, e tem 0 como score, mostrando "could be better"', () => {
        renderWithRouterAndRedux(<App />, INITAL_SIMULATION , '/feedback')

        const nameEL = screen.getByTestId('header-player-name');
        const imgEL = screen.getByTestId('header-profile-picture');
        const scoreEL = screen.getByTestId('header-score');
        const feedbackEl = screen.getByTestId('feedback-text');

        expect(nameEL).toBeInTheDocument();
        expect(imgEL).toBeInTheDocument();
        expect(scoreEL).toBeInTheDocument();
        expect(feedbackEl).toHaveTextContent('Could be better...');

    })
    it('se tem um score maior que 3, verifica o texto Well Done!', () => {
        renderWithRouterAndRedux(<App />, INITAL_STORE , '/feedback')

        const nameEL = screen.getByTestId('header-player-name');
        const imgEL = screen.getByTestId('header-profile-picture');
        const scoreEL = screen.getByTestId('header-score');
        const feedbackEl = screen.getByTestId('feedback-text');

        expect(nameEL).toBeInTheDocument();
        expect(imgEL).toBeInTheDocument();
        expect(scoreEL).toBeInTheDocument();
        expect(feedbackEl).toHaveTextContent('Well Done!');

    })
    it('se ao clicar no botão "Play" redireciona para a tela de Login', () => {
        const { history } = renderWithRouterAndRedux(<App />, INITAL_SIMULATION , '/feedback')

        const btnEl = screen.getByTestId('btn-play-again');
        userEvent.click(btnEl);

        expect(history.location.pathname).toBe('/');
    })

    it('se ao clicar no botão "Ranking" redireciona para a tela Ranking', () => {
        const { history } = renderWithRouterAndRedux(<App />, INITAL_SIMULATION , '/feedback')

        const btnEl = screen.getByTestId('btn-ranking');

        userEvent.click(btnEl);
        expect(history.location.pathname).toBe('/ranking');
    });
})