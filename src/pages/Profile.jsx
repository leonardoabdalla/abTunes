import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dadosSalvosName: '',
      dadosSalvosEmail: '',
      dadosSalvosDescricao: '',
      dadosSalvosImg: '',
    };
  }

  componentDidMount = () => {
    this.recuperandoDados();
  }

  recuperandoDados = async () => {
    const dados = await getUser();
    this.setState({
      dadosSalvosName: dados.name,
      dadosSalvosEmail: dados.email,
      dadosSalvosDescricao: dados.description,
      dadosSalvosImg: dados.image,
    });
  }

  render() {
    const {
      dadosSalvosName, dadosSalvosEmail, dadosSalvosDescricao, dadosSalvosImg,
    } = this.state;
    return (
      <div data-testid="page-profile">
        Profile
        <Header />
        <p>{ dadosSalvosName }</p>
        <p>{ dadosSalvosEmail }</p>
        <p>{ dadosSalvosDescricao }</p>
        <img data-testid="profile-image" src={ dadosSalvosImg } alt={ dadosSalvosName } />
        <Link to="/profile/edit">Editar perfil</Link>
      </div>
    );
  }
}

export default Profile;
