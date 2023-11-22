import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      onClick={() => loginWithRedirect()}
      style={{
        backgroundColor: '#404C4A',
        color: '#E2F0F7',
        borderColor: '#404C4A',
        paddingLeft: '60px',
      }}
    >
      Log In
    </button>
  );
};

export default LoginButton;
