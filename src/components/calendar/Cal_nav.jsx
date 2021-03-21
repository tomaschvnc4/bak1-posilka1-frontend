import React from 'react';

import { useGlobalContext } from '../../context/Provider2';
// import SubmitBtn from './SubmitBtn';

//prettier-ignore
import { Grid, Button, ButtonGroup, ArrowLeftRoundedIcon, ArrowRightRoundedIcon,Typography } from './_imports';
// import { useGlobalContext } from '../../_contex';

const Cal_nav = () => {
   // const { calendar, changeDay } = useGlobalContext();
   const { endDay, startDay, changeDay, submitReserve } = useGlobalContext();
   return (
      <div>
         <Grid container>
            <Grid item xs={7}>
               <Typography variant='h6'>
                  {startDay.format('DD.MMM.')} - {endDay.format('DD.MMM.')}
               </Typography>
            </Grid>
            <Grid item xs={5}>
               <ButtonGroup>
                  <Button variant='outlined' onClick={() => changeDay('today')}>
                     Dnes
                  </Button>
                  <Button onClick={() => changeDay('prev')}>
                     <ArrowLeftRoundedIcon />
                  </Button>
                  <Button onClick={() => changeDay('next')}>
                     <ArrowRightRoundedIcon />
                  </Button>
                  <Button onClick={() => submitReserve()}>uložiť </Button>
               </ButtonGroup>
            </Grid>
         </Grid>
      </div>
   );
};

export default Cal_nav;
