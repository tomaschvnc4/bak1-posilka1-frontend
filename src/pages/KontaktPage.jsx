import React from 'react';
import Kontakt from '../components/Kontakt';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const KontaktPage = () => {
   return (
      <div>
         <MetaDecorator title={metaData.kontakt.title} description={metaData.kontakt.description} />
         <Kontakt />
      </div>
   );
};

export default KontaktPage;
