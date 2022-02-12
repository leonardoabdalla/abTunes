import React from 'react';
import Header from './Header';

class Search extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      button: true,
    };
  }

  handleChange = (event) => {
    this.setState({ name: event.target.value },
      this.buttonConditions);
  }

  buttonConditions = () => {
    const { name } = this.state;
    const condicao = (name.length >= 2);
    this.setState({
      button: !condicao,
    });
  }

  render() {
    const { name, button } = this.state;

    return (
      <div data-testid="page-search">
        <input
          data-testid="search-artist-input"
          value={ name }
          onChange={ this.handleChange }
        />
        <button
          type="button"
          data-testid="search-artist-button"
          disabled={ button }
          onClick={ this.handleChange }
        >
          Pesquisar
        </button>
        <Header />
      </div>
    );
  }
}

export default Search;
