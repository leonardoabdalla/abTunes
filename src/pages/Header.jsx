import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Carregando from './Carregando';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      loading: true,
    };
  }

  componentDidMount() { this.newApi(); }

  async newApi() {
    const { name } = this.state;
    const nome = await getUser();
    this.setState({
      name: nome.name,
    });
    this.setState({ loading: false });
    console.log(nome);
    console.log(name);
  }

  render() {
    const { name, loading } = this.state;
    return (
      <header data-testid="header-component">
        <div>
          {
            loading ? <Carregando /> : (
              <h1 data-testid="header-user-name">{ name }</h1>
            )
          }
          <Link to="/search" data-testid="link-to-search">pesquisa</Link>
          <Link to="/favorites" data-testid="link-to-favorites">musicas favoritas</Link>
          <Link to="/profile" data-testid="link-to-profile">exibição de perfil</Link>
        </div>
      </header>
    );
  }
}

export default Header;
