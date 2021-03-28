import React, { useEffect } from 'react';
import SetCennik from './SetCennik';

import SetKonkretnyDen from './SetKonkretnyDen';
import SetOH from './SetOH';
import AdminRezervacie from './AdminRezervacie';
import AdminPouzivatelia from './AdminPouzivatelia';

import { Grid } from './_import';

const TestContainer = () => {
   console.log('render Testcontainer');
   return (
      <Grid container component='main'>
         <SetOH />
         <SetKonkretnyDen />
         <SetCennik />
         {/* <Grid item md={6} xs={12}></Grid> */}
         <AdminPouzivatelia />
         <AdminRezervacie />
      </Grid>
   );
};

export default TestContainer;
