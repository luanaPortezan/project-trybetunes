import React from 'react';
import { Link } from 'react-router-dom';
import Loading from './Loading';
import { getUser } from '../services/userAPI';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getName();
  }

  getName = async () => {
    const { name } = await getUser();
    this.setState({ name, isLoading: false });
  };

  render() {
    const { name, isLoading } = this.state;
    return (
      <header data-testid="header-component">
        <h2>Navegador</h2>
        <div>
          <Link data-testid="link-to-search" to="/search">Buscar</Link>
          <Link data-testid="link-to-favorites" to="/favorites">Meus Favoritos</Link>
          <Link data-testid="link-to-profile" to="/profile">Meu Perfil</Link>
        </div>
        <p data-testid="header-user-name">
          Nome:
          {' '}
          {isLoading ? <Loading /> : name }
        </p>
      </header>
    );
  }
}

export default Header;
