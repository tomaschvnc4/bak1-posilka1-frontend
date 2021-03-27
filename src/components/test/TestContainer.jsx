import React from 'react';
import SetCennik from './SetCennik';

import SetKonkretnyDen from './SetKonkretnyDen';
import SetOH from './SetOH';
import AdminRezervacie from './AdminRezervacie';
import AdminPouzivatelia from './AdminPouzivatelia';

import { Grid } from './_import';

const TestContainer = () => {
   console.log('render container');
   return (
      <Grid
         container
         // direction='row'
         component='main'>
         <SetOH />
         <SetKonkretnyDen />
         <SetCennik />
         <Grid item md={6} xs={12}></Grid>
         <AdminRezervacie />
         <AdminPouzivatelia />
      </Grid>
   );
};

export default TestContainer;
