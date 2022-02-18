import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicasFav: [],
      loading: false,
    };
  }

  componentDidMount = async () => {
    this.setState({ loading: true });
    const musicasFavApi = await getFavoriteSongs();
    this.setState({
      musicasFav: musicasFavApi,
      loading: false,
    });
  }

  musicasFavoritas = async (musica) => {
    this.removeEAdicionaMusicas(musica);
    // this.setState({
    //   loading: true,
    // });
    // this.setState({
    //   loading: false,
    // });
  }

  removeEAdicionaMusicas = async (musica) => {
    const { musicasFav } = this.state;
    const musicaRepetida = musicasFav
      .some((musicaT) => musicaT.trackId === musica.trackId);
    if (musicaRepetida) {
      this.setState({
        loading: true,
      });
      removeSong(musica);
      this.setState({ loading: true });
      await removeSong(musica);
      this.setState({ loading: false });
      const musicasFavAtualizadas = musicasFav
        .filter((musicaFav) => musicaFav.trackId !== musica.trackId);
      // const indiceDaMusica = musicasFav.indexOf(musica);
      this.setState({ musicasFav: musicasFavAtualizadas });
      // this.setState({ musicasFav: [...new Set(musicasFav)] });
    } else {
      this.setState({
        loading: true,
      });
      await addSong(musica);
      this.setState({ musicasFav: [...musicasFav, musica] });
      this.setState({ loading: false });
    }
  };

  render() {
    const { musics } = this.props;
    const { loading, musicasFav } = this.state;
    return (
      <div>
        { loading ? <Carregando />
          : (
            <div>
              { musics.map((musica) => (
                <div key={ musica.artistId }>
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

                  <label htmlFor="favoritas" className="favorita">
                    <input
                      data-testid={ `checkbox-music-${musica.trackId}` }
                      type="checkbox"
                      name={ musica.trackId }
                      onClick={ (event) => {
                        console.log(event);
                        this.musicasFavoritas(musica);
                      } }
                      checked={ musicasFav
                        .some((elem) => elem.trackId === musica.trackId) }
                    />
                    Favorita
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

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
