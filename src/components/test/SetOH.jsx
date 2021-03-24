import React, { useEffect, useState } from 'react';

import { Axios, TextField, Autocomplete, Grid, makeStyles, Paper } from './_import';
import { useForm } from 'react-hook-form';
import { timeSlots } from '../../helpers';

import { useGlobalContext } from '../../context/Provider2';

const serverUrl = process.env.REACT_APP_SERVER_URL;

const SetOH = () => {
   const classes = useStyles();
   const { register, handleSubmit, setValue, errors } = useForm(); // potom skusit cez controll aby bolo mozne mat defaul hodnotu bez prerendrovana vzdy pri zmene
   const { calSettings, setCalSettings, setPosunDay } = useGlobalContext();

   const [newValues, setNewValues] = useState({});

   const myOnSubmit = (data) => {
      console.log('submit:', data);

      const dataToSend = Object.values(data);
      console.log(dataToSend);
      Axios.post(`${serverUrl}/calendar/editHodiny`, { payload: dataToSend });

      // const dataToSend = Object.values(data);
      // // console.log(dataToSend);
      // setCalSettings({ ...data, ...newValues });
      // setPosunDay(newCalSettings.maxNextDays);

      //+ alert ze treba po zmene refresh stranky -- alebo to poriesit este
      // // TODO alert
   };
   const dni = ['PonPia', 'SobNed'];
   // const dni = ['Pondelok - Piatok', 'Sobota - Nedela'];
   // const dni = ['Pondelok', 'Utorok', 'Streda', 'Stvrtok', 'Piatok', 'Sobota', 'Nedela'];

   // const fetchSettings = async () => {
   //    const response = await Axios.get(`${serverUrl}/calendar/getCalendarSettings`);
   //    const data = response.data[0];
   //    console.log('data:', data);
   //    // Object.keys(data)
   //    // setDbData(data);
   //    setCalSettings(data);
   // };

   useEffect(() => {
      // fetchSettings();
      // console.log('EFFECT--setNewCalSettings');
      setNewValues({ ...calSettings });
      // setNewCalSettings({ ...calSettings });
   }, [calSettings]);

   useEffect(() => {
      console.log('effectSETVALUE', calSettings);
      setValue('kapacita', calSettings.kapacita);
      setValue('maxNextDays', calSettings.maxNextDays);
      setValue('dennyLimit', calSettings.dennyLimit);
      // setValue('PonPia_od', calSettings.PonPia_od);
   }, [calSettings]);

   // const capitalize = (s) => {
   //    if (typeof s !== 'string') return '';
   //    return s.charAt(0).toUpperCase() + s.slice(1);
   // };

   // const cas = () => {
   //    const today = moment();
   //    console.log('FORMAT', capitalize(today.format('dddd')));
   // };
   // cas();
   console.count('renderCount - <SetOH />');
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
                  <p>Kalendar</p>
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
                              value={newValues[keyOd] ? `${newValues[keyOd]}` : ''}
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
                              value={newValues[keyDo] ? `${newValues[keyDo]}` : ''}
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

{
   /* <Controller
               render={(props) => (
                  <Autocomplete
                     {...props}
                     options={timeSlots}
                     getOptionLabel={(option) => option}
                     renderOption={(option) => <span>{option}</span>}
                     renderInput={(params) => (
                        <TextField {...params} label='Od3:' variant='outlined' />
                     )}
                     onChange={(_, data) => props.onChange(data)}
                  />
               )}
               name='od3'
               control={control}
            /> */
}
