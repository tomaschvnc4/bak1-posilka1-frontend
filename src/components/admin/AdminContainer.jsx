import React from 'react';
import SetCennik from './SetCennik';

import SetKonkretnyDen from './SetKonkretnyDen';
import SetOH from './SetOH';
import AdminRezervacie from './AdminRezervacie';
import AdminPouzivatelia from './AdminPouzivatelia';

import { Axios, Grid, useAuth0 } from './_import';
import { Redirect } from 'react-router';
import Loading from '../loading';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const AdminContainer = () => {
   const { getAccessTokenSilently, isAuthenticated } = useAuth0();
   const [isAdmin, setIsAdmin] = React.useState(true);
   const [showContent, setShowContent] = React.useState(false);

   React.useEffect(async () => {
      if (isAuthenticated) {
         try {
            const token = await getAccessTokenSilently();
            const options = {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            };
            const response = await Axios.get(`${serverUrl}/registerLogin/isAdmin`, options);
            if (response.status == 200 && response.data) {
               setShowContent(true);
            } else {
               setIsAdmin(false);
            }
         } catch (error) {
            // console.log('test container-isAdmin', error);
            setIsAdmin(false);
         }
      }
   }, [isAuthenticated]);

   if (!isAdmin) {
      return <Redirect to='/' />;
   }
   if (!showContent) {
      return <Loading />;
   }
   return (
      <Grid container component='main'>
         <SetOH />
         <SetKonkretnyDen />
         <SetCennik />
         <AdminPouzivatelia />
         <AdminRezervacie />
      </Grid>
   );
};

export default AdminContainer;
