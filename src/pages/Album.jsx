import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs, addSong } from '../services/favoriteSongsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      listMusics: [],
      loading: true,
      isFavorite: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const favorites = await getFavoriteSongs();

    this.setState({
      listMusics: response,
      loading: false,
      isFavorite: favorites,
    });
  }

  getFavorites = async (event) => {
    const { name } = event.target;
    const { listMusics } = this.state;
    const music = listMusics.filter((element) => element.trackId === parseInt(name, 10));

    this.setState({
      loading: true,
    });

    const { trackName, previewUrl, trackId } = music[0];
    await addSong({ trackName, previewUrl, trackId });
    const favorites = await getFavoriteSongs();
    this.setState({
      loading: false,
      isFavorite: favorites,
    });
  }

  render() {
    const { listMusics, loading, isFavorite } = this.state;
    const { artistName, collectionName } = listMusics[0] || [];
    return (
      <section>
        <div data-testid="page-album">
          <Header />
          <p data-testid="artist-name">
            { artistName }
          </p>
          <p data-testid="album-name">
            { collectionName }
          </p>
        </div>
        { loading && <Loading /> }
        <ul>
          { listMusics.filter(({ kind }) => kind === 'song')
            .map((song) => (<MusicCard
              key={ song.trackName }
              getFavorites={ this.getFavorites }
              favorite={ isFavorite.some((e) => e.trackId === song.trackId) }
              { ...song }
            />))}
        </ul>

      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default Album;
