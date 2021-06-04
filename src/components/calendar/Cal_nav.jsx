import Axios from 'axios';
import React, { useState } from 'react';

import { useGlobalContext } from '../../context/Provider2';
import { isEmtyObj } from '../../helpers';
import AlertBox from '../AlertBox';

//prettier-ignore
import { Grid, Button, ArrowLeftRoundedIcon, ArrowRightRoundedIcon,Typography,makeStyles } from './_imports';
const serverUrl = process.env.REACT_APP_SERVER_URL;

const Cal_nav = () => {
   //prettier-ignore
   const { endDayRef, startDayRef, changeDay, getAccessTokenSilently,user,userSelect } = useGlobalContext();
   const classes = useStyles();
   const [alert, setAlert] = useState(false);

   /*=======
   FUNCTION
   =========   
   */
   async function submitReserve() {
      const token = await getAccessTokenSilently();
      const userId = user.sub;
      let newUserSelect = { ...userSelect };
      let submitData = {};

      // console.log('submit data after:', submitData);
      for (const key in userSelect) {
         const { zmena, minI, maxI } = userSelect[key];
         if (zmena) {
            submitData[userId] || (submitData[userId] = {});
            submitData[userId][key] = { minI, maxI };
            userSelect[key].zmena = false;
         }
      }
      // console.log('send:');
      // console.log(submitData);
      if (!isEmtyObj(submitData)) {
         const response = await Axios.post(
            `${serverUrl}/calendar/add`,
            { payload: submitData },
            {
               headers: {
                  Authorization: `Bearer ${token}`,
               },
            }
         );
         if (response.status == 200) {
            setAlert(true);
         }
      }
   }
   /*=======
   RENDER
   =========   
   */
   return (
      <div className={classes.root}>
         <AlertBox
            isOpen={alert}
            setOpen={setAlert}
            mess='Uloženie bolo úspešné'
            severity='success'
            duration={4000}
         />
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
                  uložiť
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
