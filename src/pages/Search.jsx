import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      search: '',
      btnDisable: true,
    };
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
    const minLength = 1;
    if (search.length >= minLength) {
      this.setState({ btnDisable: false });
    } else {
      this.setState({ btnDisable: true });
    }
  };

  render() {
    const { search, btnDisable } = this.state;
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
            disabled={ btnDisable }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}
export default Search;
