import React, { Component } from 'react';

class Login extends Component {
  render() {
    return (
      <div data-testid="page-login">
        Login
        <form>
          <label htmlFor="name">
            Nome
            <input
              data-testid="login-name-input"
              name="name-input"
              type="text"
              id="name"
              value={ cardName }
              onChange={ onInputChange }
            />
          </label>
          <button data-testid="login-submit-button" type="button">Entrar</button>
        </form>
      </div>
    );
  }
}

export default Login;
