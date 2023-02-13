import React from "react";
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

const INITAL_STORE = {
  player: {
      name: "Player",
      email: "player@trybe.com",
      token: "0b03b51ebc8a17ff01e33b0f60bea081d328ec13ae8caaba9fb2b6e660b09ddd",
  },
}

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

    it('se o botão Play aparece na página', async () => {
       const { history } = renderWithRouterAndRedux(<App />, INITAL_STORE);
       const USER_EMAIL = 'user@example.com';
       const USER_NAME = 'User Test';
        
        const emailEL = screen.getByLabelText(/^Email:$/i);
        expect(emailEL).toBeInTheDocument();
        userEvent.type(emailEL, USER_EMAIL)


        const nomeEL = screen.getByLabelText(/^Nome:$/i);
        expect(nomeEL).toBeInTheDocument();
        userEvent.type(nomeEL, USER_NAME)
        
        const btnPlayEL = screen.getByRole('button', { name: /Play/i});
        expect(btnPlayEL).toBeInTheDocument();
        userEvent.click(btnPlayEL);
        await waitFor(() => {
        expect(history.location.pathname).toBe('/game');
        });
    });

    it('Se é redirecionado para "Settings"', () => {
        const { history } = renderWithRouterAndRedux(<App />);

        const btnConf = screen.getByRole('button', { name: /Settings/i});
        userEvent.click(btnConf);
       expect(history.location.pathname).toBe('/settings');
    })
});