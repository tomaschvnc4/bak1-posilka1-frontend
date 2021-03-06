import React from 'react';
import { makeStyles, Paper, Tooltip, Typography, Grid, SvgIcon } from '@material-ui/core';
import PositionIcon from '../svgIcons/PositionIcon';
import OtvaracieHodiny from './footer/OtvaracieHodiny';
import MailOutlineRoundedIcon from '@material-ui/icons/MailOutlineRounded';
import PhoneAndroidRoundedIcon from '@material-ui/icons/PhoneAndroidRounded';
import clsx from 'clsx';
import { useGlobalContext } from '../context/Provider2';

import moment from 'moment';
import 'moment/locale/sk';
moment.locale('sk');

const Kontakt = () => {
   const classes = useStyles();

   return (
      <main className='kontakt-main-container'>
         <Typography variant='h3'>
            FITNESS <span>CENTRUM</span>
         </Typography>
         <Grid container className='kontakt-info-container' alignItems='center'>
            <Grid
               container
               item
               md={6}
               xs={12}
               component='section'
               alignItems='center'
               className={clsx('kontakt-info', classes.root)}
               direction='column'>
               <Grid container item xs={12} justify='center'>
                  <Grid item xs={2}>
                     <SvgIcon
                        component={PositionIcon}
                        style={{
                           width: '50px',
                           height: '65px',
                           color: '#7D0000',
                           color2: '',
                        }}
                     />
                     {/* #E84434  */}
                  </Grid>
                  <Grid item xs={9} sm={6}>
                     <Typography variant='h6'>1. mája 1945/57,</Typography>
                     <Typography variant='h6'>031 01 Liptovský Mikuláš</Typography>
                  </Grid>
               </Grid>

               <Grid container item xs={12} justify='center' alignItems='center'>
                  <Grid item xs={2}>
                     <MailOutlineRoundedIcon />
                  </Grid>
                  <Grid item xs={9} sm={6}>
                     {/* <Typography variant='h6'>junglegymlm@gmail.com</Typography> */}
                     <BotProtectedField type='email' />
                  </Grid>
               </Grid>

               <Grid container item xs={12} justify='center' alignItems='center'>
                  <Grid item xs={2}>
                     <PhoneAndroidRoundedIcon />
                  </Grid>
                  <Grid item xs={9} sm={6}>
                     {/* <Typography variant='h6'>+421 904 868840</Typography> */}
                     <BotProtectedField type='phone' />
                  </Grid>
               </Grid>
               <Paper elevation={5} className='kontakt-paper'>
                  <OtvaracieHodiny />
                  <ZmenaOtvaracichHodin />
               </Paper>
               {/* <SvgIcon viewBox='0 0 50 50'>
                  <PositionIcon />
               </SvgIcon> */}
            </Grid>

            <Grid item md={6} xs={12} component='section'>
               <iframe
                  title='mapa'
                  className='iframe-map'
                  src='https://maps.google.com/maps?q=Jungle%20Gym%201.%20m%C3%A1ja%201945/57,%20031%2001%20Liptovsk%C3%BD%20Mikul%C3%A1%C5%A1&t=&z=17&ie=UTF8&iwloc=&output=embed'></iframe>
               <br />
            </Grid>
         </Grid>
      </main>
   );
};

export default Kontakt;

export const ZmenaOtvaracichHodin = () => {
   const { konkretneDniOH } = useGlobalContext();
   return (
      <React.Fragment>
         {konkretneDniOH.length != 0 && (
            <div className='zmenaOH'>
               <Typography color='secondary' variant='body1' component='h6'>
                  Zmena otváracích hodín!
               </Typography>
               {konkretneDniOH.map((item) => {
                  const { timestamp, od, do: doo, zavrete } = item;
                  return (
                     timestamp && (
                        <Typography
                           // style={{ display: 'flex' }}
                           key={timestamp}
                           variant='body1'>
                           →&nbsp;{moment(timestamp).format('dd-DD.MM.YYYY')}&nbsp;
                           {od}&nbsp;
                           {doo}
                           {!!zavrete && 'zavreté'}
                        </Typography>
                     )
                  );
               })}
            </div>
         )}
      </React.Fragment>
   );
};

const BotProtectedField = ({ type }) => {
   const [email, setEmail] = React.useState('');
   const [phone, setPhone] = React.useState('');
   function showEmail() {
      setEmail('junglegymlm@gmail.com');
   }
   function showPhone() {
      setPhone('+421904868840');
   }
   if (type === 'email') {
      return email ? (
         <Typography variant='h6' className={email || 'prt mail'} onClick={showEmail}>
            {email || 'amg'}
         </Typography>
      ) : (
         <Tooltip title='Kliknutím povolíš kopírovanie' arrow>
            <Typography variant='h6' className={email || 'prt mail'} onClick={showEmail}>
               {email || 'amg'}
            </Typography>
         </Tooltip>
      );
   }
   if (type === 'phone') {
      return phone ? (
         <Typography variant='h6' className={phone || 'prt phone'} onClick={showPhone}>
            {phone || '409'}
         </Typography>
      ) : (
         <Tooltip title='Kliknutím povolíš kopírovanie' arrow>
            <Typography variant='h6' className={phone || 'prt phone'} onClick={showPhone}>
               {phone || '409'}
            </Typography>
         </Tooltip>
      );
   }
   return <> </>;
};

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiGrid-root': {
         color: '#7D0000',
         marginTop: '2px',
      },
      '& .MuiGrid-root h6': {
         color: '#7D0000',
         width: 'fit-content',
      },
      '& svg': {
         color: '#7D0000',
         fontSize: '50px',
      },
      '& p,span': {
         color: 'black',
      },
      '& .zmenaOH': {
         marginTop: '5%',
         '& h6': {
            display: 'flex',
            justifyContent: 'center',
            fontWeight: 'bold',
         },
      },
   },
}));
