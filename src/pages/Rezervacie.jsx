import React from 'react';
import Calendar from '../components/calendar/Calendar';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const Rezervacie = () => {
   return (
      <div>
         <MetaDecorator
            title={metaData.rezervacie.title}
            description={metaData.rezervacie.description}
         />
         <Calendar />
      </div>
   );
};

export default Rezervacie;
