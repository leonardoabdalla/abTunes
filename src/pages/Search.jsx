import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import Carregando from './Carregando';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      button: true,
      album: [],
      loading: false,
      click: false,
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

  requisicaoApi = async () => {
    const { name } = this.state;
    this.setState({
      loading: true,
    });
    const requisicao = await searchAlbumsAPI(name);
    console.log(requisicao);
    this.setState({
      album: requisicao,
    });
    this.setState({
      loading: false,
      click: true,

    });
  }

  render() {
    const { name, button, album, loading, click } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        {loading ? <Carregando />
          : (
            <div>
              <form>
                <label htmlFor="nome">
                  <input
                    data-testid="search-artist-input"
                    type="text"
                    name="nome"
                    value={ name }
                    onChange={ this.handleChange }
                  />
                </label>
                <button
                  data-testid="search-artist-button"
                  type="button"
                  disabled={ button }
                  onClick={ this.requisicaoApi }
                >
                  Pesquisar
                </button>
              </form>
              {(click
              && (
                album.length <= 0)
                ? <h2>Nenhum álbum foi encontrado</h2>
                : (
                  <div>
                    <p>{`Resultado de álbuns de: ${name}`}</p>
                    {album.map((artista) => (
                      <div key={ artista.collectionId }>
                        <img
                          src={ artista.artworkUrl100 }
                          alt={ artista.collectionName }
                        />
                        <div>
                          <Link
                            data-testid={ `link-to-album-${artista.collectionId}` }
                            to={ `/album/${artista.collectionId}` }
                            key={ artista.collectionId }
                            className="album-container"
                          >
                            <img
                              src={ artista.artworkUrl100 }
                              alt={ `album ${artista.collectionName}` }
                            />
                            <h3>{artista.collectionName}</h3>
                            <p>{artista.artistName}</p>
                          </Link>
                        </div>
                        <p>{ artista.artistName }</p>
                      </div>
                    ))}
                  </div>)
              )}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
