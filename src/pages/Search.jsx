import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      input: '',
      artist: '',
      loading: false,
      albums: [],
    };
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    const { input } = this.state;

    this.setState({
      input: '',
      artist: input,
      loading: true,
    });

    const resultAlbums = await searchAlbumsAPI(input);

    this.setState({
      loading: false,
      albums: resultAlbums,
    });
  };

    handleChange = ({ target }) => {
      const value = target.type === 'ckeckbox' ? target.checked : target.value;
      this.setState({ input: value });
    }

    render() {
      const number = 2;
      const { input, artist, albums, loading } = this.state;

      return (
        <div data-testid="page-search">
          <Header />
          <form onSubmit={ this.handleSubmit }>
            <label htmlFor="artist">
              Artist
              <input
                data-testid="search-artist-input"
                name="artist"
                type="text"
                value={ input }
                onChange={ this.handleChange }
              />
            </label>
            <button
              data-testid="search-artist-button"
              name="buttonSearch"
              type="submit"
              disabled={ input.length < number }
            >
              Pesquisar
            </button>
          </form>
          <div>
            <h3>
              Resultado de álbuns de:
              {' '}
              { artist }
            </h3>
            <ul>
              {albums.map(({ collectionId, collectionName }) => (
                <Link
                  to={ `/album/${collectionId}` }
                  key={ collectionId }
                  data-testid={ `link-to-album-${collectionId}` }
                >
                  { collectionName }
                </Link>
              ))}
            </ul>
          </div>

          { loading && <Loading /> }
          {(albums.length) === 0 && <p>Nenhum álbum foi encontrado</p>}
        </div>
      );
    }
}

export default Search;
