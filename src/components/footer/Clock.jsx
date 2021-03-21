import React, { useState, useEffect } from 'react';

import { capitalize } from '../../helpers';

import moment from 'moment';
import 'moment/locale/sk';
moment().locale('sk');

const Clock = () => {
   const [time, setTime] = useState(moment());

   useEffect(() => {
      setInterval(() => {
         setTime(moment());
      }, 1000);
   }, []);

   return (
      <div className='clock'>
         <span>{capitalize(time.format('dddd'))}</span>
         <span>{time.format('DD.MM.YYYY')}</span>
         <span>{time.format('HH:mm:ss')}</span>
      </div>
   );
};

export default Clock;
