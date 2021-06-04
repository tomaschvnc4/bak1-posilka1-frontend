import clsx from 'clsx';
import React, { useEffect } from 'react';
import { useGlobalContext } from '../context/Provider2';

const Loading2 = () => {
   const { isLoadingCalData } = useGlobalContext();
   useEffect(() => {
      // console.log('loading2 render');
   }, [isLoadingCalData]);
   return (
      // <div className={clsx('loading', isLoadingCal && 'show-loading')}>
      //    {/* <img src={loadingImg} alt='Loading...' /> */}
      //    {/* <div className='spinner' /> */}
      //    <div
      //       id='semiTransparenDiv'
      //       className={clsx('semiTransparenDiv', true ? 'show-loading' : '')}></div>
      // </div>

      // <div className={clsx('loading', 'show-loading')}>
      <div className={clsx('loading', isLoadingCalData && 'show-loading')}>
         <div className='lds-dual-ring hide'></div>
         {/* <img src={loadingImg} alt='Loading...' /> */}
      </div>
   );
};

export default Loading2;
