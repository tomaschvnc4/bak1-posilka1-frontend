import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/Provider2';
// import Loading2 from '../loading';
import { Link } from 'react-router-dom';

import CalNav from './Cal_nav';
import CalTable from './Cal_Table';
import { Paper, Typography } from '@material-ui/core';
import Loading from '../loading';

const Calendar = () => {
   //prettier-ignore
   const { fetchRezervacie, dbUser, calSettings ,isLoadingCal, setIsLoadingCal} = useGlobalContext();
   const refuse = dbUser.meno === '' ? true : false;

   useEffect(() => {
      fetchRezervacie();
   }, []);

   useEffect(() => {
      return () => {
         setIsLoadingCal(true);
      };
   }, []);

   if (isLoadingCal) {
      return <Loading />;
   }

   return (
      <React.Fragment>
         {refuse ? (
            <Paper className='warning'>
               <Typography color='secondary'>
                  Nie je možné vytvoriť rezerváciu, ak nemáte vyplnené profilové údaje
               </Typography>
               <Link to='/profil'>Profil</Link>
            </Paper>
         ) : calSettings.povolitKalendar ? (
            <div style={{ margin: '1%' }}>
               <CalNav />
               <CalTable />
            </div>
         ) : (
            <Paper className='warning'>
               <Typography color='secondary'>
                  Momentálne nie je možné vytvoriť rezereváciu!
               </Typography>
            </Paper>
         )}
      </React.Fragment>
   );
};

export default Calendar;
