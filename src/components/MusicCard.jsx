import React from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      favorites: false,
      favoritesList: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  handleChange = async ({ target }) => {
    this.setState(() => ({
      favorites: target.checked,

    }), this.favoriteSong);
  };

  getFavorites = async () => {
    this.setState({ isLoading: true });
    const list = await getFavoriteSongs();
    this.setState(
      () => ({ favoritesList: list }),
      () => {
        const { favoritesList } = this.state;
        const { trackId } = this.props;
        const beFavorite = favoritesList.some((music) => (music.trackId === trackId));
        if (beFavorite) {
          this.setState({ favorites: true,
          });
        }
        this.setState({ isLoading: false });
      },
    );
  };

  favoriteSong = async () => {
    const { favorites } = this.state;
    const { music, listRemoveSong } = this.props;
    if (favorites) {
      this.setState({ isLoading: true });
      await addSong(music);
      // console.log('adiciona');
      this.setState({ isLoading: false });
    } else {
      this.setState({ isLoading: true });
      // console.log('true - isLoading');
      await removeSong(music);
      listRemoveSong();
      // console.log('Remove');
      this.setState({ isLoading: false });
    }
    this.getFavorites();
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { favorites, isLoading } = this.state;
    if (isLoading) return <Loading />;

    return (
      <div>
        <h4>{trackName}</h4>
        <audio
          data-testid="audio-component"
          src={ previewUrl }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          <code>audio</code>
          .
        </audio>

        <label data-testid={ `checkbox-music-${trackId}` } htmlFor={ trackId }>
          Favorita
          <input
            type="checkbox"
            name="favorites"
            id={ trackId }
            onChange={ this.handleChange }
            checked={ favorites }
          />
        </label>

      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.shape({
    previewUrl: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    trackId: PropTypes.number.isRequired,
  }).isRequired,
  listRemoveSong: PropTypes.func.isRequired,

};
export default MusicCard;
