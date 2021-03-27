import React, { useEffect, useRef, useState } from 'react';

//prettier-ignore
import { Grid, TextField, Axios, Paper, SearchIcon, TableHead,TableRow, Table, TableBody, TableCell,
 TableContainer, withStyles, InputAdornment,makeStyles } from './_import';

import { timeSlots } from '../../helpers';

import moment from 'moment';
import 'moment/locale/sk';
moment.locale('sk');

const serverUrl = process.env.REACT_APP_SERVER_URL;
console.log('serverURL', serverUrl);

const AdminRezervacie = () => {
   const classes = useStyles();
   // const { setCennik, cennik } = useGlobalContext();

   const [allRezervacie, setAllRezervacie] = useState([]);
   const [searchResult, setSearchResult] = useState([]);
   const searchTermRef = useRef('');

   const handleChange = () => {
      if (searchTermRef.current.value === '') {
         setSearchResult(allRezervacie);
         return;
      }

      const results = allRezervacie
         .map((rezervacieDen) => {
            const res = rezervacieDen.value.filter((rezervacia) =>
               rezervacia.meno.toLowerCase().includes(searchTermRef.current.value)
            );

            if (res[0]) {
               return { ...rezervacieDen, value: res };
            }
         })
         .filter((item) => item);
      //MAP - vrati prefiltrovane vysledky ale tie ktore sa nezhoduju vrati ako undefined, a tieto undefined nasledne prefiltrujem
      setSearchResult(results);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   useEffect(async () => {
      const response = await Axios.get(`${serverUrl}/calendar/admin/getRezervacieWusers`);
      let data = [];
      let tmpObj = {};
      response.data.forEach((record) => {
         const { tstampOfDay: timestamp, startI, endI, userId, meno } = record;
         let newObj = { startI, endI, userId, meno };

         if (tmpObj[timestamp] == undefined) {
            tmpObj[timestamp] = [newObj];
         } else {
            tmpObj[timestamp]?.push(newObj);
         }
      });

      for (const [key, value] of Object.entries(tmpObj)) {
         data.push({ timestamp: parseInt(key), value });
      }

      data.sort((o1, o2) => {
         return o1.timestamp - o2.timestamp;
      });
      setAllRezervacie(data);
      setSearchResult(data);
   }, []);

   return (
      <Grid
         container
         item
         xs={12}
         md={6}
         component='section'
         justify='center'
         alignItems='center'
         direction='column'
         className={classes.root}>
         <Paper elevation={2}>
            <div className='center'>
               <p>Rezervácie</p>
            </div>
            <Grid
               container
               item
               xs={12}
               // md={10}
               component='section'
               direction='column'
               alignItems='center'>
               <form noValidate onSubmit={handleSubmit}>
                  <div className='center'>
                     <TextField
                        fullWidth
                        // variant='outlined'
                        label='Vyhladaj'
                        placeholder='Vyhľadaj meno:'
                        size='small'
                        inputRef={searchTermRef}
                        onChange={handleChange}
                        InputProps={{
                           startAdornment: (
                              <InputAdornment position='start'>
                                 <SearchIcon />
                              </InputAdornment>
                           ),
                        }}
                     />
                  </div>
               </form>
            </Grid>

            <Grid container justify='center'>
               <Grid item xs={10}>
                  <TableContainer>
                     <Table className={classes.table}>
                        {searchResult.map((record, i) => {
                           const { timestamp, value } = record;
                           return (
                              <React.Fragment key={`${timestamp}_`}>
                                 <TableHead>
                                    <TableRow>
                                       <StyledTableCell colSpan={4}>
                                          {moment(timestamp).format('ddd, DD.MM.')}
                                       </StyledTableCell>
                                    </TableRow>
                                 </TableHead>
                                 <TableBody>
                                    {value.map((item, index) => {
                                       const { startI, endI, meno } = item;
                                       return (
                                          <StyledTableRow key={`${timestamp}_${index}`}>
                                             <StyledTableCell rowSpan={1}></StyledTableCell>
                                             <StyledTableCell>{meno}</StyledTableCell>
                                             <StyledTableCell>{timeSlots[startI]}</StyledTableCell>
                                             <StyledTableCell>
                                                {timeSlots[endI + 1]}
                                             </StyledTableCell>
                                          </StyledTableRow>
                                       );
                                    })}
                                 </TableBody>
                              </React.Fragment>
                           );
                        })}
                     </Table>
                  </TableContainer>
               </Grid>
            </Grid>
         </Paper>
      </Grid>
   );
};

export default AdminRezervacie;

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: '2%',

      '& .MuiTableContainer-root': {
         maxHeight: 450,
         marginTop: '2%',
         marginBottom: '2%',
      },

      '& .MuiPaper-root': {
         width: '95%',
         [theme.breakpoints.up('lg')]: {
            width: '88%',
         },
         [theme.breakpoints.only('sm')]: {
            width: '77%',
         },
      },

      '& .center': {
         display: 'flex',
         justifyContent: 'center',
         marginTop: '2%',
         '& input': {
            marginBottom: '2%',
         },
         '& p': {
            fontWeight: 'bold',
         },
      },
   },
}));

const StyledTableCell = withStyles((theme) => ({
   head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
      padding: 10,
   },
   body: {
      fontSize: 12,
      padding: 10,
   },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
   root: {
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.action.hover,
      },
   },
}))(TableRow);
