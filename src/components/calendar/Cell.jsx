import React from 'react';

//prettier-ignore
import { Paper, Button, ThemeProvider, DoneRoundedIcon,CloseRoundedIcon,Typography } from './_imports';
import themeGreenRed from '../../themes/customPallete';

import { useGlobalContext } from '../../context/Provider2';

// import { useGlobalContext } from '../../_contex';

const Cell = ({ timestamp, index }) => {
   // const { calendar, selectTime } = useGlobalContext();
   const {
      kapacity,
      userSelect,
      arrReserve,
      selectTime,
      objOpen,
      calSettings,
   } = useGlobalContext();

   const { minI, maxI, cells } = userSelect[timestamp];
   const amount = arrReserve[timestamp][index];
   const isOpen = objOpen[timestamp][index];
   // const selectedFirstIndex = userSelect[timestamp]?.findIndex((item) => item === true);
   // console.log(selectedFirstIndex);
   let disableBtn = true;
   let isFree = false;
   // if (selectedFirstIndex === -1) {
   //    disableBtn = false;
   // } else {
   //    if (selectedFirstIndex === index) {
   //       disableBtn = false;
   //    }
   //    if (selectedFirstIndex + 1 === index || selectedFirstIndex - 1 === index) {
   //       disableBtn = false;
   //    }
   // }
   // if (amount < kapacity) {
   if (amount < calSettings.kapacita) {
      isFree = true;
      if (minI === -1) {
         disableBtn = false;
      } else {
         if (index >= minI && index <= maxI) {
            disableBtn = false;
         }
         if (index === minI - 1 || index === maxI + 1) {
            disableBtn = false;
         }
      }
   } else {
      if (cells[index] === true) {
         disableBtn = false;
         isFree = true;
      }
   }

   return (
      <>
         {index}
         <ThemeProvider theme={themeGreenRed}>
            {isOpen ? (
               <Button
                  component={Paper}
                  elevation={10}
                  disabled={disableBtn}
                  onClick={() => selectTime(timestamp, index)}
                  style={
                     cells[index] ? { backgroundColor: themeGreenRed.palette.primary[100] } : {}
                  }>
                  {/* <Icon color='primary'>done</Icon> */}
                  {isFree ? (
                     <DoneRoundedIcon color='primary' />
                  ) : (
                     <CloseRoundedIcon color='secondary' />
                  )}

                  <div>
                     {amount}/{calSettings.kapacita}
                  </div>
               </Button>
            ) : (
               <Button
                  component={Paper}
                  elevation={10}
                  disabled={true}
                  style={{ textTransform: 'capitalize' }}>
                  <Typography color='secondary'>Zavreté</Typography>
               </Button>
            )}
         </ThemeProvider>
      </>
   );
};

export default Cell;
