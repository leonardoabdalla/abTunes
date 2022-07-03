import React from 'react';
import { Redirect } from 'react-router-dom';
import { createUser } from '../services/userAPI';
import Carregando from './Carregando';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      button: true,
      Name: '',
      loading: false,
      redirect: false,
    };
  }

  handleChange = (event) => {
    this.setState({ Name: event.target.value },
      this.buttonConditions);
  }

  buttonConditions = () => {
    const { Name } = this.state;
    const inputLength = 3;
    const condicao = (Name.length >= inputLength);
    this.setState({
      button: !condicao,
    });
  }

  handleSaveChange = async () => {
    const { Name } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name: Name });

    this.setState({
      loading: false,
      redirect: true,
    });
  }

  render() {
    const { button, Name, loading, redirect } = this.state;
    return (
      <div data-testid="page-login">
        { redirect && <Redirect to="/search" /> }
        {
          loading ? <Carregando /> : (
            <form>
              <input
                data-testid="login-name-input"
                id="Favorita"
                value={ Name }
                onChange={ this.handleChange }
              />
              <button
                type="button"
                data-testid="login-submit-button"
                disabled={ button }
                onClick={ this.handleSaveChange }
              >
                Entrar
              </button>
            </form>
          )
        }
      </div>
    );
  }
}

export default Login;
