import React, { useEffect, useRef, useState } from 'react';

import { Grid, TextField, Axios } from './_import';

import {
   TableRow,
   makeStyles,
   Table,
   TableBody,
   TableCell,
   TableContainer,
   withStyles,
   IconButton,
} from '@material-ui/core';
import CreateIcon from '@material-ui/icons/Create';
import DeleteForeverRoundedIcon from '@material-ui/icons/DeleteForeverRounded';

import { useGlobalContext } from '../../context/Provider2';
import { useForm } from 'react-hook-form';

const serverUrl = process.env.REACT_APP_SERVER_URL;
console.log('serverURL', serverUrl);

const SetCennik = () => {
   const { setCennik, cennik } = useGlobalContext();
   const { register, handleSubmit, errors, setValue, reset } = useForm();
   const classes = useStyles();
   const [fetchData, setFetchData] = useState(false);
   // const [itemToEditRef, setItemToEdit] = useRef({});
   const itemToEditRef = useRef({});

   console.log('cennik', cennik);

   async function onSubmit(data) {
      console.log('dataSubmit', data);
      const { id: poradie, title, price } = data;
      const { id } = itemToEditRef.current || '';
      console.log(poradie, title, price);
      console.log('REF', JSON.stringify(itemToEditRef));
      // let newCennik = cennik.filter(
      //    (item) => item.title.toLowerCase() !== data.title.toLowerCase()
      // );
      const newItem = { id, poradie, title, price };
      console.log('newItem', newItem);
      // console.log('newCennik before', newCennik);
      // newCennik.splice(parseInt(id), 0, { title, price });
      // console.log('newCennik after', newCennik);
      await Axios.post(`${serverUrl}/cennik/change`, { payload: newItem });
      // setCennik(newCennik);
      reset();
      itemToEditRef.current = {};
      setFetchData(!fetchData);
   }

   async function deleteItem(id) {
      const response = await Axios.delete(`${serverUrl}/cennik/deleteItem`, {
         data: { payload: id },
      });
      if (response.status === 200) {
         setFetchData(!fetchData);
      }
   }

   async function getCennik() {
      const response = await Axios.get(`${serverUrl}/cennik/get`);
      const { data, status } = response;
      console.log('data', data);
      data.sort((o1, o2) => {
         return o1.poradie - o2.poradie;
      });
      console.log('data after sort', data);
      status === 200 && setCennik(data);
   }

   function edit(index) {
      const { title, price } = cennik[index];
      // setItemToEdit(cennik[index]);
      itemToEditRef.current = cennik[index];
      setValue('id', index);
      setValue('title', title);
      setValue('price', price);
   }

   useEffect(async () => {
      console.log('EEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEEE');
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
         direction='column'>
         <p>Cennik</p>
         <Grid
            container
            item
            xs={12}
            // md={10}
            component='section'
            direction='column'
            alignItems='center'>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate>
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
                     name='title'
                     error={errors.hasOwnProperty('title')}
                     helperText={errors.title?.message}
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
                     name='price'
                     type='number'
                     error={errors.hasOwnProperty('price')}
                     helperText={errors.price?.message}
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
               <input type='submit' />
            </form>
         </Grid>

         <Grid item container xs={10} alignItems='center' direction='column'>
            <TableContainer>
               <Table className={classes.table}>
                  <TableBody>
                     {cennik.map((item, index) => {
                        const { id, title, price, poradie } = item || {};
                        return (
                           title && (
                              <StyledTableRow key={index}>
                                 <StyledTableCell>{poradie}.</StyledTableCell>
                                 <StyledTableCell>{title}</StyledTableCell>
                                 <StyledTableCell>{price}€</StyledTableCell>
                                 <StyledTableCell style={{ display: 'inline-flex' }}>
                                    <IconButton
                                       size='small'
                                       color='primary'
                                       onClick={() => edit(index)}>
                                       <CreateIcon />
                                    </IconButton>
                                    <IconButton onClick={() => deleteItem(id)}>
                                       <DeleteForeverRoundedIcon color='secondary' size='small' />
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
   );
};

export default SetCennik;

const useStyles = makeStyles((theme) => ({
   table: {
      //   minWidth: 700,
      marginTop: '2%',
   },
   root: {
      '& .MuiTextField-root': {
         margin: theme.spacing(1),
         width: '8ch',
         [theme.breakpoints.only('sm')]: {
            width: '15ch',
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
