import React from 'react';

//prettier-ignore
import {  withStyles, makeStyles, Table, TableBody, TableCell, TableContainer,  TableHead,  TableRow, Paper, Typography, DeleteForeverRoundedIcon, IconButton,Tooltip} from "./_imports";

import Cell from './Cell';
import { useGlobalContext } from '../../context/Provider2';
import Loading2 from '../loading2';

const Cal_Table = () => {
   const classes = useStyles();
   const { arrWeek: arrDays, arrTime, calSettings, zrusitVyber, userSelect } = useGlobalContext();

   return (
      <div className={classes.root}>
         {<Loading2 />}
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table' stickyHeader>
               <TableHead>
                  <TableRow>
                     <StyledTableCell>#</StyledTableCell>

                     {arrDays.map((day, index) => {
                        const timestamp = day.valueOf();
                        // console.log(day);
                        // console.log(day.format('ddd, DD.MM.'));
                        return (
                           <StyledTableCell key={index}>
                              {day.format('ddd, DD.MM.').toUpperCase()}
                              <Tooltip title='Zrusit vyber'>
                                 <IconButton onClick={() => zrusitVyber(timestamp)}>
                                    <DeleteForeverRoundedIcon color='secondary' size='small' />
                                 </IconButton>
                              </Tooltip>
                           </StyledTableCell>
                        );
                     })}
                  </TableRow>
               </TableHead>
               <TableBody>
                  <StyledTableRow>
                     <StyledTableCell>
                        <b>Limit</b>
                     </StyledTableCell>
                     {arrDays.map((day, index) => {
                        const timestamp = day.valueOf();
                        const { minI, maxI } = userSelect[timestamp];
                        let aktLimit = 0;
                        if (minI != -1 || maxI != -1) {
                           aktLimit = maxI - minI + 1;
                        }
                        return (
                           <StyledTableCell key={index}>
                              {`${aktLimit} / ${calSettings.dennyLimit}`}
                              <Typography onClick={() => zrusitVyber(timestamp)}>Zrusit</Typography>
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
                                 <b>{`${time}-${arrTime[index + 1]}`}</b>
                              </StyledTableCell>
                              {arrDays.map((day) => {
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
