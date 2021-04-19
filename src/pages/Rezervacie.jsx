import React from 'react';
import Calendar from '../components/calendar/Calendar';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const Rezervacie = () => {
   return (
      <div>
         <MetaDecorator metaData={metaData.rezervacie} />
         <Calendar />
      </div>
   );
};

export default Rezervacie;
