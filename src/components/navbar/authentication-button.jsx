// src/components/authentication-button.js

import React from 'react';

import { useAuth0 } from '@auth0/auth0-react';

import { Link } from 'react-router-dom';

const AuthenticationButton = () => {
   const { isAuthenticated } = useAuth0();
   const { loginWithRedirect, logout } = useAuth0();

   console.log(isAuthenticated);
   return isAuthenticated ? (
      <li>
         <Link
            to=''
            onClick={() => {
               logout({ returnTo: window.location.origin });
            }}>
            Odhlásiť
         </Link>
      </li>
   ) : (
      <li>
         <Link
            to=''
            onClick={() => {
               loginWithRedirect();
            }}>
            Prihlásiť
         </Link>
      </li>
   );
};

export default AuthenticationButton;
