import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <>
      <Link to="/profile" style={{ color: '#E2F0F7', paddingLeft: '60px' }}>
        Profile
      </Link>

      <button
        onClick={() =>
          logout({ logoutParams: { returnTo: window.location.origin } })
        }
        style={{
          backgroundColor: '#404C4A',
          color: '#E2F0F7',
          borderColor: '#404C4A',
          paddingLeft: '60px',
        }}
      >
        Log Out
      </button>
    </>
  );
};

export default LogoutButton;
