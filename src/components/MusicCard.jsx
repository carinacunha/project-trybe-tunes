import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  getFavorites = async () => {
    const { trackName, previewUrl, trackId } = this.props;
    this.setState({
      loading: true,
    });
    await addSong({ trackName, previewUrl, trackId });

    this.setState({
      loading: false,
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading } = this.state;
    return (
      <section>
        <h4>
          { trackName }
        </h4>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        { loading && <Loading /> }
        <label htmlFor="favorites">
          Favorita
          <input
            data-testid={ `checkbox-music-${trackId}` }
            name="favorites"
            type="checkbox"
            onChange={ this.getFavorites }
          />
        </label>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
};
export default MusicCard;
