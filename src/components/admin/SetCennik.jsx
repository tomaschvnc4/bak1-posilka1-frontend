import React, { useEffect, useRef, useState } from 'react';

//prettier-ignore
import { Grid, TextField, Axios, Paper, TableRow, makeStyles, Table, TableBody, TableCell, TableContainer, withStyles, IconButton, CreateIcon, DeleteForeverRoundedIcon,useAuth0} from './_import';

import { useGlobalContext } from '../../context/Provider2';
import { useForm } from 'react-hook-form';

const serverUrl = process.env.REACT_APP_SERVER_URL;
console.log('serverURL', serverUrl);

const SetCennik = () => {
   const classes = useStyles();
   const { setCennik, cennik } = useGlobalContext();
   const { getAccessTokenSilently } = useAuth0();
   const { register, handleSubmit, errors, setValue, reset } = useForm();

   const [fetchData, setFetchData] = useState(false);
   const itemToEditRef = useRef({});

   async function onSubmit(data) {
      const { id: poradie, popis, cena } = data;
      const { id } = itemToEditRef.current || '';

      const newItem = { id, poradie, popis, cena };
      try {
         const options = await getAuthorizationHeader();
         await Axios.post(`${serverUrl}/cennik/change`, { payload: newItem }, options);

         reset();
         itemToEditRef.current = {};
         setFetchData(!fetchData);
      } catch (error) {
         console.log(error);
      }
   }

   async function deleteItem(id) {
      const { headers } = await getAuthorizationHeader();
      const response = await Axios.delete(`${serverUrl}/cennik/deleteItem`, {
         data: { payload: id },
         headers,
      });
      if (response.status === 200) {
         setFetchData(!fetchData);
      }
   }

   async function getCennik() {
      const response = await Axios.get(`${serverUrl}/cennik/get`);
      const { data, status } = response;

      data.sort((o1, o2) => {
         return o1.poradie - o2.poradie;
      });

      status === 200 && setCennik(data);
   }

   function edit(index) {
      const { popis, cena } = cennik[index];

      itemToEditRef.current = cennik[index];
      setValue('id', index);
      setValue('popis', popis);
      setValue('cena', cena);
   }

   const getAuthorizationHeader = async () => {
      const token = await getAccessTokenSilently();
      const options = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      return options;
   };

   useEffect(async () => {
      getCennik();
   }, [fetchData]);

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
               <p>Cenník</p>
            </div>
            <Grid
               container
               item
               xs={12}
               // md={10}
               component='section'
               direction='column'
               alignItems='center'>
               <form onSubmit={handleSubmit(onSubmit)} noValidate>
                  <div>
                     <TextField
                        label='Poradie'
                        name='id'
                        type='number'
                        error={errors.hasOwnProperty('id')}
                        helperText={errors.id?.message}
                        inputRef={register({
                           required: 'Pole obsahuje nepovolené znaky!',
                           pattern: {
                              value: /^[0-9]*$/,
                              message: 'Pole obsahuje nepovolené znaky!',
                           },
                        })}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                     <TextField
                        multiline
                        label='Názov'
                        name='popis'
                        error={errors.hasOwnProperty('popis')}
                        helperText={errors.popis?.message}
                        inputRef={register({
                           pattern: {
                              value: /^[a-zA-ZÀ-ž0-9_ -]*$/,
                              message: 'Pole obsahuje nepovolené znaky!',
                           },
                           required: 'Pole nesmie byť prázdne!',
                        })}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                     <TextField
                        label='Cena'
                        name='cena'
                        type='number'
                        error={errors.hasOwnProperty('cena')}
                        helperText={errors.cena?.message}
                        inputRef={register({
                           required: 'Pole obsahuje nepovolené znaky!',
                           pattern: {
                              value: /^[0-9.,]*$/,
                              message: 'Pole obsahuje nepovolené znaky!',
                           },
                        })}
                        InputProps={{
                           endAdornment: '€',
                           inputProps: { step: 0.5 },
                        }}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                  </div>
                  <div className='center'>
                     <input type='submit' />
                  </div>
               </form>
            </Grid>

            <Grid container justify='center'>
               <Grid item xs={10}>
                  <TableContainer>
                     <Table className={classes.table}>
                        <TableBody>
                           {cennik.map((item, index) => {
                              const { id, popis, cena, poradie } = item || {};
                              return (
                                 popis && (
                                    <StyledTableRow key={index}>
                                       <StyledTableCell>{poradie}.</StyledTableCell>
                                       <StyledTableCell>{popis}</StyledTableCell>
                                       <StyledTableCell>{cena}€</StyledTableCell>
                                       <StyledTableCell style={{ display: 'inline-flex' }}>
                                          <IconButton
                                             size='small'
                                             color='primary'
                                             onClick={() => edit(index)}>
                                             <CreateIcon />
                                          </IconButton>
                                          <IconButton onClick={() => deleteItem(id)}>
                                             <DeleteForeverRoundedIcon
                                                color='secondary'
                                                size='small'
                                             />
                                          </IconButton>
                                       </StyledTableCell>
                                    </StyledTableRow>
                                 )
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

export default SetCennik;

const useStyles = makeStyles((theme) => ({
   table: {
      //   minWidth: 700,
      marginTop: '2%',
      marginBottom: '2%',
   },
   root: {
      marginTop: '2%',

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
      '& .MuiTextField-root': {
         margin: theme.spacing(1),
         width: '8ch',
         [theme.breakpoints.up('lg')]: {
            width: '12ch',
         },
      },
      '& .MuiTextField-root:nth-child(2)': {
         width: '30ch',
      },
   },
}));

const StyledTableCell = withStyles((theme) => ({
   head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
   },
   body: {
      fontSize: 14,
   },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
   root: {
      '&:nth-of-type(odd)': {
         backgroundColor: theme.palette.action.hover,
      },
   },
}))(TableRow);
