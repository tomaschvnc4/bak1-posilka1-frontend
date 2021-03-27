import React from 'react';

import { useGlobalContext } from '../../context/Provider2';
import AlertBox from '../AlertBox';
// import SubmitBtn from './SubmitBtn';

//prettier-ignore
import { Grid, Button, ArrowLeftRoundedIcon, ArrowRightRoundedIcon,Typography,makeStyles } from './_imports';
// import { useGlobalContext } from '../../_contex';

const Cal_nav = () => {
   const classes = useStyles();
   const { endDayRef, startDayRef, changeDay, submitReserve, alert, setAlert } = useGlobalContext();
   const { open } = alert;
   return (
      <div className={classes.root}>
         {open && <AlertBox closeFun={setAlert} mess='Uloženie bolo úspešné' />}
         <Grid container justify='space-around'>
            <Grid>
               <Typography variant='h6'>
                  {startDayRef.current.format('DD.MMM.')} - {endDayRef.current.format('DD.MMM.')}
               </Typography>
            </Grid>
            <Grid>
               <Button variant='outlined' onClick={() => changeDay('prev')}>
                  <ArrowLeftRoundedIcon />
               </Button>
               <Button variant='outlined' onClick={() => changeDay('next')}>
                  <ArrowRightRoundedIcon />
               </Button>
               <Button variant='outlined' onClick={() => changeDay('today')}>
                  Dnes
               </Button>
               <Button variant='outlined' onClick={() => submitReserve()}>
                  uložiť{' '}
               </Button>
            </Grid>
         </Grid>
      </div>
   );
};

export default Cal_nav;

const useStyles = makeStyles((theme) => ({
   root: {
      width: '80%',
      margin: 'auto',

      '& .MuiButton-outlined': {
         margin: '2px',
      },
   },
}));
