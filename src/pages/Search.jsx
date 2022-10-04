import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Loading from '../Loading';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      buttonDisable: true,
      isLoading: true,
      searchList: [],
      foundArtists: true,
    };
  }

  componentDidMount() {
    this.searchArtist();
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    // console.log(value);
    this.setState(() => ({
      [name]: value,
    }), this.validitySearch());
  };

  validitySearch = () => {
    const { search } = this.state;
    const minimumLength = 1;
    if (search.length >= minimumLength) {
      this.setState({ buttonDisable: false });
    } else {
      this.setState({ buttonDisable: true });
    }
  };

  searchArtist = async () => {
    const { search } = this.state;
    const searchList = await searchAlbumsAPI(search);
    this.setState(() => ({ isLoading: false,
      searchList }), () => {
      this.setState({ isLoading: false });
      this.validityResults();
    });
  };

  clickButtonSearch = () => {
    this.searchArtist();
    const { search } = this.state;
    this.setState(() => ({
      historySearch: search,
      search: '',
      isLoading: true,
    }));
  };

  validityResults = () => {
    const { searchList } = this.state;
    if (searchList.length < 1) {
      this.setState({ foundArtists: false });
    } else {
      this.setState({ foundArtists: true });
    }
  };

  mapSearch = () => {
    const { searchList, historySearch } = this.state;
    const list = (
      <div>
        <h2>
          Resultado de álbuns de:
          {' '}
          {historySearch}
        </h2>
        {searchList.map((obj, index) => (
          <div key={ index }>
            <img
              src={ obj.artworkUrl100 }
              alt={ obj.collectionName }
            />
            <p>{obj.collectionName}</p>
            <p>{obj.artistName}</p>

            <Link
              data-testid={ `link-to-album-${obj.collectionId}` }
              to={ `/album/${obj.collectionId}` }
            >
              Ir Para
            </Link>

          </div>))}
      </div>);
    if (searchList < 1) {
      return [];
    }
    return list;
  };

  render() {
    const { search, buttonDisable, isLoading, foundArtists } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <p>Buscar</p>
        <form action="">
          <input
            data-testid="search-artist-input"
            name="search"
            type="text"
            onChange={ this.handleChange }
            value={ search }
          />
          <button
            data-testid="search-artist-button"
            type="button"
            disabled={ buttonDisable }
            onClick={ this.clickButtonSearch }
          >
            Pesquisar
          </button>
        </form>
        <div>
          {isLoading ? <Loading /> : this.mapSearch()}
        </div>
        <div>
          {!foundArtists && <p>Nenhum álbum foi encontrado</p>}
        </div>
      </div>
    );
  }
}
export default Search;
