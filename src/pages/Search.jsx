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
                <input
                  data-testid="search-artist-input"
                  value={ name }
                  onChange={ this.handleChange }
                />
                <button
                  type="button"
                  data-testid="search-artist-button"
                  disabled={ button }
                  onClick={ this.requisicaoApi }
                >
                  Pesquisar
                </button>
              </form>
              { click && (
                <div>
                  <p>
                    { `Resultado de álbuns de: ${artistName} ` }
                  </p>

                  { album.length > 0
                    ? album.map((artista) => (
                      <div key={ artista.artistId }>
                        <p>{ artista.artistId }</p>
                        <p>{ artista.artistName }</p>
                        <p>{ artista.collectionId }</p>
                        <p>{ artista.ollectionName }</p>
                        <p>{ artista.collectionPrice }</p>
                        <img src={ artista.artworkUrl100 } alt={ artista.artistName } />
                        <p>{ artista.releaseDate }</p>
                        <p>{ artista.trackCount }</p>
                        <div>
                          <Link
                            to={ `/album/${artista.collectionId}` }
                            data-testid={ `link-to-album-${artista.collectionId}` }
                          >
                            <img
                              src={ artista.artworkUrl100 }
                              alt={ `Imagem ${artista.collectionName}` }
                            />
                            <h3>{artista.collectionName}</h3>
                            <p>{artista.artistName}</p>
                          </Link>
                        </div>
                      </div>
                    )) : <h3>Nenhum álbum foi encontrado</h3>}
                </div>
              )}
            </div>
          )}
      </div>
    );
  }
}

export default Search;
