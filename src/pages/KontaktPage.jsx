import React from 'react';
import Kontakt from '../components/Kontakt';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const KontaktPage = () => {
   return (
      <div>
         <MetaDecorator metaData={metaData.kontakt} />
         <Kontakt />
      </div>
   );
};

export default KontaktPage;
