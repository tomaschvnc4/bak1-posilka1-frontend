import React from 'react';
import Galeria from '../components/galeria/Galeria';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const GaleriaPage = () => {
   return (
      <div>
         <MetaDecorator metaData={metaData.galeria} />
         <Galeria />
      </div>
   );
};

export default GaleriaPage;
