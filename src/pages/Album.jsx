import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';

class Album extends Component {
  constructor() {
    super();

    this.state = {
      listMusics: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    // console.log(response);

    this.setState({
      listMusics: response,
      loading: false,
    });
  }

  render() {
    const { listMusics, loading } = this.state;
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
