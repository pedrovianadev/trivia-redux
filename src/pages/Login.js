import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginOk } from '../redux/action';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      name: '',
      email: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange({ target }) {
    this.setState({ [target.name]: target.value });
  }

  handleSubmit() {
    const { submitLoginAction, history } = this.props;
    submitLoginAction(this.state);
    history.push('/jogo');
  }

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
          onClick={ this.handleSubmit }
        >
          Play
        </button>
        <button
          type="submit"
          data-testid="btn-settings"
          disabled={ !validateEmail(email) || !validateName(name) }
          onClick={ this.handleSubmitSet }
        >
          Settings
        </button>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  submitLoginAction: (user) => dispatch(loginOk(user)),
});

Login.propTypes = {
  submitLoginAction: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(null, mapDispatchToProps)(Login);
