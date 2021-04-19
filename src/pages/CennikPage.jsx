import React from 'react';
import Cennik from '../components/cennik/Cennik';
import { MetaDecorator, metaData } from '../components/metaDecorator';

const CennikPage = () => {
   return (
      <div>
         <MetaDecorator metaData={metaData.cennik} />
         <Cennik />
      </div>
   );
};

export default CennikPage;
