import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/Provider2';
// import Loading2 from '../loading';
import { Link } from 'react-router-dom';

import CalNav from './Cal_nav';
import CalTable from './Cal_Table';
import { Paper, Typography } from '@material-ui/core';

const Calendar = () => {
   const { fetchRezervacie, dbUser, calSettings } = useGlobalContext();
   const refuse = dbUser.meno === '' ? true : false;

   useEffect(() => {
      fetchRezervacie();
   }, []);

   return (
      <>
         {refuse ? (
            <Paper className='rezervovat-warning'>
               <Typography color='secondary'>
                  Nie je možné vytvoriť rezerváciu, ak nemáte vyplnené profilové údaje
               </Typography>
               <Link to='/profil'>Profil</Link>
            </Paper>
         ) : calSettings.enableKalendar ? (
            <div>
               <CalNav />
               <CalTable />
            </div>
         ) : (
            <Paper className='rezervovat-warning'>
               <Typography color='secondary'>
                  Momentálne nie je možné vytvoriť rezereváciu!
               </Typography>
            </Paper>
         )}
      </>
   );
};

export default Calendar;
