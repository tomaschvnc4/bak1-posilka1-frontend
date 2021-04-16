import React, { useRef } from 'react';
import { Grid, SvgIcon, Typography } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { makeStyles } from '@material-ui/core/styles';

import Clock from './Clock';

import PositionIcon from '../../svgIcons/PositionIcon';
import moment from 'moment';
import 'moment/locale/sk';
import FacebookIcon from '../../svgIcons/FacebookIcon';
import OtvaracieHodiny from './OtvaracieHodiny';
import { ZmenaOtvaracichHodin } from '../Kontakt';

moment().locale('sk');

const Footer = () => {
   const classes = useStyles();

   return (
      <div className='main-footer'>
         <div className='footer-content'>
            <Grid container className='footer-above-line'>
               {/* -->prvy stlpec */}
               <Grid container item sm={4} alignItems='center' justify='center' direction='column'>
                  <p style={{ fontSize: '18px' }}>
                     Jungle <span className='clr-yellow'>Gym</span>
                  </p>
                  {/* <div className={'footer-otvaracie-hodiny'}>
                     <Typography variant='body1'>Pondelok-Piatok</Typography>
                     <span> 06:00-18:00</span>
                     <Typography variant='body1'>Sobota-Nedeľa</Typography>
                     <span>06:00-18:00</span>
                  </div> */}
                  <OtvaracieHodiny />
                  <ZmenaOtvaracichHodin />
               </Grid>
               {/* -->druhy stlpec */}
               <Grid
                  container
                  item
                  sm={4}
                  alignItems='center'
                  justify='center'
                  className={classes.xsPadding}>
                  <div>
                     <SvgIcon
                        component={PositionIcon}
                        style={{
                           width: '35px',
                           height: '40px',
                           color: '#CD5C5C',
                           color2: '#CD5C5C',
                        }}
                     />
                     <div style={{ marginLeft: '15px', color: 'indianred' }}>
                        <Typography variant='subtitle2'>1. mája 1945/57,</Typography>
                        <Typography variant='subtitle2'>031 01 Liptovský Mikuláš</Typography>
                     </div>
                  </div>
                  <a href='https://sk-sk.facebook.com/pages/category/Gym-Physical-Fitness-Center/JUNGLE-GYM-Liptovský-Mikuláš-1426065051053128/'>
                     <SvgIcon
                        component={FacebookIcon}
                        style={{
                           width: '45px',
                           height: '45px',
                           // color: '#E84434',
                           color2: '',
                        }}
                     />
                  </a>
               </Grid>
               {/* -->treti stlpec */}
               <Grid container item sm={4} alignItems='center' justify='center'>
                  <Clock />
               </Grid>
            </Grid>

            <div className='divider-solid'></div>
            <div className='copyright'>
               <Typography variant='body2'>
                  © 2021 - {moment().format('YYYY')}{' '}
                  <span className='clr-yellow'>junglegymlm.sk</span>
               </Typography>
            </div>
         </div>
      </div>
   );
};

export default Footer;

const useStyles = makeStyles((theme) => ({
   xsPadding: {
      padding: '0',
      display: 'flex',
      flexDirection: 'column',
      mixBlendMode: 'hard-light',
      justifyContent: 'space-around',
      [theme.breakpoints.down('xs')]: {
         padding: '3% 0',
      },
      '& div:first-child': {
         display: 'inline-flex',
      },
   },
}));
