import React from 'react';

import LoginButton from './loginButton';
import LogoutButton from './logoutButton';

import { useAuth0 } from '@auth0/auth0-react';

export const AuthenticationButton = () => {
  const { isAuthenticated } = useAuth0();

  return isAuthenticated ? <LogoutButton /> : <LoginButton />;
};
