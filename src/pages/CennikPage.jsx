import React from 'react';
import Cennik from '../components/cennik/Cennik';
import { MetaDecorator, metaData } from '../components/metaDecorator';

const CennikPage = () => {
   return (
      <div>
         <MetaDecorator title={metaData.cennik.title} description={metaData.cennik.description} />
         <Cennik />
      </div>
   );
};

export default CennikPage;
