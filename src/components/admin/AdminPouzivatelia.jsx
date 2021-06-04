import React, { useEffect, useRef, useState } from 'react';

//prettier-ignore
import {Grid,TextField,Axios,Paper,TableRow,makeStyles,Table,TableBody,TableCell,TableContainer,withStyles,InputAdornment,SearchIcon,useAuth0} from './_import';

const serverUrl = process.env.REACT_APP_SERVER_URL;
// console.log('serverURL', serverUrl);

const AdminPouzivatelia = () => {
   const classes = useStyles();
   const { getAccessTokenSilently } = useAuth0();

   const [allUsers, setAllUsers] = useState([]);
   const [searchResult, setSearchResult] = useState([]);
   const searchTermRef = useRef('');

   const handleChange = () => {
      if (searchTermRef.current.value === '') {
         setSearchResult(allUsers);
         return;
      }

      const results = allUsers.filter((user) =>
         user.meno.toLowerCase().includes(searchTermRef.current.value)
      );
      setSearchResult(results);
   };

   const handleSubmit = (e) => {
      e.preventDefault();
   };

   useEffect(async () => {
      const token = await getAccessTokenSilently();
      const options = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      try {
         const response = await Axios.get(`${serverUrl}/profil/admin/getAll`, options);
         setAllUsers(response.data);
         setSearchResult(response.data);
      } catch (error) {
         console.log('getAll', error);
      }
   }, []);

   // console.log('render');
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
               <p>Používatelia</p>
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
                        <TableBody>
                           {searchResult.map((user, index) => {
                              const { meno, telefon, email } = user || {};
                              return (
                                 <StyledTableRow key={`${index}${email}`}>
                                    <StyledTableCell align='center'>
                                       <b>{meno}</b>
                                    </StyledTableCell>
                                    <StyledTableCell>{telefon}</StyledTableCell>
                                    <StyledTableCell>{email}</StyledTableCell>
                                 </StyledTableRow>
                              );
                           })}
                        </TableBody>
                     </Table>
                  </TableContainer>
               </Grid>
            </Grid>
         </Paper>
      </Grid>
   );
};

export default AdminPouzivatelia;

const useStyles = makeStyles((theme) => ({
   table: {
      //   minWidth: 700,
      marginTop: '2%',
      marginBottom: '2%',
   },
   root: {
      marginTop: '2%',

      '& .MuiTableContainer-root': {
         maxHeight: 550,
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
      '& .MuiTableContainer-root': {
         maxHeight: 450,
         marginTop: '2%',
         marginBottom: '2%',
      },
   },
}))(TableRow);
