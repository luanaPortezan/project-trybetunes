import React, { Component } from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import Loading from '../components/Loading';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      listFavorites: [],
    };
  }

  componentDidMount() {
    this.getFavorites();
  }

  getFavorites = async () => {
    this.setState({ isLoading: true });
    const list = await getFavoriteSongs();
    this.setState(() => ({
      listFavorites: list,
    }), () => {
      this.setState({ isLoading: false });
    });
  };

  removeSongList = () => {
    // console.log('removeu!!');
    this.getFavorites();
  };

  render() {
    const { isLoading, listFavorites } = this.state;
    if (isLoading) return <Loading />;

    return (
      <div data-testid="page-favorites">
        <Header />
        Meus Favoritos
        <div>
          { listFavorites.map((element) => (<MusicCard
            music={ element }
            key={ element.trackId }
            trackName={ element.trackName }
            previewUrl={ element.previewUrl }
            trackId={ element.trackId }
            removeSongList={ this.removeSongList }
          />))}
        </div>
      </div>
    );
  }
}

export default Favorites;
