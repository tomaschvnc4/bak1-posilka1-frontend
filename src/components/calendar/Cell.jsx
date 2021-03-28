import React from 'react';

//prettier-ignore
import { Paper, Button, ThemeProvider, DoneRoundedIcon,CloseRoundedIcon,Typography } from './_imports';
import themeGreenRed from '../../themes/customPallete';

import { useGlobalContext } from '../../context/Provider2';

const Cell = ({ timestamp, index }) => {
   //prettier-ignore
   const { userSelect, arrReserve, objOpen, calSettings, setUserSelect ,setArrReserve} = useGlobalContext();

   const { minI, maxI, cells } = userSelect[timestamp];
   const { dennyLimit } = calSettings;
   const amount = arrReserve[timestamp][index];
   const isOpen = objOpen[timestamp][index];

   let aktLimit = 0;
   if (minI != -1 || maxI != -1) {
      aktLimit = maxI - minI + 1;
   }

   let disableBtn = true;
   let isFree = false;

   //vychadzam zo stavu ze je obsadene (isFree=F) a ze je disabled
   //menim iba pre tie, pre ktore to neplati IF nizsie
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
   //ak som prekrocil denny limit tak chcem mat tlacidlo disabled ale ktore je selected tak nehat aktivne
   if (aktLimit >= dennyLimit && cells[index] === false) {
      disableBtn = true;
   }

   /*=======
   FUNKCIE
   =========   
   */

   function selectTime(timestamp, index) {
      let newUserSelect = { ...userSelect };
      let newReserve = { ...arrReserve };
      let dayObj = { ...userSelect[timestamp] };
      let { cells, minI, maxI, zmena } = dayObj;

      cells[index] ? newReserve[timestamp][index]-- : newReserve[timestamp][index]++;
      cells[index] = !cells[index];
      zmena = true;

      if (index < maxI && index > minI) {
         for (let i = index + 1; i < cells.length; i++) {
            if (cells[i] === false) {
               break;
            }
            cells[i] = false;
            newReserve[timestamp][i]--;
            // console.log(i);
         }
      }
      minI = cells.findIndex((item) => item === true);
      maxI = cells.lastIndexOf(true);

      newUserSelect[timestamp] = { cells, minI, maxI, zmena };

      setArrReserve(newReserve);
      setUserSelect(newUserSelect);
   }

   /*=======
   RENDER
   =========   
   */
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
