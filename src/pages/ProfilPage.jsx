import React from 'react';
import Profil from '../components/profil/Profil';
import { MetaDecorator, metaData } from '../components/metaDecorator';
const ProfilPage = () => {
   return (
      <div>
         <MetaDecorator title={metaData.profil.title} description={metaData.profil.description} />
         <Profil />
      </div>
   );
};

export default ProfilPage;
