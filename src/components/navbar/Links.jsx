import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { clsx } from './_imports';

import linksData from './linksData';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationButton from './authentication-button';

const Links = () => {
   const { isAuthenticated } = useAuth0();
   let linkSelected = useRef(1);
   console.log(linkSelected.current);
   const location = useLocation();

   let zhodaI = -1;
   for (let i = 0; i < linksData.length; i++) {
      const link = linksData[i];

      let result = location.pathname.search(link.path);
      if (result !== -1) {
         zhodaI = link.id;
         console.log(result, location.pathname, link.path, zhodaI);
         break;
      }
   }
   const auth = false;
   return (
      <ul className={`nav-links `}>
         {linksData.map((link) => {
            const { id, path, name, _class, _protected, redirect } = link;
            if (_protected) {
               return (
                  isAuthenticated && (
                     <li
                        key={id}
                        className={clsx(_class && _class, linkSelected.current === id && 'active')}>
                        {path && (
                           <Link to={path} onClick={() => (linkSelected.current = id)}>
                              {name}
                           </Link>
                        )}
                     </li>
                  )
               );
            } else {
               return (
                  <li
                     key={id}
                     className={clsx(_class && _class, linkSelected.current === id && 'active')}>
                     {path && (
                        <Link to={path} onClick={() => (linkSelected.current = id)}>
                           {name}
                        </Link>
                     )}
                  </li>
               );
            }
         })}
         <AuthenticationButton />
      </ul>
   );
};

export default Links;
