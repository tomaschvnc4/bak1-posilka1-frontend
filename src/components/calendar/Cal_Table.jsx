import React from 'react';

//prettier-ignore
import {  withStyles, makeStyles, Table, TableBody, TableCell, TableContainer,  TableHead,  TableRow, Paper, Typography, DeleteForeverRoundedIcon, IconButton,Tooltip} from "./_imports";

import Cell from './Cell';
import { useGlobalContext } from '../../context/Provider2';
import Loading2 from '../loading2';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import AlertBox from '../AlertBox';
import { timeSlots } from '../../helpers';

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
                        <b style={{ borderBottom: '1px solid black' }}>Denn?? limit</b>
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
                              <Typography variant='body2'>
                                 {minI == -1
                                    ? 'bez rezerv??cie'
                                    : `${timeSlots[minI]} - ${timeSlots[maxI + 1]}`}
                              </Typography>
                              <Typography color='primary' variant='body2'>
                                 {`${aktLimit * 0.5} / ${calSettings.dennyLimit * 0.5} hod`}
                              </Typography>
                              <Typography
                                 color='secondary'
                                 style={{ fontWeight: '500' }}
                                 onClick={() => zrusitVyber(timestamp)}>
                                 {/* Zru??i?? */}
                                 Vy??isti??
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
            <b>In??trukcie:</b>
         </p>
         <p>
            <b>Bunka tabu??ky</b> <br />
            &nbsp;&nbsp;- z??kladn?? ??asov?? jednotka rezerv??cie, ktor?? je mo??n?? zaklikn????, pri??om
            predstavuje 30 min??t. Tieto bunky je mo??n?? nav??jom re??azi?? do jedn??ho ??asov??ho bloku,
            maxim??lne v??ak do ve??kosti denn??ho limitu.
            <br />
            &nbsp;&nbsp;- bunku je mo??n?? zvoli??, iba v pr??pade, ??e v danom ??asovom okne nie je
            prekro??en?? kapacita alebo nie je prekro??enn?? denn?? limit.
         </p>
         <ul style={{ listStyleType: 'circle' }}>
            <li>
               <b>Denn?? limit - </b>predstavuje maxim??lny po??et hod??n, ktor?? je mo??n?? si v dan?? de??
               rezervova?? ako s??visl?? ??asov?? blok r??tan?? po 30 min??t.
            </li>
            <li>
               <b>Zru??i?? - </b> tla??idlo, ktor??m je mo??n?? naraz zru??ie?? v??etky zvolen?? 30 min??tov??
               ??asov?? okn?? v dan?? de??.
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
