import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      album: '',
      musicsAlbum: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    // console.log('Montado');
    this.getMusic();
  }

  getMusic = async () => {
    const { match } = this.props;
    const { id } = match.params;
    const album = await getMusics(id);
    this.setState(
      () => ({
        album,
      }),
      this.startAlbumMusic,
    );
  };

  startAlbumMusic = () => {
    const { album } = this.state;
    const musicsAlbum = [...album];
    musicsAlbum.shift();
    this.setState({ isLoading: false, musicsAlbum });
  };

  listRemoveSong = () => {
  };

  render() {
    const { album, isLoading, musicsAlbum } = this.state;
    if (isLoading) return <Loading />;
    const { collectionName, artistName, artworkUrl100 } = album[0];
    return (
      <div data-testid="page-album">
        <Header />
        <div>
          <h4 data-testid="album-name">
            Discografia:
            {' '}
            {collectionName}
          </h4>

          <img src={ artworkUrl100 } alt={ collectionName } />

          <h6 data-testid="artist-name">
            Artista:
            {artistName}
          </h6>
        </div>

        {musicsAlbum.map((music) => (
          <MusicCard
            music={ music }
            key={ music.trackId }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            listRemoveSong={ this.listRemoveSong }
          />
        ))}
      </div>
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
