import React from 'react';

//prettier-ignore
import {  withStyles, makeStyles, Table, TableBody, TableCell, TableContainer,  TableHead,  TableRow, Paper, Typography, DeleteForeverRoundedIcon, IconButton,Tooltip} from "./_imports";

import Cell from './Cell';
import { useGlobalContext } from '../../context/Provider2';
import Loading2 from '../loading2';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AlertBox from '../AlertBox';

const Cal_Table = () => {
   const classes = useStyles();
   //prettier-ignore
   const { arrWeek, arrTime, calSettings, userSelect,arrReserve,setUserSelect,setArrReserve } = useGlobalContext();

   const [alert, setAlert] = React.useState(false);

   /*=======
   FUNKCIE
   =========   
   */
   function zrusitVyber(timestamp) {
      let newUserSelect = { ...userSelect };
      let newReserve = { ...arrReserve };

      let { cells, minI, maxI, zmena } = newUserSelect[timestamp];
      let reserve = newReserve[timestamp];
      for (let i = minI; i <= maxI; i++) {
         cells[i] = false;
         reserve[i] -= 1;
      }

      minI = -1;
      maxI = -1;
      zmena = true;
      newUserSelect[timestamp] = { cells, minI, maxI, zmena };
      newReserve[timestamp] = reserve;

      setArrReserve(newReserve);
      setUserSelect(newUserSelect);
   }

   /*=======
   RENDER
   =========   
   */
   console.count('render table');
   return (
      <div className={classes.root}>
         <Loading2 />
         <AlertBox
            aria-label='AlertBox'
            isOpen={alert}
            setOpen={setAlert}
            mess={<MessageSnackBar />}
            severity='info'
            duration={100000}
         />
         <TableContainer component={Paper}>
            <Table aria-label='customized table' stickyHeader>
               <TableHead>
                  <TableRow>
                     <StyledTableCell>
                        <IconButton style={{ color: 'inherit' }} onClick={() => setAlert(true)}>
                           <InfoOutlinedIcon />
                        </IconButton>
                     </StyledTableCell>

                     {arrWeek.map((day, index) => {
                        // const timestamp = day.valueOf();
                        return (
                           <StyledTableCell key={index}>
                              {day.format('ddd, DD.MM.').toUpperCase()}
                              {/* <Tooltip title='Zrusit vyber'>
                                 <IconButton onClick={() => zrusitVyber(timestamp)}>
                                    <DeleteForeverRoundedIcon color='secondary' size='small' />
                                 </IconButton>
                              </Tooltip> */}
                           </StyledTableCell>
                        );
                     })}
                  </TableRow>
               </TableHead>
               <TableBody>
                  <StyledTableRow>
                     <StyledTableCell>
                        <b style={{ borderBottom: '1px solid black' }}>Denný limit</b>
                        <br />
                        <b>Hodina</b>
                     </StyledTableCell>
                     {arrWeek.map((day, index) => {
                        const timestamp = day.valueOf();
                        const { minI, maxI } = userSelect[timestamp];
                        let aktLimit = 0;
                        if (minI != -1 || maxI != -1) {
                           aktLimit = maxI - minI + 1;
                        }
                        return (
                           <StyledTableCell key={index}>
                              <Typography color='primary' variant='body2'>
                                 {`${aktLimit * 0.5} / ${calSettings.dennyLimit * 0.5} hod`}
                              </Typography>
                              <Typography
                                 color='secondary'
                                 style={{ fontWeight: '500' }}
                                 onClick={() => zrusitVyber(timestamp)}>
                                 Zrušiť
                              </Typography>
                           </StyledTableCell>
                        );
                     })}
                  </StyledTableRow>
                  {arrTime.map((time, index) => {
                     let otvorene =
                        time >= calSettings.workingMinT && time < calSettings.workingMaxT;
                     return (
                        otvorene && (
                           <StyledTableRow key={`${index}${time}`}>
                              <StyledTableCell>
                                 <b>{`${time}`}</b>
                                 {/* <b>{`${time}-${arrTime[index + 1]}`}</b> */}
                              </StyledTableCell>
                              {arrWeek.map((day) => {
                                 const timestamp = day.valueOf();
                                 return (
                                    <StyledTableCell key={`${timestamp}${index}`}>
                                       <Cell index={index} timestamp={timestamp} />
                                    </StyledTableCell>
                                 );
                              })}
                           </StyledTableRow>
                        )
                     );
                  })}
               </TableBody>
            </Table>
         </TableContainer>
      </div>
   );
};

export default Cal_Table;

const MessageSnackBar = () => {
   return (
      <div>
         <p>
            <b>Inštrukcie:</b>
         </p>
         <p>
            <b>Bunka tabuľky</b> <br />
            &nbsp;&nbsp;- základnú časová jednotka rezervácie, ktorú je možné zakliknúť, pričom
            predstavuje 30 minút. Tieto bunky je možné navájom reťaziť do jedného časového bloku,
            maximálne však do veľkosti denného limitu.
            <br />
            &nbsp;&nbsp;- bunku je možné zvoliť, iba v prípade, že v danom časovom okne nie je
            prekročená kapacita alebo nie je prekročenný denný limit.
         </p>
         <ul style={{ listStyleType: 'circle' }}>
            <li>
               <b>Denný limit - </b>predstavuje maximálny počet hodín, ktoré je možné si v daný deň
               rezervovať ako súvislý časový blok rátaný po 30 minút.
            </li>
            <li>
               <b>Zrušiť - </b> tlačidlo, ktorým je možné naraz zrušieť všetky zvolené 30 minútové
               časové okná v daný deň.
            </li>
         </ul>
      </div>
   );
};

/********
 * STYLES
 ********/

const StyledTableCell = withStyles((theme) => ({
   head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   body: {
      fontSize: 14,
      borderLeft: ' 1px solid lightgrey',
   },
   root: {
      textAlign: 'center',
      padding: 8,
   },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
   root: {
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.action.hover,
      },
   },
}))(TableRow);

const useStyles = makeStyles({
   root: {
      '& .MuiTableContainer-root': {
         maxHeight: 550,
      },
   },
});
