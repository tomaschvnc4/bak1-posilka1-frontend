import React from 'react';
import { Grid, Paper, Typography, makeStyles } from '@material-ui/core';
import image from '../images/jungleGym.jpg';
import Cennik from './cennik/Cennik';

const Home = () => {
   const classes = useStyles();

   console.count('render Home');
   return (
      <main className='kontakt-main-container uvod'>
         <Grid container className={classes.root}>
            <Grid item md={6}>
               <Paper elevation={20}>
                  <Typography variant='h3'>
                     O <span>NÁS</span>
                  </Typography>
                  <p>
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto
                     incidunt, eaque sequi magni, adipisci officia inventore accusantium ad
                     doloribus, porro
                  </p>
                  <p>
                     illum? Asperiores perferendis at velit voluptatem similique necessitatibus?
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae fuga iusto
                     incidunt, eaque sequi magni, adipisci officia inventore accusantium ad
                     doloribus, porro illum? Asperiores perferendis at velit voluptatem similique
                     necessitatibus?
                  </p>
               </Paper>
            </Grid>
            <Grid container item md={6} justify='center'>
               <div className={classes.imgContainer}>
                  <img src={image} alt='' />
               </div>
            </Grid>
         </Grid>
         <div style={{ marginTop: '10%' }}>
            <Cennik />
         </div>
      </main>
   );
};

export default Home;

const useStyles = makeStyles((theme) => ({
   root: {
      '& .MuiPaper-root': {
         position: 'relative',
         zIndex: '5',
         padding: '22px',
         top: '10%',
         marginBottom: '10%',
      },
      '& .MuiPaper-elevation10': {
         boxShadow:
            '0px 6px 6px -3px rgb(0 0 0 / 20%), 0px 10px 14px 1px rgb(0 0 0 / 14%), 0px 4px 18px 3px rgb(243 175 4 / 12%)',
      },
      '& .MuiPaper-elevation20': {
         boxShadow:
            '0px 10px 13px -6px rgb(0 0 0 / 20%), 0px 20px 31px 3px rgb(204 163 0 / 14%), 0px 8px 38px 7px rgb(204 163 0 / 12%)',
      },
      '& img': {
         width: '100%',
         maxWidth: '510px',
         height: 'auto',
         [theme.breakpoints.down('xs')]: {
            maxWidth: '350px',
            marginTop: '3%',
         },
      },
      '& h3': {
         WebkitTextStroke: '0px black',
      },
   },

   imgContainer: {
      position: 'relative',
      right: '15%',
      zIndex: '2',
      [theme.breakpoints.down('sm')]: {
         right: '0',
      },
   },
}));
