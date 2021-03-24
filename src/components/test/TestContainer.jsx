import React from 'react';
import SetCennik from './SetCennik';

import SetKonkretnyDen from './SetKonkretnyDen';
import SetOH from './SetOH';

import { Grid } from './_import';

const TestContainer = () => {
   return (
      <Grid
         container
         // direction='row'
         component='main'>
         <SetOH />
         <SetKonkretnyDen />
         <SetCennik />
      </Grid>
   );
};

export default TestContainer;
