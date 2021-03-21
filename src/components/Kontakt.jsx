import { Paper, Typography } from '@material-ui/core';
import React from 'react';
import { Grid } from './test/_import';
import SvgIcon from '@material-ui/core/SvgIcon';

import PositionIcon from '../svgIcons/PositionIcon';
import OtvaracieHodiny from './footer/OtvaracieHodiny';

const Kontakt = () => {
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
               // justify='center'
               alignItems='center'
               className='kontakt-info'
               direction='column'>
               <div style={{ display: 'inline-flex', marginBottom: '10px' }}>
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
                  <div style={{ marginLeft: '15px', color: '#7D0000' /**indianred */ }}>
                     <Typography variant='h6'>1. mája 1945/57,</Typography>
                     <Typography variant='h6'>031 01 Liptovský Mikuláš</Typography>
                  </div>
               </div>
               <Paper elevation={5} className='kontakt-paper'>
                  <OtvaracieHodiny />
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
