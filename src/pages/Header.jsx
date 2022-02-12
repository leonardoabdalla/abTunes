import React from 'react';
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
        {
          loading ? <Carregando /> : (
            <h1>{ name }</h1>
          )
        }
      </header>
    );
  }
}

export default Header;
