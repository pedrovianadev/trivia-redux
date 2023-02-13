import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const mockFetch = () => {
  jest.spyOn(global, 'fetch')
    .mockImplementation(() => Promise.resolve({
     json: () => Promise.resolve(),
    }));
};

describe ('Login', () => {

    beforeEach(mockFetch);
    afterEach(() => jest.clearAllMocks());

    it('se tem um botão de input nome e é possível escrever nele', () => {
        renderWithRouterAndRedux(<App />);
        const USER_NAME = 'User Test';

        const nomeInput = screen.getByLabelText(/^Nome:$/i);
        expect(nomeInput).toBeInTheDocument();
        userEvent.type(nomeInput, USER_NAME)
        expect(nomeInput.value).toBe(USER_NAME)
    });

    it('se tem um botão de input email e é possível escrever nele', () => {
        renderWithRouterAndRedux(<App />);
        const USER_EMAIL = 'user@example.com';
        
        const emailEL = screen.getByLabelText(/^Email:$/i);
        expect(emailEL).toBeInTheDocument();
        userEvent.type(emailEL, USER_EMAIL)
        expect(emailEL.value).toBe(USER_EMAIL)
    })

    it('Testa se a tela de login possui o botão de Play e está desativado:', () => {
        renderWithRouterAndRedux(<App />);
        const playBtn = screen.getByRole('button', {
            name: /play/i
          });

        expect(playBtn).toBeInTheDocument();
        expect(playBtn).toBeDisabled();
    });

    it('Testa se o botão play é ativado ao preencher os inputs', () => {
        renderWithRouterAndRedux(<App />);
        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email'); 
        const playBtn = screen.getByRole('button', {
          name: /play/i
        });
  
        userEvent.type(email, 'test@test.com');
        expect(playBtn).toBeDisabled();
  
        userEvent.type(name, 'Test');
        userEvent.clear(email);
        expect(playBtn).toBeDisabled();
  
        userEvent.type(email, 'test@test.com')
        expect(playBtn).toBeEnabled();
      })

    test('Testa se o botão play redireciona para a página "/game" e chama a função fetch', () => {
        const mockToken = {
            token: 'ab98a9va8e9a8f9ae'
        }
        jest.spyOn(global, 'fetch')
        global.fetch.mockResolvedValue({
              json: jest.fn().mockResolvedValue(mockToken)
        })
        const { history } = renderWithRouterAndRedux(<App />);
        const name = screen.getByTestId('input-player-name');
        const email = screen.getByTestId('input-gravatar-email'); 
        const playBtn = screen.getByRole('button', {
          name: /play/i
        });
  
        userEvent.type(name, 'Test');
        userEvent.type(email, 'test@test.com');
        userEvent.click(playBtn);
        expect(global.fetch).toHaveBeenCalled();
        waitFor(() => {
          expect(history.location.pathname).toBe('/game');
        });
      })

    it('Se é redirecionado para "Settings"', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const btnConf = screen.getByRole('button', { name: /Settings/i});
        userEvent.click(btnConf);
       expect(history.location.pathname).toBe('/settings');
    })
});