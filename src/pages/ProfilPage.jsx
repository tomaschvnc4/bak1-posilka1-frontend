import React from 'react';
import Profil from '../components/profil/Profil';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const ProfilPage = () => {
   return (
      <div>
         <MetaDecorator metaData={metaData.profil} />
         <Profil />
      </div>
   );
};

export default ProfilPage;
