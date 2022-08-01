import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from './Loading';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loading: false,
    };
  }

  handleClick = () => {
    const { history, userName } = this.props;
    const obj = { name: userName };
    this.setState({ loading: true }, async () => {
      await createUser(obj);
      this.setState({ loading: false });
      history.push('/search');
    });
  }

  render() {
    const { buttonDisabled, handleChange } = this.props;
    const { loading } = this.state;
    return (
      <div data-testid="page-login">
        Login
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="login-name-input"
              name="userName"
              type="text"
              onChange={ handleChange }
            />
          </label>
          <button
            data-testid="login-submit-button"
            name="button"
            type="button"
            id="save"
            disabled={ buttonDisabled }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
          { loading ? <Loading /> : <> </> }
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  buttonDisabled: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  history: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
};
export default Login;
