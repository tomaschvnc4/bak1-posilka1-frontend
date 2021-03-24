import { Typography } from '@material-ui/core';
import React from 'react';

import { useGlobalContext } from '../../context/Provider2';

const OtvaracieHodiny = () => {
   const { calSettings } = useGlobalContext();
   const { PonPia_od, PonPia_do, SobNed_od, SobNed_do } = calSettings;
   return (
      <div className={'footer-otvaracie-hodiny'}>
         <Typography variant='body1'>Pondelok-Piatok</Typography>
         <span>
            {PonPia_od}-{PonPia_do}
         </span>
         <Typography variant='body1'>Sobota-Nedeľa</Typography>
         <span>
            {SobNed_od}-{SobNed_do}
         </span>
      </div>
   );
};

export default OtvaracieHodiny;
