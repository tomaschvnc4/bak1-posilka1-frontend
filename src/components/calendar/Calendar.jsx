import React, { useEffect } from 'react';
import { useGlobalContext } from '../../context/Provider2';
// import Loading2 from '../loading';

import CalNav from './Cal_nav';
import CalTable from './Cal_Table';

const Calendar = () => {
   //    console.log(testT.toDate());
   //    console.log(testT.add(30, 'm').format('HH:mm'));

   //prettier-ignore
   const { fetchRezervacie } = useGlobalContext();

   useEffect(() => {
      fetchRezervacie();
      // setTime();
      // setWeek();
   }, []);

   return (
      <div>
         <CalNav />
         <CalTable />
      </div>
   );
};

export default Calendar;
