import React from 'react';

/**
 * parameter style={{width, height, color1, color2}}
 */
const PositionIcon = (props) => {
   console.log(props);
   console.log(props.style);
   const { width, height, color, color2 } = props.style || {};
   return (
      <svg
         width={width || '38px'}
         height={height || '51px'}
         viewBox='0 0 38 51'
         version='1.1'
         xmlnsXlink='http://www.w3.org/1999/xlink'
         xmlns='http://www.w3.org/2000/svg'>
         <defs>
            <filter filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB' id='filter_1'>
               <feFlood floodOpacity='0' result='BackgroundImageFix' />
               <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
               />
               <feOffset dx='0' dy='2' />
               <feGaussianBlur stdDeviation='2' />
               <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.39215687 0 0 0 0 0.39215687 0 0 0 0 0.39215687 0 0 0 0.49803922 0'
               />
               <feBlend mode='normal' in2='BackgroundImageFix' result='effect0_dropShadow' />
               <feColorMatrix
                  in='SourceAlpha'
                  type='matrix'
                  values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
               />
               <feOffset dx='0' dy='2' />
               <feGaussianBlur stdDeviation='2' />
               <feColorMatrix
                  type='matrix'
                  values='0 0 0 0 0.39215687 0 0 0 0 0.39215687 0 0 0 0 0.39215687 0 0 0 0.49803922 0'
               />
               <feBlend mode='normal' in2='effect0_dropShadow' result='effect1_dropShadow' />
               <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
            </filter>
            <path d='M0 0L39 0L39 51L0 51L0 0Z' id='path_1' />
            <path d='M0 0L17.881 0L17.881 17.881L0 17.881L0 0Z' id='path_2' />
            <rect width='38' height='51' id='artboard_1' />
            <clipPath id='clip_1'>
               <use xlinkHref='#artboard_1' clipRule='evenodd' />
            </clipPath>
            <clipPath id='mask_1'>
               <use xlinkHref='#path_1' />
            </clipPath>
            <clipPath id='mask_2'>
               <use xlinkHref='#path_2' />
            </clipPath>
         </defs>
         <g id='Artboard' clipPath='url(#clip_1)'>
            <use xlinkHref='#artboard_1' stroke='none' fill='#FFFFFF' fillOpacity='0' />
            <g id='location-pin' transform='translate(-0.99993896 0)'>
               <path
                  d='M0 0L39 0L39 51L0 51L0 0Z'
                  id='Background'
                  fill='none'
                  fillRule='evenodd'
                  stroke='none'
               />
               <g clipPath='url(#mask_1)'>
                  <path
                     d='M19 0C8.52467 0 0 8.64025 0 19.2631C0 34.357 17.214 49.9417 17.9466 50.5962C18.2484 50.8661 18.6242 51 19 51C19.3758 51 19.7516 50.8661 20.0534 50.5984C20.786 49.9418 38 34.357 38 19.2631C38 8.64025 29.4753 2.02656e-06 19 2.02656e-06L19 0ZM19.0641 34C11.3445 34 5.06406 27.7196 5.06406 20C5.06406 12.2804 11.3445 6 19.0641 6C26.7837 6 33.0641 12.2804 33.0641 20C33.0641 27.7196 26.7837 34 19.0641 34L19.0641 34Z'
                     transform='translate(0.9510498 0)'
                     id='Shape'
                     fill={color || '#000000'}
                     fillRule='evenodd'
                     stroke='none'
                  />
               </g>
            </g>
            <g filter='url(#filter_1)'>
               <g id='barbell' transform='translate(9.799957 10.119019)'>
                  <path
                     d='M0 0L17.881 0L17.881 17.881L0 17.881L0 0Z'
                     id='Background'
                     fill='none'
                     fillRule='evenodd'
                     stroke='none'
                  />
                  <g clipPath='url(#mask_2)'>
                     <path
                        d='M17.0585 5.02317C17.4561 4.62566 17.881 4.30181 17.881 3.59368C17.881 3.20219 17.7285 2.83414 17.4517 2.55735L16.7956 1.90129L17.2746 1.42231C17.4999 1.19702 17.4999 0.831703 17.2746 0.606405C17.0493 0.381108 16.684 0.381108 16.4587 0.606405L15.9797 1.08538L15.3237 0.429319C15.0468 0.152494 14.6788 0 14.2873 0C13.5909 0 13.2742 0.406061 12.8578 0.822435L12.4745 0.439091C11.9031 -0.132373 10.9732 -0.132409 10.4017 0.439127L10.1448 0.696084C9.57336 1.26751 9.57336 2.19733 10.1448 2.76872L12.2206 4.84446L4.84378 12.2213L2.76804 10.1455C2.19661 9.57408 1.26686 9.57405 0.695399 10.1455L0.438406 10.4025C-0.133058 10.974 -0.133058 11.9038 0.438406 12.4752L0.82175 12.8585L0.428598 13.2517C-0.142866 13.8231 -0.142866 14.7529 0.428598 15.3243L1.08469 15.9804L0.601934 16.4631C0.237305 16.8277 0.500644 17.448 1.00987 17.448C1.15753 17.448 1.30516 17.3917 1.41781 17.279L1.90057 16.7963L2.55666 17.4524C3.12809 18.0238 4.05784 18.0239 4.6293 17.4524L5.02245 17.0593C5.40554 17.4424 5.73318 17.8712 6.4421 17.8712C7.12845 17.8712 7.46261 17.4585 7.73543 17.1856C8.30689 16.6142 8.30689 15.6844 7.73543 15.113L5.65969 13.0372L13.0365 5.66045L15.1122 7.73619C15.6837 8.30765 16.6135 8.30762 17.1849 7.73622C17.4673 7.45377 17.4383 7.47923 17.4419 7.47923C18.0133 6.90773 18.0133 5.97795 17.4419 5.40656L17.0585 5.02317ZM14.0668 1.24522C14.1887 1.12338 14.3858 1.12338 14.5077 1.24522C14.5439 1.28143 16.5201 3.25761 16.6358 3.37332C16.7576 3.49516 16.7576 3.69233 16.6358 3.81418L16.2561 4.19392L13.6871 1.625L14.0668 1.24522ZM3.59292 16.7277C3.50966 16.7277 3.43141 16.6954 3.37253 16.6365C3.11637 16.3803 1.50921 14.7732 1.24443 14.5084C1.12266 14.3866 1.12259 14.1894 1.24443 14.0675L1.62421 13.6877L4.19313 16.2567C3.80012 16.6497 3.75984 16.7277 3.59292 16.7277L3.59292 16.7277ZM6.91953 16.3697L6.66254 16.6267C6.54098 16.7482 6.34327 16.7482 6.22168 16.6267L1.25426 11.6593C1.13274 11.5377 1.13274 11.34 1.25426 11.2184C1.5203 10.9524 1.56992 10.8703 1.73164 10.8703C1.81148 10.8703 1.89131 10.9007 1.95207 10.9615L6.9195 15.9289C7.04105 16.0504 7.04105 16.2482 6.91953 16.3697L6.91953 16.3697ZM16.6259 6.66328L16.3689 6.92023C16.2473 7.04175 16.0496 7.04168 15.9281 6.92023L10.9607 1.95281C10.8392 1.83125 10.8392 1.63354 10.9607 1.51191C11.2268 1.24583 11.2763 1.16383 11.4381 1.16383C11.5179 1.16383 11.5977 1.19423 11.6585 1.25495L16.6259 6.22238C16.7474 6.34397 16.7474 6.54172 16.6259 6.66328L16.6259 6.66328Z'
                        transform='translate(3.0517578E-05 0)'
                        id='Shape'
                        fill={color2 || '#000000'}
                        fillRule='evenodd'
                        stroke='none'
                     />
                  </g>
               </g>
            </g>
         </g>
      </svg>
   );
};

export default PositionIcon;
