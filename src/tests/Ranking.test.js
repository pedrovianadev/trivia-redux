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
  
  const player = [
    {
        score: 144,
        gravatar:"https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
        name: 'teste1',
    },
    {
        score: 70,
        gravatar:"https://www.gravatar.com/avatar/d41d8cd98f00b204e9800998ecf8427e",
        name: 'teste2',
    },
];

describe('Verifica a page de Ranking', () => {
    it('testa se renderiza na tela o título "Ranking"', () => {
        localStorage.setItem('ranking', JSON.stringify(player))
        renderWithRouterAndRedux(<App />,INITIAL_STATE, '/Ranking');
        const title = screen.getByTestId('ranking-title');
        expect(title).toBeInTheDocument();
    });
    it('testa se renderiza na tela o ranking dos jogadores', () => {
        localStorage.setItem('ranking', JSON.stringify(player))
        renderWithRouterAndRedux(<App />,INITIAL_STATE, '/Ranking');
        const player1 = screen.getByText('teste1');
        expect(player1).toBeInTheDocument();

        const player2 = screen.getByText('teste2');
        expect(player2).toBeInTheDocument();
    });
    it('testa se renderiza na tela o botão "Go Home" e ele redireciona para a page Home', () => {
        localStorage.setItem('ranking', JSON.stringify(player))
        const { history } = renderWithRouterAndRedux(<App />,INITIAL_STATE, '/Ranking');
        const buttonHome = screen.getByTestId('btn-go-home');
        expect(buttonHome).toBeInTheDocument();

        userEvent.click(buttonHome);
        const { pathname } = history.location;
        expect(pathname).toBe('/');
    });
});
