import React from 'react';
import Galeria from '../components/galeria/Galeria';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const GaleriaPage = () => {
   return (
      <div>
         <MetaDecorator title={metaData.galeria.title} description={metaData.galeria.description} />
         <Galeria />
      </div>
   );
};

export default GaleriaPage;
