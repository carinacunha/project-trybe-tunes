import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();

    this.state = {
      loading: false,
    };
  }

  render() {
    const { trackName, previewUrl, trackId, getFavorites, favorite } = this.props;
    const { loading } = this.state;
    console.log(getFavorites);
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
            name={ trackId }
            type="checkbox"
            checked={ favorite }
            onChange={ getFavorites }
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
  getFavorites: PropTypes.func.isRequired,
  favorite: PropTypes.bool.isRequired,
};
export default MusicCard;
