import React from 'react';
import PropTypes from 'prop-types';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Carregando from './Carregando';

class MusicCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      musicas: [],
      loading: false,
    };
  }

  musicasFavoritas = async (musica) => {
    const { musicas } = this.state;
    this.setState({
      loading: true,
    });
    await addSong(musica);
    this.setState({
      loading: false,
    });
    this.setState({ loading: true });
    const musicasFavApi = await getFavoriteSongs();
    this.setState({
      loading: false,
      musicas: [musicasFavApi],
    });
    console.log(musicas);
    console.log(musicasFavApi);
  }

  // checkSelecionado = (musica) => {
  //   const { musicas } = this.state;
  //   const marcados = musicas.map((music) => {
  //     if (music.artistId === musica.artistId) {
  //       return checked;
  //     }
  //     return {};
  //   });
  // }

  render() {
    const { musics } = this.props;
    const { loading } = this.state;
    // console.log(musicas);
    return (
      <div>
        { loading && <Carregando /> }
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
                      onChange={ (event) => {
                        console.log(event);
                        this.musicasFavoritas(musica);
                      } }
                      // checked={ musicas.some(music => music.trackId === musica.trackId) }
                      // [2, 5, 8, 1, 4].some(elem => elem > 10);  // false
                    />
                    Favorita
                  </label>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

MusicCard.propTypes = {
  musics: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MusicCard;
