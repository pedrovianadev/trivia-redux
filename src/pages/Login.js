import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginOk, thunkToken } from '../redux/action';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSubmitSet = this.handleSubmitSet.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit = async () => {
    const { submitLoginAction, history, dispatchToken } = this.props;
    const triviaURL = 'https://opentdb.com/api_token.php?command=request';
    await fetch(triviaURL)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('token', data.token);
      });
    submitLoginAction(this.state);
    await dispatchToken();
    history.push('/game');
  };

  handleSubmitSet() {
    const { submitLoginAction, history } = this.props;
    submitLoginAction(this.state);
    history.push('/settings');
  }

  render() {
    const { email, name } = this.state;

    function validateEmail(emailAdress) {
      const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return regexEmail.test(emailAdress);
    }

    function validateName(playerName) {
      const minName = 1;
      return playerName.length >= minName;
    }
    return (
      <main>
        <label htmlFor="input-name">
          Nome:
          <input
            type="text"
            id="input-name"
            value={ name }
            name="name"
            onChange={ this.handleChange }
            data-testid="input-player-name"
          />
        </label>
        <br />
        <label htmlFor="input-email">
          Email:
          <input
            type="email"
            id="input-email"
            value={ email }
            name="email"
            onChange={ this.handleChange }
            data-testid="input-gravatar-email"
          />
        </label>
        <br />
        <button
          type="submit"
          data-testid="btn-play"
          disabled={ !validateEmail(email) || !validateName(name) }
          onClick={ () => this.handleSubmit() }
        >
          Play
        </button>
        <button
          type="submit"
          data-testid="btn-settings"
          onClick={ () => this.handleSubmitSet() }
        >
          Settings
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLoginAction: (user) => dispatch(loginOk(user)),
  dispatchToken: () => dispatch(thunkToken()),
});

Login.propTypes = {
  submitLoginAction: PropTypes.func.isRequired,
  dispatchToken: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
