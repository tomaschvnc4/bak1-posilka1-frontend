import React from 'react';

/**
 * parameter style={{width, height, color1, color2}}
 */
const FacebookIcon = (props) => {
   // console.log(props);
   // console.log(props.style);
   const { width, height } = props.style || {};
   return (
      // <svg
      //    fill={color || '#000'}
      //    xmlns='http://www.w3.org/2000/svg'
      //    viewBox='0 0 26 26'
      //    width='26px'
      //    height='26px'>
      //    <path d='M13,0C5.82,0,0,5.82,0,13c0,6.518,4.801,11.899,11.057,12.839v-9.394H7.84v-3.417h3.217v-2.274 c0-3.765,1.834-5.417,4.963-5.417c1.498,0,2.291,0.111,2.666,0.162v2.983h-2.134c-1.328,0-1.792,1.259-1.792,2.679v1.868h3.893 l-0.528,3.417H14.76v9.422C21.105,25.006,26,19.581,26,13C26,5.82,20.18,0,13,0z' />
      // </svg>
      <svg
         xmlns='http://www.w3.org/2000/svg'
         viewBox='0 0 48 48'
         width={width || '48px'}
         height={height || '48px'}>
         <path fill='#039be5' d='M24 5A19 19 0 1 0 24 43A19 19 0 1 0 24 5Z' />
         <path
            fill='#fff'
            d='M26.572,29.036h4.917l0.772-4.995h-5.69v-2.73c0-2.075,0.678-3.915,2.619-3.915h3.119v-4.359c-0.548-0.074-1.707-0.236-3.897-0.236c-4.573,0-7.254,2.415-7.254,7.917v3.323h-4.701v4.995h4.701v13.729C22.089,42.905,23.032,43,24,43c0.875,0,1.729-0.08,2.572-0.194V29.036z'
         />
      </svg>
   );
};

export default FacebookIcon;
