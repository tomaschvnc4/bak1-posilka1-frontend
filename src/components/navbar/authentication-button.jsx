// src/components/authentication-button.js

import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';

const AuthenticationButton = () => {
   const { isAuthenticated } = useAuth0();
   const { loginWithRedirect, logout } = useAuth0();

   console.log(isAuthenticated);
   return isAuthenticated ? (
      <li>
         <Link
            onClick={() => {
               logout({ returnTo: window.location.origin });
            }}>
            Odhlásiť
         </Link>
      </li>
   ) : (
      <li>
         <Link
            onClick={() => {
               loginWithRedirect();
            }}>
            Prihlásiť
         </Link>
      </li>
   );
};

export default AuthenticationButton;
