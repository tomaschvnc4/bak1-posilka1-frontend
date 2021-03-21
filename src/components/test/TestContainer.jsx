import React from 'react';
import SetCennik from './SetCennik';

import SetKonkretnyDen from './SetKonkretnyDen';
import TestComponet from './TestComponet';

import { Grid } from './_import';

const TestContainer = () => {
   return (
      <Grid container direction='row' component='main'>
         <TestComponet />
         <SetKonkretnyDen />
         <SetCennik />
      </Grid>
   );
};

export default TestContainer;
