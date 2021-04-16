import React from 'react';
import { Button, Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import test from '../images/giphy-unscreen.gif';

const NotFound404 = () => {
   return (
      <Paper className='warning'>
         <Typography color='secondary' variant='h2'>
            Oops!
         </Typography>
         <Typography color='secondary' variant='h4'>
            Stránku, ktorú hľadáte sa nepodarilo nájsť.
         </Typography>
         <Button variant='contained' color='primary'>
            <Link to='/'>Späť na úvdonú stránku</Link>
         </Button>
         <img src={test}></img>
      </Paper>
   );
};

export default NotFound404;
