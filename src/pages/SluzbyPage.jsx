import React from 'react';
import Sluzby from '../components/Sluzby';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const SluzbyPage = () => {
   return (
      <div>
         <MetaDecorator metaData={metaData.sluzby} />
         <Sluzby />;
      </div>
   );
};

export default SluzbyPage;
