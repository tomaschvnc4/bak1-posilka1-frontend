import React, { useEffect, useState } from 'react';

import { Axios, TextField, Autocomplete, Grid, makeStyles, Paper } from './_import';
import { Controller, useForm } from 'react-hook-form';
import { timeSlots } from '../../helpers';

import { useGlobalContext } from '../../context/Provider2';
import { Checkbox, FormControlLabel } from '@material-ui/core';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const SetOH = () => {
   const classes = useStyles();
   const { register, handleSubmit, setValue, errors, getValues, watch } = useForm(); // potom skusit cez controll aby bolo mozne mat defaul hodnotu bez prerendrovana vzdy pri zmene
   const { calSettings, setCalSettings, setPosunDay, getAccessTokenSilently } = useGlobalContext();

   const [newValues, setNewValues] = useState({});
   const [checked, setChecked] = useState(false);

   async function myOnSubmit(data) {
      const dataToSend = [...Object.values(data), checked];
      const token = await getAccessTokenSilently();
      const options = {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      };
      Axios.post(`${serverUrl}/calendar/editHodiny`, { payload: dataToSend }, options);

      //+ alert ze treba po zmene refresh stranky -- alebo to poriesit este
      // // TODO alert
   }
   const dni = ['PonPia', 'SobNed'];
   // const dni = ['Pondelok - Piatok', 'Sobota - Nedela'];
   // const dni = ['Pondelok', 'Utorok', 'Streda', 'Stvrtok', 'Piatok', 'Sobota', 'Nedela'];

   useEffect(() => {
      setNewValues({ ...calSettings });
   }, [calSettings]);

   useEffect(() => {
      setValue('kapacita', calSettings.kapacita);
      setValue('maxNextDays', calSettings.maxNextDays);
      setValue('dennyLimit', calSettings.dennyLimit);
      setChecked(!!calSettings.enableKalendar);
   }, [calSettings]);

   console.count('render - <SetOH />');
   return (
      <Grid
         container
         item
         xs={12}
         md={6}
         component='section'
         alignItems='center'
         className={classes.root}>
         <Grid container justify='center'>
            <Paper elevation={2}>
               <div className='center'>
                  <p>Kalendár</p>
               </div>
               <form onSubmit={handleSubmit(myOnSubmit)}>
                  <Grid container justify='center'>
                     <TextField
                        size='small'
                        variant='outlined'
                        label={'Kapacita'}
                        name='kapacita'
                        type='number'
                        inputRef={register}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                     <TextField
                        size='small'
                        variant='outlined'
                        name={'maxNextDays'}
                        type='number'
                        label={'Dni dopredu'}
                        inputRef={register}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />

                     <TextField
                        size='small'
                        variant='outlined'
                        name='dennyLimit'
                        type='number'
                        label='Denny limit'
                        inputRef={register}
                        InputLabelProps={{
                           shrink: true,
                        }}
                     />
                  </Grid>

                  {dni.map((den) => {
                     let keyOd = `${den}_od`;
                     let keyDo = `${den}_do`;

                     return (
                        <Grid container justify='center' key={den}>
                           <p className='p_nazov'>{den} </p>

                           <Autocomplete
                              size='small'
                              style={{ width: 150, margin: '5px 0 5px 0' }}
                              options={timeSlots}
                              value={newValues[keyOd] || ''}
                              onChange={(e, newValue) => {
                                 console.log('newVal:', newValue);
                                 if (newValue === null || newValue === '') {
                                    setNewValues({
                                       ...newValues,
                                       [keyOd]: '',
                                       [keyDo]: '',
                                    });
                                 } else if (newValue >= newValues[keyDo]) {
                                    setNewValues({
                                       ...newValues,
                                       [keyOd]: newValue,
                                       [keyDo]: '',
                                    });
                                 } else {
                                    setNewValues({
                                       ...newValues,
                                       [keyOd]: newValue,
                                    });
                                 }
                              }}
                              renderInput={(params) => (
                                 <TextField
                                    {...params}
                                    label='Od:'
                                    variant='outlined'
                                    inputRef={register}
                                    id={keyOd}
                                    name={keyOd}
                                 />
                              )}
                           />
                           <p className='p_pomlcka'>-&nbsp;</p>
                           <Autocomplete
                              disabled={newValues[keyOd] ? false : true}
                              style={{ width: 150, margin: '5px 0 5px 0' }}
                              size='small'
                              options={timeSlots}
                              getOptionDisabled={(option) => option <= newValues[keyOd]}
                              value={newValues[keyDo] || ''}
                              onChange={(e, newValue) => {
                                 console.log('newVal:', newValue);
                                 setNewValues({ ...newValues, [keyDo]: newValue });
                              }}
                              renderInput={(params) => (
                                 <TextField
                                    {...params}
                                    label='Do:'
                                    variant='outlined'
                                    inputRef={register(
                                       newValues[keyOd]
                                          ? { required: 'Pole nesmie byť prázdne' }
                                          : { required: false }
                                    )}
                                    error={errors.hasOwnProperty(keyDo)}
                                    helperText={errors[keyDo]?.message}
                                    id={keyDo}
                                    name={keyDo}
                                 />
                              )}
                           />
                        </Grid>
                     );
                  })}
                  <div className='center'>
                     <FormControlLabel
                        control={
                           <Checkbox
                              name='enableKalendar'
                              checked={checked}
                              color='primary'
                              onChange={() => setChecked(!checked)}
                           />
                        }
                        label='Povoliť rezervácie'
                     />
                  </div>
                  <div className='center'>
                     <input type='submit' />
                  </div>
               </form>
            </Paper>
         </Grid>
      </Grid>
   );
};

export default SetOH;

const useStyles = makeStyles((theme) => ({
   root: {
      marginTop: '2%',

      '& .MuiPaper-root': {
         width: '95%',
         [theme.breakpoints.up('md')]: {
            width: '88%',
         },
         [theme.breakpoints.only('sm')]: {
            width: '75%',
         },
      },
      '& .MuiTextField-root': {
         width: '15ch',
         margin: '1%',
      },
      '& form': {
         width: '100%',
      },
      '& .p_nazov': {
         width: '8ch',
      },
      '& .p_pomlcka': {
         paddingRight: '10px',
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

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
   PaperProps: {
      style: {
         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
         maxWidth: 250,
         // minWidth: 250,
      },
   },
};
