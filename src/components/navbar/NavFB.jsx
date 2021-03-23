import React from 'react';
import { SvgIcon } from '@material-ui/core';
import FacebookIcon from '../../svgIcons/FacebookIcon';

const NavFB = () => {
   return (
      <a
         className='navFB'
         href='https://sk-sk.facebook.com/pages/category/Gym-Physical-Fitness-Center/JUNGLE-GYM-Liptovský-Mikuláš-1426065051053128/'>
         <SvgIcon
            component={FacebookIcon}
            style={{
               width: '25px',
               height: '25px',
               // color: '#E84434',
               color2: '',
            }}
         />
      </a>
   );
};

export default NavFB;
