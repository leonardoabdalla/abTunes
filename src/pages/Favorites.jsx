import React from 'react';
import { getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Header from './Header';
import Carregando from './Carregando';

class Favorites extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicasFavoritas: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const recebeMusicasFav = await getFavoriteSongs();
    this.setState({
      loading: false,
      musicasFavoritas: recebeMusicasFav,
    });
    console.log(recebeMusicasFav);
  }

  removeEAdicionaMusicas = async (musica) => {
    const { musicasFavoritas } = this.state;
    this.setState({
      loading: true,
    });
    await removeSong(musica);
    this.setState({ loading: false });
    const musicasFavAtualizadas = musicasFavoritas
      .filter((musicaFav) => musicaFav.trackId !== musica.trackId);
    // this.setState({ musicasFavoritas: [...new Set(musicasFavAtualizadas)] });
    this.setState({ musicasFavoritas: musicasFavAtualizadas });
  };

  render() {
    const { musicasFavoritas, loading } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        { loading ? <Carregando />
          : (
            <div>
              <h2>Musicas favoritas:</h2>
              { musicasFavoritas.map((musica) => (
                <div key={ musica.artistId }>
                  <p>{ musica.trackId }</p>
                  <p>{ musica.trackName }</p>
                  { musica.previewUrl
              && (
                <div>
                  <audio data-testid="audio-component" src={ musica.previewUrl } controls>
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    {' '}
                    <code>audio</code>
                    .
                  </audio>

                  <label htmlFor="Favorita" className="Favorita">
                    Favorita
                    <input
                      data-testid={ `checkbox-music-${musica.trackId}` }
                      type="checkbox"
                      name="Favorita"
                      id="Favorita"
                      onClick={ () => {
                        this.removeEAdicionaMusicas(musica);
                      } }
                      checked
                    />
                  </label>
                </div>
              )}
                </div>
              ))}
            </div>
          )}
      </div>
    );
  }
}

export default Favorites;
