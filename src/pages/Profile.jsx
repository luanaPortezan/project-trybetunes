import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      userPerfilInfo: {},
      isLoading: true,
    };
  }

  componentDidMount() {
    this.getInfoUser();
  }

  getInfoUser = async () => {
    this.setState({ isLoading: true });
    const perfilInfo = await getUser();
    this.setState({ userPerfilInfo: perfilInfo, isLoading: false });
  };

  render() {
    const { isLoading, userPerfilInfo } = this.state;
    const { name, email, image, description } = userPerfilInfo;

    return (
      <div data-testid="page-profile">
        <Header />
        {isLoading && <Loading />}
        {!isLoading && (
          <div>
            <img data-testid="profile-image" src={ image } alt={ name } />
            <Link to="/profile/edit"><h5>Editar perfil</h5></Link>

            <div>
              <h3>
                <h4>User Test</h4>
                {name}
              </h3>
            </div>
            <h3>{email}</h3>
            <h3>{description}</h3>
          </div>
        )}
      </div>
    );
  }
}

export default Profile;
