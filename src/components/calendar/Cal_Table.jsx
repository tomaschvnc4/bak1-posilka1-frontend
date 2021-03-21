import React from 'react';

//prettier-ignore
import {  withStyles, makeStyles, Table, TableBody, TableCell, TableContainer,  TableHead,  TableRow, Paper, Typography, DeleteForeverRoundedIcon, IconButton,Tooltip} from "./_imports";

import Cell from './Cell';
import { useGlobalContext } from '../../context/Provider2';
import Loading2 from '../loading2';

const Cal_Table = () => {
   const { arrWeek: arrDays, arrTime, calSettings, zrusitVyber } = useGlobalContext();

   const classes = useStyles();

   return (
      <div>
         {/* <PreviewFrame
            style={{
               width: 'inherit',
               height: '500px',
            }}> */}
         {<Loading2 />}
         <TableContainer component={Paper}>
            <Table className={classes.table} aria-label='customized table'>
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
                     <StyledTableCell>-</StyledTableCell>
                     {arrDays.map((day, index) => {
                        const timestamp = day.valueOf();
                        return (
                           <StyledTableCell key={index}>
                              <Typography onClick={() => zrusitVyber(timestamp)}>Zrusit</Typography>
                           </StyledTableCell>
                        );
                     })}
                  </StyledTableRow>
                  {arrTime.map((time, index) => {
                     let otvorene =
                        time >= calSettings.workingMinT && time <= calSettings.workingMaxT;
                     return (
                        otvorene && (
                           <StyledTableRow key={`${index}${time}`}>
                              <StyledTableCell>
                                 <b>{time}</b>
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
         {/* </PreviewFrame> */}
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
   table: {
      //   minWidth: 1,
      //   maxWidth: 1,
   },
});
