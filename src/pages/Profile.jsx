import React from 'react';
import Header from './Header';

class Profile extends React.Component {
  render() {
    return (
      <div data-testid="page-profile">
        Profile
        <Header />
      </div>
    );
  }
}

export default Profile;
