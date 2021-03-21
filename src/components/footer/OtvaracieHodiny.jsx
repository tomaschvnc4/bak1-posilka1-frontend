import { Typography } from '@material-ui/core';
import React from 'react';

import { useGlobalContext } from '../../context/Provider2';

const OtvaracieHodiny = () => {
   const { calSettings } = useGlobalContext();
   const { Pondelok_od, Pondelok_do, Sobota_od, Sobota_do } = calSettings;
   return (
      <div className={'footer-otvaracie-hodiny'}>
         <Typography variant='body1'>Pondelok-Piatok</Typography>
         <span>
            {Pondelok_od}-{Pondelok_do}
         </span>
         <Typography variant='body1'>Sobota-Nedeľa</Typography>
         <span>
            {Sobota_od}-{Sobota_do}
         </span>
      </div>
   );
};

export default OtvaracieHodiny;
