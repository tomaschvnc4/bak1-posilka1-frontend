import { Divider, Grid, Typography } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/Provider2';
import { Axios } from '../test/_import';
const serverUrl = process.env.REACT_APP_SERVER_URL;
const Cennik = () => {
   const { cennik, setCennik } = useGlobalContext();

   useEffect(async () => {
      console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA', serverUrl);
      const response = await Axios.get(`${serverUrl}/cennik/get`);
      const { data, status } = response;

      status === 200 && setCennik(data);
   }, []);

   return (
      <main className='kontakt-main-container cennik'>
         <Typography variant='h3'>
            <span>CENNÍK</span>
         </Typography>
         <Grid
            container
            componet='section'
            direction='column'
            alignItems='center'
            className='cennik'>
            <Typography variant='h5'>
               <span>Fitness zóna</span>
               <Divider variant='middle' />
            </Typography>
            {/* <div className='divider-solid'></div> */}

            {cennik.map((item, id) => {
               const { title, price } = item;
               return (
                  <Grid
                     container
                     item
                     md={7}
                     direstion='row'
                     justify='space-between'
                     component='article'
                     key={id}>
                     <Typography variant='subtitle1'>{title}</Typography>
                     <Typography>{price}€</Typography>
                  </Grid>
               );
            })}
         </Grid>
      </main>
   );
};

export default Cennik;
