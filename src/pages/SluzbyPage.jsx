import React from 'react';
import Sluzby from '../components/Sluzby';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const SluzbyPage = () => {
   return (
      <div>
         <MetaDecorator title={metaData.sluzby.title} description={metaData.sluzby.description} />
         <Sluzby />;
      </div>
   );
};

export default SluzbyPage;
