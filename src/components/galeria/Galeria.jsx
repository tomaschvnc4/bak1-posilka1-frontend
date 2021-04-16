import { Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import React from 'react';
import image from '../../images/jungleGym.jpg';

const Galeria = () => {
   const classes = useStyles();

   function importAll(r) {
      return r.keys().map(r);
   }
   let listOfImages = [];
   listOfImages = importAll(require.context('../../images/galeria', false, /\.(png|jpe?g|svg)$/));

   return (
      <main className='kontakt-main-container galeria'>
         <Typography variant='h3'>
            <span>Galéria</span>
         </Typography>

         <Grid container className={classes.root} spacing={5}>
            {listOfImages.map((iimage, index) => (
               <Grid container item md={4} sm={6} justify='center' key={index}>
                  <img src={iimage.default} />
               </Grid>
            ))}
            {/* <Grid container item md={4} sm={6} justify='center'>
               <img src={image} />
            </Grid>
            <Grid container item md={4} sm={6} justify='center'>
               <img src={image} />
            </Grid>
            <Grid container item md={4} sm={6} justify='center'>
               <img src={image} />
            </Grid>
            <Grid container item md={4} sm={6} justify='center'>
               <img src={image} />
            </Grid>
            <Grid container item md={4} sm={6} justify='center'>
               <img src={image} />
            </Grid> */}
         </Grid>
      </main>
   );
};

export default Galeria;

const useStyles = makeStyles((theme) => ({
   root: {
      '& img': {
         width: '100%',
         maxWidth: '400px',
         height: 'auto',
         boxShadow:
            '0px 10px 13px -6px rgb(0 0 0 / 20%), 0px 20px 31px 3px rgb(0 0 0 / 14%), 0px 8px 36px 7px rgb(0 0 0 / 12%);',
         [theme.breakpoints.only('xs')]: {
            maxWidth: '350px',
         },
      },
      '& .MuiGrid-grid-md-4': {
         //  backgroundColor: 'red',
      },
   },
}));
