import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();

    this.state = {
      buttonDisabled: true,
    };
  }

    handleChange = ({ target }) => {
      const { value } = target;
      const number = 2;
      const isDisable = value.length < number;
      this.setState({
        buttonDisabled: isDisable,
      });
    }

    render() {
      const { buttonDisabled } = this.state;
      return (
        <div data-testid="page-search">
          <Header />
          <label htmlFor="artist">
            Artist
            <input
              data-testid="search-artist-input"
              name="artist"
              type="text"
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="search-artist-button"
            name="buttonSearch"
            type="button"
            disabled={ buttonDisabled }
          >
            Pesquisar
          </button>
        </div>
      );
    }
}

export default Search;
