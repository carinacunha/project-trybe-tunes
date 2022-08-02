import React, { Component } from 'react';
import Header from '../components/Header';
// import MusicCard from '../components/MusicCard';
// import getMusics from '../services/musicsAPI';

class Album extends Component {
  // constructor() {
  //   super();

  //   this.state = {
  //     listMusics: [],
  //   };
  // }

  // async componentDidMount() {
  //   const { match: { params: {id} } = this.props
  //   // const response = await getMusics(id),
  //   }
  // }

  render() {
    return (
      <div data-testid="page-album">
        <Header />
        <p data-testid="artist-name" />
        <p data-testid="album-name" />
      </div>
    );
  }
}

export default Album;
