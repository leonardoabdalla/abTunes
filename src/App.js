import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        {/* Switch irá reinderizar apenas o primeiro que encontrar, ele é necessário para não reiderizar a notfaund com outro component. */}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          {/* no profile foi adicionado o exact seguindo o mesmo principio do "/", se não colocasse o exact ao colocar no browser "/profile/edit" iria cair em profile */}
          <Route exact path="/profile" component={ Profile } />
          <Route path="/profile/edit" component={ ProfileEdit } />
          <Route path="*" component={ NotFound } />
          {/* NotFound precisa ser colocado por ultimo, caso contrário tudo que estiver abaixo não será reinderizado */}
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
