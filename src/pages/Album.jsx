import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import getMusics from '../services/musicsAPI';
import MusicCard from './MusicCard';

class Album extends React.Component {
  constructor() {
    super();
    this.state = {
      musics: [],
    };
  }

  componentDidMount = () => {
    this.enviaId();
  }

  enviaId = async () => {
    const { match: { params: { id } } } = this.props;
    const musica = await getMusics(id);
    this.setState({ musics: musica });
    console.log(musica);
  }

  render() {
    const { musics } = this.state;
    return (
      <div>
        <Header />
        <button type="button" onClick={ this.enviaId }> botão </button>
        <p data-testid="artist-name">{ musics.length > 0 && musics[0].artistName }</p>
        <p data-testid="album-name">{ musics.length > 0 && musics[0].collectionName }</p>
        {/* { musics.map((musica) => (
          <div key={ musica.artistName }>
            <p>{ musica.artistName }</p>
          </div>
        ))} */}
        <MusicCard musics={ musics } />
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.string.isRequired,
};

export default Album;
