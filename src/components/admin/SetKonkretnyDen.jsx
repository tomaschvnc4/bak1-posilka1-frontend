import React, { useEffect, useState } from 'react';

//prettier-ignore
import {Axios, TextField, Autocomplete,KeyboardDatePicker, MuiPickersUtilsProvider,Grid,makeStyles, Paper,useAuth0} from './_import'

import { useForm, Controller } from 'react-hook-form';

import { useGlobalContext } from '../../context/Provider2';

import { timeSlots } from '../../helpers';

import MomentUtils from '@date-io/moment';
import moment from 'moment';
import 'moment/locale/sk';
import { Checkbox, FormControlLabel } from '@material-ui/core';
moment.locale('sk');

const serverUrl = process.env.REACT_APP_SERVER_URL;

const SetKonkretnyDen = () => {
   const classes = useStyles();
   const { getAccessTokenSilently } = useAuth0();
   const { register, handleSubmit, control, reset, errors } = useForm({
      defaultValues: { datePicker: new moment().startOf('day') },
   });

   const { konkretneDniOH, setKonkretneDniOH } = useGlobalContext();

   const [konkretnyDenCas, setKonkretnyDenCas] = useState({ od: '', doo: '' });
   const [indexOd, setIndexOd] = useState(-1);
   const [error, setError] = useState({ state: false, mes: '' });
   const [nacitatZonam, setNacitatZonam] = useState(true);
   const [checked, setChecked] = useState(false);

   const myOnSubmit = async (data, e) => {
      data.datePicker = data.datePicker.valueOf();
      data.zavrete = checked;
      console.log(data.datePicker);
      if (isNaN(data.datePicker)) {
         setError({ state: true, mes: 'nespravny format casu' });
         return;
      }

      reset();
      setKonkretnyDenCas({ od: '', doo: '' });
      setError({ state: false, mes: '' });

      const options = await getAuthorizationHeader();
      await Axios.post(
         `${serverUrl}/calendar/add-zmena-otvorenie-specificky-den`,
         {
            payload: data,
         },
         options
      );
      setNacitatZonam(true);

      // TODO alert
   };

   async function getZoznamOH() {
      const response = await Axios.get(`${serverUrl}/calendar/get-zmena-otvorenie-specificky-den`);
      const data = response.data;

      setKonkretneDniOH(response.data);
   }

   async function deleteOH(timestamp) {
      //todo token
      const { headers } = await getAuthorizationHeader();
      const response = await Axios.delete(
         `${serverUrl}/calendar/delete-zmena-otvorenie-specificky-den`,
         { data: { payload: timestamp }, headers }
      );
      console.log('deleteOH', response);
      if (response.status === 200) {
         let newData = konkretneDniOH.filter((record) => record.timestamp !== timestamp);
         setKonkretneDniOH(newData);
      }
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

   useEffect(() => {
      if (nacitatZonam) {
         getZoznamOH();
         setNacitatZonam(false);
      }
   }, [nacitatZonam]);

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
               <p>Konkrétny deň</p>
            </div>
            <Grid container component='section' alignItems='center' direction='column'>
               <form onSubmit={handleSubmit(myOnSubmit)}>
                  <Grid container alignItems='center' direction='column'>
                     {error.state && <p color='secondary'>{error.mes}</p>}

                     <Controller
                        name='datePicker'
                        control={control}
                        render={({ onChange, value }) => (
                           <MuiPickersUtilsProvider locale='sk' utils={MomentUtils}>
                              <KeyboardDatePicker
                                 disableToolbar
                                 variant='inline'
                                 minDate={new Date()}
                                 format='DD.MM.YYYY'
                                 value={value}
                                 onChange={onChange}
                                 invalidDateMessage='Nesprávny formát'
                              />
                           </MuiPickersUtilsProvider>
                        )}
                     />

                     <div className='center'>
                        <FormControlLabel
                           control={
                              <Checkbox
                                 name='zavrete'
                                 checked={checked}
                                 color='primary'
                                 onChange={() => setChecked(!checked)}
                              />
                           }
                           label='Zavreté'
                        />
                     </div>
                     <Autocomplete
                        disabled={checked}
                        size='small'
                        style={{ width: 150, margin: '5px 0 5px 0' }}
                        options={timeSlots}
                        value={konkretnyDenCas.od || ''}
                        onChange={(e, newValue) => {
                           console.log('newVal:', newValue);
                           if (newValue === null || newValue === '') {
                              console.log('null');
                              setKonkretnyDenCas({
                                 zavrete: false,
                                 od: '',
                                 doo: '',
                              });
                           } else if (newValue >= konkretnyDenCas.doo) {
                              setKonkretnyDenCas({
                                 zavrete: false,
                                 od: newValue,
                                 doo: '',
                              });
                           } else {
                              setKonkretnyDenCas({
                                 ...konkretnyDenCas,
                                 od: newValue,
                              });
                           }
                        }}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              label='Od:'
                              variant='outlined'
                              inputRef={register(
                                 checked
                                    ? { required: false }
                                    : { required: 'Pole nesmie byť prázdne' }
                              )}
                              error={checked ? false : errors.hasOwnProperty('od')}
                              helperText={errors['od']?.message}
                              name='od'
                           />
                        )}
                     />

                     {/* <p> - </p> */}
                     {console.log('konkretny dencas', konkretnyDenCas)}
                     <Autocomplete
                        disabled={checked ? true : konkretnyDenCas.od ? false : true}
                        // disabled={checked}
                        size='small'
                        options={timeSlots}
                        getOptionDisabled={(option) => option <= konkretnyDenCas.od}
                        style={{ width: 150, margin: '5px 0 5px 0' }}
                        value={konkretnyDenCas.doo || ''}
                        onChange={(e, newValue) => {
                           console.log('newVal:', newValue);
                           newValue === null
                              ? setKonkretnyDenCas({ ...konkretnyDenCas, doo: '' })
                              : setKonkretnyDenCas({ ...konkretnyDenCas, doo: newValue });
                        }}
                        renderInput={(params) => (
                           <TextField
                              {...params}
                              label='Do:'
                              variant='outlined'
                              inputRef={register(
                                 checked
                                    ? { required: false }
                                    : { required: 'Pole nesmie byť prázdne' }
                              )}
                              error={checked ? false : errors.hasOwnProperty('do')}
                              helperText={errors['do']?.message}
                              name='do'
                           />
                        )}
                     />
                  </Grid>
                  <div className='center'>
                     <input type='submit' />
                  </div>
               </form>
            </Grid>
            <Grid container component='section' alignItems='center' direction='column'>
               {konkretneDniOH.map((record) => {
                  const { timestamp, od, do: doo, zavrete } = record;
                  return (
                     timestamp && (
                        <article style={{ display: 'flex' }} key={timestamp}>
                           <p>{moment(timestamp).format('dddd-DD.MM.YYYY')}&nbsp;</p>
                           <p>{od}&nbsp;</p>
                           <p>{doo}</p>
                           <p>
                              <b>{!!zavrete && 'zavreté'}</b>
                           </p>
                           <p onClick={() => deleteOH(timestamp)}>&nbsp;zmazat</p>
                           {/* <IconButton onClick={() => deleteOH(timestamp)}>
                              <DeleteForeverRoundedIcon color='secondary' size='small' />
                           </IconButton> */}
                        </article>
                     )
                  );
               })}
            </Grid>
         </Paper>
      </Grid>
   );
};

export default SetKonkretnyDen;

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
      '& article p:last-child': {
         color: theme.palette.secondary.main,
      },
   },
}));
