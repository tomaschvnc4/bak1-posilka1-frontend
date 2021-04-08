import React, { useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
//prettier-ignore
import {makeStyles,clsx} from './_imports'

import linksData from './linksData';
import { useAuth0 } from '@auth0/auth0-react';
import AuthenticationButton from './authentication-button';
import Axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const Links = () => {
   const classes = useStyles();
   const { isAuthenticated, getAccessTokenSilently } = useAuth0();
   const linkSelected = useRef(1);
   const [isAdmin, setIsAdmin] = React.useState(false);
   const location = useLocation();

   let pathname = location.pathname;

   if (pathname === '/') {
      linkSelected.current = 1;
   } else {
      pathname = pathname.slice(1);

      for (let i = 0; i < linksData.length; i++) {
         const link = linksData[i];
         if (link.path === '/' || link.path === undefined) {
            continue;
         }
         const result = pathname.match(link.path?.slice(1));

         if (result != null) {
            linkSelected.current = link.id;
            break;
         }
      }
   }

   React.useEffect(async () => {
      try {
         if (isAuthenticated) {
            const token = await getAccessTokenSilently();
            const options = {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            };
            const response = await Axios.get(`${serverUrl}/registerLogin/isAdmin`, options);

            if (response.status == 200 && response.data) {
               setIsAdmin(true);
            }
         }
      } catch (error) {
         console.log('Links', error);
      }
   }, [isAuthenticated]);

   return (
      <>
         <ul className={clsx(`nav-links `, classes.root)}>
            {linksData.map((link) => {
               const { id, path, name, _class, _protected, redirect } = link;
               if (_protected) {
                  return name === 'admin'
                     ? isAdmin && (
                          <li
                             key={id}
                             className={clsx(
                                _class && _class,
                                linkSelected.current === id && 'active'
                             )}>
                             {path && <Link to={path}>{name}</Link>}
                          </li>
                       )
                     : isAuthenticated && (
                          <li
                             key={id}
                             className={clsx(
                                _class && _class,
                                linkSelected.current === id && 'active'
                             )}>
                             {path && <Link to={path}>{name}</Link>}
                          </li>
                       );
               } else {
                  return (
                     <li
                        key={id}
                        className={clsx(_class && _class, linkSelected.current === id && 'active')}>
                        {path && <Link to={path}>{name}</Link>}
                     </li>
                  );
               }
            })}
            <AuthenticationButton />
         </ul>
      </>
   );
};

export default Links;

const useStyles = makeStyles((theme) => ({
   root: {
      '& .active a': {
         [theme.breakpoints.down('sm')]: {
            padding: '1px 0',
         },
      },
   },
}));
